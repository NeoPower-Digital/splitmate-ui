import { accountAtom } from '@/states/account.atom';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';

interface ViewGroupsProps {}

const ViewGroups: React.FC<ViewGroupsProps> = () => {
  const [account, _] = useAtom(accountAtom);
  const { data: session } = useSession();

  return (
    <Stack>
      <Typography>
        {session && account
          ? 'View Groups Page'
          : 'Please Connect your wallet to continue'}
      </Typography>
    </Stack>
  );
};

export default ViewGroups;
