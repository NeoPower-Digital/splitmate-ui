import splitmateLogo from '@/public/vercel.svg';
import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar, Box, Button, IconButton, Stack, Toolbar } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { NextLinkComposed } from './Link';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <AppBar elevation={0} enableColorOnDark>
      <Toolbar>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Box component={NextLinkComposed} to={{ pathname: '/' }}>
            <Image
              src={splitmateLogo}
              alt="SplitMate logo"
              width={80}
              height={52}
            />
          </Box>

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

            <Button variant="contained" color="secondary">
              Connect Wallet
            </Button>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
