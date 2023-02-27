import splitmateLogo from "@/public/vercel.svg";
import GitHubIcon from "@mui/icons-material/GitHub";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import {
  AppBar as MUIAppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Stack,
  styled,
  Toolbar as MUIToolbar,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const APP_TITLE = "SplitMate | Split expenses like a pro";
  const APP_DESCRIPTION = "Split expenses like a pro";

  const metas = [
    { name: "description", content: APP_DESCRIPTION },
    { name: "viewport", content: "initial-scale=1, width=device-width" },
  ];

  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>

        {metas.map(({ name, content }) => (
          <meta key={name} name={name} content={content} />
        ))}
      </Head>

      <AppBar elevation={0} enableColorOnDark>
        <Toolbar>
          <Image
            src={splitmateLogo}
            alt="SplitMate logo"
            width={80}
            height={52}
          />

          <Stack direction="row" gap={2} alignItems="center">
            <Link
              color="inherit"
              href="https://neopower.digital"
              target="_blank"
            >
              Built by NeoPower
            </Link>

            <IconButton
              target="_blank"
              href="https://github.com/NeoPower-Digital/splitmate-ui"
            >
              <GitHubIcon />
            </IconButton>

            <Button
              variant="contained"
              color="secondary"
              //startIcon={<SyncAltIcon />}
            >
              Connect Wallet
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

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
