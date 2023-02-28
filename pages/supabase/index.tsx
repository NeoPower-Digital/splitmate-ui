import prisma from "@/lib/prisma";
import { GetStaticProps } from "next";

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

const Supabase: React.FC<{ feed: PostProps[] }> = (props) => {
  return (
    <>
      {props.feed.map((post) => (
        <div key={post.id} className="post">
          <Post post={post} />
        </div>
      ))}
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

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <p>{post.content} </p>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Supabase;
