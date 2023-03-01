import ActionsSection from '@/components/ActionsSection';
import GroupsSection from '@/components/GroupsSection';
import LatestActivitySection from '@/components/LatestActivitySection';
import NetworkContractModal from '@/components/NetworkContractModal';
import { accountAtom } from '@/states/account.atom';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Button, Stack, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { useState } from 'react';

interface HomeProps {}

const truncate = (address: string): string => {
  if (!address) return '';

  const [h, t] = [6, 6];
  const head = address.slice(0, h);
  const tail = address.slice(-1 * t, address.length);
  return address.length > h + t ? [head, tail].join('...') : address;
};

const Home: React.FC<HomeProps> = () => {
  const [account, _] = useAtom(accountAtom);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const userName = account?.name;
  const positiveMessage = '🟢 You are owed';
  const negativeMessage = '🔴 You owe';
  const balance = -340;
  const token = 'USDT';

  return (
    <>
      <Stack gap={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>
            {account
              ? `👋🏻 Welcome ${userName} (${truncate(account?.address)})`
              : `👋🏻 Hi stranger!`}
          </Typography>

          <Button
            variant="text"
            color="secondary"
            onClick={handleOpen}
            startIcon={<SyncAltIcon />}
            size="small"
          >
            Switch chain
          </Button>
        </Stack>

        <Typography variant="h4">
          {balance > 0 ? positiveMessage : negativeMessage} {Math.abs(balance)}{' '}
          {token}
        </Typography>

        <ActionsSection />

        <GroupsSection />

        <LatestActivitySection />
      </Stack>

      <NetworkContractModal modalOpen={modalOpen} handleClose={handleClose} />
    </>
  );
};

export default Home;
