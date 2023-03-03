import ActionsSection from '@/components/ActionsSection';
import GroupsSection from '@/components/GroupsSection';
import LatestActivitySection from '@/components/LatestActivitySection';
import NetworkContractModal from '@/components/NetworkContractModal';
import useQuery from '@/hooks/useQuery';
import { QUERIES } from '@/model/blockchain';
import { DebtsByGroup } from '@/model/debts';
import { accountAtom } from '@/states/account.atom';
import { debtsByGroupAtom } from '@/states/debts.atom';
import { networkAtom } from '@/states/network.atom';
import { polkadotAPIAtom } from '@/states/polkadotAPI.atom';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Button, Stack, Typography } from '@mui/material';
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
  // TODO: Uncomment when contract metadata is ready
  // const { getPromise } = useQuery();

  const userName = account?.name;
  const positiveMessage = '🟢 You are owed';
  const negativeMessage = '🔴 You owe';
  const token = 'USDT';

  const [balance, setBalance] = useState(-340);

  const [__, setAPI] = useAtom(polkadotAPIAtom);
  const [debtsByGroup, setDebtsByGroup] = useAtom(debtsByGroupAtom);

  useEffect(() => {
    const provider = new WsProvider(chainURL);

    ApiPromise.create({ provider }).then((api) => {
      setAPI(api);

      // TODO: Uncomment when contract metadata is ready
      // getPromise(QUERIES.GET_DEBTS_BY_GROUP, account?.address).then((data) => {
      //   setDebtsByGroup(data as Array<DebtsByGroup>);
      // });
    });
  }, [account?.address, chainURL, setAPI, setDebtsByGroup]);

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
