import { List, ListItem, Stack, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SectionTitle from './SectionTitle';
import HistoryIcon from '@mui/icons-material/History';

interface LatestActivityProps {}

const ActivityItem = ({
  user,
  expenseDescription,
  groupName,
  balance,
  token,
}: any) => {
  const positiveMessage = 'You are owed';
  const negativeMessage = 'You owe';

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: '100%' }}
    >
      <Stack direction="row" gap={2} alignItems="center">
        <AccountCircleIcon fontSize="large" />
        <Typography>
          {user} added {expenseDescription} to {groupName}
        </Typography>
      </Stack>

      <Typography>
        {balance > 0 ? positiveMessage : negativeMessage} {Math.abs(balance)}{' '}
        {token}
      </Typography>
    </Stack>
  );
};

const LatestActivitySection: React.FC<LatestActivityProps> = () => {
  const activities = [
    {
      user: 'Bob',
      expenseDescription: 'Nuggets',
      groupName: 'ETH Denver',
      balance: 50,
      token: 'USDT',
    },
    {
      user: 'Alice',
      expenseDescription: 'Train',
      groupName: 'Couple',
      balance: 10,
      token: 'USDT',
    },
    {
      user: 'John',
      expenseDescription: 'AirBnB',
      groupName: 'ETH Denver',
      balance: -400,
      token: 'USDT',
    },
  ];

  return (
    <Stack>
      <SectionTitle icon={<HistoryIcon />} label="Latest activity" />

      <List>
        {activities.map(
          ({ user, expenseDescription, groupName, balance, token }, index) => (
            <ListItem sx={{ width: '100%' }} key={index}>
              <ActivityItem
                user={user}
                expenseDescription={expenseDescription}
                groupName={groupName}
                balance={balance}
                token={token}
              />
            </ListItem>
          )
        )}
      </List>
    </Stack>
  );
};

export default LatestActivitySection;
