import { accountAtom } from '@/states/account.atom';
import { CHAINS, networkAtom } from '@/states/network.atom';
import { polkadotAPIAtom } from '@/states/polkadotAPI.atom';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface NetworkContractModalProps {
  modalOpen: boolean;
  handleClose: () => void;
}

const NetworkContractModal: React.FC<NetworkContractModalProps> = ({
  modalOpen,
  handleClose,
}) => {
  const [network, setNetwork] = useAtom(networkAtom);
  const [api, _] = useAtom(polkadotAPIAtom);
  const [account, setAccount] = useAtom(accountAtom);
  const router = useRouter();

  // Select input (chain name)
  const [selectedChain, setSelectedChain] = useState('');

  // Input (contract address)
  const [contractAddressInput, setContractAddressInput] = useState('');

  useEffect(() => {
    selectChain(network.chainName);
  }, [network]);

  const handleSubmit = () => {
    const chain = CHAINS.find((c) => c.chainName === selectedChain) || network;

    setNetwork({
      ...chain,
      contractAddress: contractAddressInput,
    });

    setAccount(null);
    router.push('/');

    handleClose();
  };

  const selectChain = (chainName: string) => {
    const chain = CHAINS.find((c) => c.chainName === chainName);

    setContractAddressInput(chain?.contractAddress || '');
    setSelectedChain(chainName);
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '500px',
        }}
        elevation={0}
      >
        <Stack p={4} gap={2}>
          <Typography variant="h4">Switch chain</Typography>
          <Typography>
            Complete the fields to change network, make sure all data is valid.
          </Typography>

          <Stack gap={4} my={2}>
            <FormControl>
              <InputLabel id="chain-label">Default chain</InputLabel>
              <Select
                labelId="chain-label"
                value={selectedChain}
                label="Default chain"
                onChange={(event: SelectChangeEvent) => {
                  selectChain(event.target.value);
                }}
              >
                {CHAINS.map(({ chainName }) => (
                  <MenuItem key={chainName} value={chainName}>
                    {chainName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              required
              id="contract-address"
              label="Contract address"
              autoComplete="off"
              value={contractAddressInput}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setContractAddressInput(event.target.value);
              }}
            />
          </Stack>

          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
      </Paper>
    </Modal>
  );
};

export default NetworkContractModal;
