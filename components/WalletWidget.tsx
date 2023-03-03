import { accountAtom } from '@/states/account.atom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { WalletAccount } from '@talisman-connect/wallets';
import { useAtom } from 'jotai';
import { signOut } from 'next-auth/react';
import WalletSelector from './WalletSelector';

interface WalletWidgetProps {}

const WalletWidget: React.FC<WalletWidgetProps> = () => {
  const [account, setAccount] = useAtom(accountAtom);

  return (
    <>
      {account ? (
        <Button
          variant="contained"
          color="secondary"
          endIcon={<LogoutIcon />}
          onClick={() => {
            setAccount(null);
            signOut({ redirect: false });
          }}
        >
          Logout
        </Button>
      ) : (
        <WalletSelector />
      )}
    </>
  );
};

export default WalletWidget;
