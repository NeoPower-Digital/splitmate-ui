import prisma from '@/lib/prisma';
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const StyledButton = styled(Button)`
  width: 100%;
`;

const Supabase: React.FC<{ feed: PostProps[] }> = (props) => {
  const { data: session } = useSession();

  return (
    <>
      {!session && (
        <div>
          <Link href="/api/auth/signin">Log in</Link>
        </div>
      )}
      {session && (
        <>
          {props.feed.map((post, index) => (
            <p style={{ 'text-align': 'center' }} key={index}>
              <b>N°{index}</b> Title: {post.title} | Content: {post.content}
            </p>
          ))}
          <StyledButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={async () => {
              try {
                const body = {
                  title: 'Example title ',
                  content: 'Example Content',
                };
                await fetch('/api/post', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(body),
                });
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Add example
          </StyledButton>
        </>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { feed },
    revalidate: 10,
  };
};

export default Supabase;
