import { LOGIN_MESSASGE } from '@/constants/login-message';
import { accountAtom } from '@/states/account.atom';
import { polkadotAPIAtom } from '@/states/polkadotAPI.atom';
import { Button, Typography } from '@mui/material';
import { Signer } from '@polkadot/types/types';
import { WalletAccount } from '@talisman-connect/wallets';
import { WalletSelect } from '@talismn/connect-components';
import { useAtom } from 'jotai';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

interface WalletSelectorProps {}

const WalletSelector: React.FC<WalletSelectorProps> = () => {
  const [_, setAccount] = useAtom(accountAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [api, __] = useAtom(polkadotAPIAtom);

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
      onAccountSelected={(account) => {
        setAccount(account);

        api?.setSigner(account.signer as Signer);

        // fetch('/api/user/nonce/' + account.address)
        //   .then(async (res) => {
        //     return res.json();
        //   })
        //   .then(async (nonce) => {
        //     const message = LOGIN_MESSASGE(nonce);

        //     try {
        //       const signature = await api!.sign(account.address, {
        //         data: message,
        //       });

        //       signIn('credentials', {
        //         message,
        //         redirect: false,
        //         signature,
        //         address: account.address,
        //       });
        //     } catch (e) {
        //       console.error(e);
        //     }
        //   });
      }}
      // Callback when an error occurs. Also clears the error on Modal actions:
      // `onWalletConnectOpen`, `onWalletSelected`, `onAccountSelected` and `onWalletConnectClose`,
      onError={(error) => error && console.error(error)}
    />
  );
};

export default WalletSelector;
