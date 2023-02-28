import useIsMobile from '@/hooks/useIsMobile';
import splitmateLogo from '@/public/vercel.svg';
import GitHubIcon from '@mui/icons-material/GitHub';
import {
  AppBar as MUIAppBar,
  Box,
  Button,
  IconButton,
  Stack,
  styled,
  Toolbar as MUIToolbar,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { NextLinkComposed } from './Link';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const isMobile = useIsMobile();

  return (
    <AppBar elevation={0} enableColorOnDark>
      <Toolbar>
        <Box component={NextLinkComposed} to={{ pathname: '/' }}>
          <Image
            src={splitmateLogo}
            alt="SplitMate logo"
            width={80}
            height={52}
          />
        </Box>

        <Stack direction="row" gap={2} alignItems="center">
          {!isMobile && (
            <>
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
            </>
          )}

          <Button variant="contained" color="secondary">
            Connect Wallet
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

const Toolbar = styled(MUIToolbar)`
  display: flex;
  justify-content: space-between;
`;

const AppBar = styled(MUIAppBar)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;
