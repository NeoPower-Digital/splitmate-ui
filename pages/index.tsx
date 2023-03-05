import ActionsSection from '@/components/ActionsSection';
import GroupsSection from '@/components/GroupsSection';
import LatestActivitySection from '@/components/LatestActivitySection';
import NetworkContractModal from '@/components/NetworkContractModal';
import useQuery from '@/hooks/useQuery';
import { splitMateAccountMock } from '@/model/splitmate';
import { accountAtom } from '@/states/account.atom';
import { balanceAtom } from '@/states/balance.atom';
import { debtsByGroupAtom } from '@/states/debts.atom';
import { groupsAtom } from '@/states/groups.atom';
import { networkAtom } from '@/states/network.atom';
import { polkadotAPIAtom } from '@/states/polkadotAPI.atom';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Alert, Button, Paper, Stack, Typography } from '@mui/material';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

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

  const [{ chainURL }] = useAtom(networkAtom);
  const { getPromise } = useQuery();

  const [__, setAPI] = useAtom(polkadotAPIAtom);
  const [debtsByGroup, setDebtsByGroup] = useAtom(debtsByGroupAtom);
  const [groups, setGroups] = useAtom(groupsAtom);
  const [balance, setBalance] = useAtom(balanceAtom);

  useEffect(() => {
    const provider = new WsProvider(chainURL);

    ApiPromise.create({ provider }).then((api) => {
      setAPI(api);

      setGroups(splitMateAccountMock.groups);
      setDebtsByGroup(splitMateAccountMock.debtsByGroup);

      const balanceResult = splitMateAccountMock.groups
        .map((g) => g.debtValue)
        .reduce((accum, curr) => accum + curr, 0);

      setBalance(balanceResult);
    });
  }, [chainURL, setAPI, setBalance, setDebtsByGroup, setGroups]);

  return (
    <>
      <Stack gap={2}>
        <Alert severity="info" variant="outlined">
          UI mocked for demo purposes
        </Alert>

        <Paper elevation={0} variant="outlined">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            p={2}
          >
            <Typography variant="h6">
              {account
                ? `👋🏻 Welcome ${account?.name} (${truncate(account?.address)})`
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
        </Paper>

        <ActionsSection />

        <GroupsSection />

        <LatestActivitySection />
      </Stack>

      <NetworkContractModal modalOpen={modalOpen} handleClose={handleClose} />
    </>
  );
};

export default Home;
