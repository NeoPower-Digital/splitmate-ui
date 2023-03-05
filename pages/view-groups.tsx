import { accountAtom } from '@/states/account.atom';
import { groupsAtom } from '@/states/groups.atom';
import { List, ListItem, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';

interface ViewGroupsProps {}

const ViewGroups: React.FC<ViewGroupsProps> = () => {
  const [account, _] = useAtom(accountAtom);
  const [groups, setGroups] = useAtom(groupsAtom);
  const { data: session } = useSession();

  return (
    <Stack gap={2}>
      <Typography variant="h2">Groups</Typography>

      {groups.map(({ id, name, members }) => (
        <Stack key={id}>
          <Typography variant="h5">{name}</Typography>

          <List>
            {members.map(({ name, address }, index) => (
              <ListItem key={index}>
                👤 {name} - {address}
              </ListItem>
            ))}
          </List>
        </Stack>
      ))}
    </Stack>
  );
};

export default ViewGroups;
