import { accountAtom } from '@/states/account.atom';
import { Button, Typography } from '@mui/material';
import { WalletAccount } from '@talisman-connect/wallets';
import { WalletSelect } from '@talismn/connect-components';
import { useAtom } from 'jotai';
import { useState } from 'react';
interface WalletSelectorProps {}

const WalletSelector: React.FC<WalletSelectorProps> = () => {
  const [_, setAccount] = useAtom(accountAtom);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <WalletSelect
      // [Required] The dapp name
      dappName="SplitMate"
      // Use if the dapp is controlling the modal toggle.
      open={isOpen}
      // The component that opens the WalletSelect Modal
      triggerComponent={
        <Button
          variant="contained"
          color="secondary"
          onClick={(wallets) => {
            // Do stuff with the supported wallets
            setIsOpen(true);
          }}
        >
          Connect Wallet
        </Button>
      }
      // Override the default header
      header={<Typography variant="h4">Connect wallet</Typography>}
      // If `showAccountsList={true}`, then account selection modal will show up after selecting the a wallet. Default is `false`.
      showAccountsList={true}
      // Callback when an account is selected on the WalletSelect Account Modal. Only relevant when `showAccountsList=true`
      onAccountSelected={(account: WalletAccount) => {
        console.log(account);
        setAccount(account);
      }}
      // Callback when an error occurs. Also clears the error on Modal actions:
      // `onWalletConnectOpen`, `onWalletSelected`, `onAccountSelected` and `onWalletConnectClose`,
      onError={(error) => error && console.error(error)}
    />
  );
};

export default WalletSelector;
