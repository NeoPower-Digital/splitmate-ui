import {
  AppBar as MUIAppBar,
  Box,
  Container,
  styled,
  Toolbar as MUIToolbar,
} from '@mui/material';
import Head from 'next/head';
import Navbar from './Navbar';

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const APP_TITLE = 'SplitMate | Split expenses like a pro';
  const APP_DESCRIPTION = 'Split expenses like a pro';

  const metas = [
    { name: 'description', content: APP_DESCRIPTION },
    { name: 'viewport', content: 'initial-scale=1, width=device-width' },
  ];

  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>

        {metas.map(({ name, content }) => (
          <meta key={name} name={name} content={content} />
        ))}
      </Head>

      <Navbar />

      <LayoutOffset mb={6} />

      <Container maxWidth="sm">{children}</Container>

      <LayoutOffset mb={6} />
    </>
  );
};

export default Layout;

const LayoutOffset = styled(Box)(({ theme }) => theme.mixins.toolbar);

const Toolbar = styled(MUIToolbar)`
  display: flex;
  justify-content: space-between;
`;

const AppBar = styled(MUIAppBar)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;
