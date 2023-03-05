import {
  DistributionByMember,
  DistributionType,
  Expense,
  ExpenseDistribution,
} from '@/model/expense';
import { GroupMember } from '@/model/splitmate';
import { groupsAtom } from '@/states/groups.atom';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Tab,
  TextField,
  Typography,
} from '@mui/material';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

interface NewExpenseProps {}

const NewExpense: React.FC<NewExpenseProps> = () => {
  // Initial data
  const [groups, setGroups] = useAtom(groupsAtom);

  // Form data
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [group, setGroup] = useState('');
  const [groupMembers, setGroupMembers] = useState<Array<GroupMember>>([]);
  const [paidBy, setPaidBy] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Distribution
  const [distributionType, setDistributionType] =
    useState<DistributionType>('EQUALLY');

  const [equallyMembersDistribution, setEquallyMembersDistribution] = useState<
    Array<DistributionByMember>
  >([]);
  const [unequallyMembersDistribution, setUnequallyMembersDistribution] =
    useState<Array<DistributionByMember>>([]);

  useEffect(() => {
    const defaultEquallyDistribution = groupMembers.map(({ address }) => {
      return { memberAddress: address, value: true };
    });
    setEquallyMembersDistribution(defaultEquallyDistribution);

    const defaultUnequallyDistribution = groupMembers.map(({ address }) => {
      return { memberAddress: address, value: 0 };
    });
    setUnequallyMembersDistribution(defaultUnequallyDistribution);
  }, [groupMembers]);

  const handleSubmit = () => {
    let membersDistribution =
      distributionType === 'EQUALLY'
        ? equallyMembersDistribution
        : unequallyMembersDistribution;

    // Filter members with 0 or false distribution value
    membersDistribution = membersDistribution.filter((m) => !!m.value);

    const distribution: ExpenseDistribution = {
      distributionType: distributionType,
      distributionByMembers: membersDistribution,
    };

    const expense: Expense = {
      group: Number.parseInt(group),
      amount: Number.parseFloat(amount),
      description,
      payerAddress: groupMembers[paidBy].address,
      distribution,
    };

    // TODO: Send expense to blockchain
    console.log(expense);

    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  return (
    <Stack gap={2}>
      <Typography variant="h3">Add expense</Typography>

      <FormControl>
        <InputLabel id="group-label">Group</InputLabel>
        <Select
          labelId="group-label"
          id="group"
          value={group}
          label="Group"
          onChange={(event: SelectChangeEvent) => {
            const groupId = event.target.value;
            setGroup(groupId);
            const members = groups.find(
              (g) => g.id === Number.parseInt(groupId)
            )?.members;
            setGroupMembers(members || []);
          }}
        >
          {groups.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        id="description"
        label="Description"
        autoComplete="off"
        value={description}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setDescription(event.target.value);
        }}
      />

      <TextField
        required
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        id="amount"
        label="Amount"
        autoComplete="off"
        value={amount}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setAmount(event.target.value);
        }}
      />

      <FormControl>
        <InputLabel id="paid-by-label">Paid by</InputLabel>
        <Select
          disabled={groupMembers.length === 0}
          labelId="paid-by-label"
          id="paid-by"
          value={paidBy.toString()}
          label="Group"
          onChange={(event: SelectChangeEvent) => {
            setPaidBy(Number.parseInt(event.target.value));
          }}
        >
          {groupMembers.map(({ name }, index) => (
            <MenuItem key={index} value={index}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TabContext value={distributionType}>
        <TabList
          onChange={(event, value: DistributionType) => {
            setDistributionType(value);
          }}
        >
          <Tab value="EQUALLY" label="Equally" sx={{ flex: 1 }} />
          <Tab value="UNEQUALLY" label="Unequally" sx={{ flex: 1 }} />
        </TabList>

        <TabPanel value="EQUALLY">
          {group ? (
            <Stack>
              {groupMembers.map(({ name, address }, index) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox defaultChecked />}
                  label={name}
                  onChange={(event, checked) => {
                    const distribution = equallyMembersDistribution;

                    distribution.map((d) => {
                      d.value = d.memberAddress === address ? checked : d.value;
                    });

                    setEquallyMembersDistribution(distribution);
                  }}
                />
              ))}
            </Stack>
          ) : (
            <Typography>Select a group first</Typography>
          )}
        </TabPanel>

        <TabPanel value="UNEQUALLY">
          {group ? (
            <Stack gap={2}>
              {groupMembers.map(({ name, address }, index) => (
                <TextField
                  key={index}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  id={address}
                  label={name}
                  autoComplete="off"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const distribution = unequallyMembersDistribution;

                    const value = Number.parseFloat(event.target.value);

                    distribution.map((d) => {
                      d.value = d.memberAddress === address ? value : d.value;
                    });

                    setUnequallyMembersDistribution(distribution);
                  }}
                />
              ))}
            </Stack>
          ) : (
            <Typography>Select a group first</Typography>
          )}
        </TabPanel>
      </TabContext>

      <LoadingButton
        variant="contained"
        onClick={handleSubmit}
        loadingPosition="end"
        loading={isSaving}
      >
        {isSaving ? 'Sending transaction' : 'Add expense'}
      </LoadingButton>
    </Stack>
  );
};

export default NewExpense;
