import ActionsSection from '@/components/ActionsSection';
import GroupsSection from '@/components/GroupsSection';
import LatestActivitySection from '@/components/LatestActivitySection';
import { accountAtom } from '@/states/account.atom';
import { Stack, Typography } from '@mui/material';
import { useAtom } from 'jotai';

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

  const userName = account?.name;
  const positiveMessage = '🟢 You are owed';
  const negativeMessage = '🔴 You owe';
  const balance = -340;
  const token = 'USDT';

  return (
    <Stack gap={2}>
      <Typography>
        {account
          ? `👋🏻 Welcome ${userName} (${truncate(account?.address)})`
          : `👋🏻 Hi stranger!`}
      </Typography>

      <Typography variant="h4">
        {balance > 0 ? positiveMessage : negativeMessage} {Math.abs(balance)}{' '}
        {token}
      </Typography>

      <ActionsSection />

      <GroupsSection />

      <LatestActivitySection />
    </Stack>
  );
};

export default Home;
