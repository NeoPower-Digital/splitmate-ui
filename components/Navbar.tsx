import useIsMobile from '@/hooks/useIsMobile';
import splitmateLogo from '@/public/splitmate.png';
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
import WalletWidget from './WalletWidget';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const isMobile = useIsMobile();

  return (
    <AppBar elevation={0}>
      <Toolbar>
        <Box component={NextLinkComposed} to={{ pathname: '/' }}>
          <Image
            src={splitmateLogo}
            alt="SplitMate logo"
            width={109}
            height={42}
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
                <GitHubIcon color="primary" />
              </IconButton>
            </>
          )}

          <WalletWidget />
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
  background-color: ${({ theme }) => theme.palette.background.default};
  border-bottom: 3px solid ${({ theme }) => theme.palette.primary.main};
`;
