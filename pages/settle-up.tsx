import {
  Button,
  Card,
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface SettleUpProps {
  ides: number;
  addresses: [string];
}

interface Debt {
  id: number;
  address: string;
  name: string;
  amount: number;
}

const SettleUp: React.FC<SettleUpProps> = () => {
  const [selectedDebts, setSelectedDebts] = useState<Array<Debt>>([]);

  const handleChange = (debt: Debt, checked: boolean) => {
    let result = [...selectedDebts];

    if (checked) {
      result.push(debt);
    } else {
      result.splice(
        selectedDebts.findIndex((d) => d == debt),
        1
      );
    }

    setSelectedDebts(result);
  };

  const save = () => {
    const debtsToSettleUp = selectedDebts
      .map(({ address, amount }) => {
        return { address, amount };
      });
      console.log(debtsToSettleUp);
      
  };

  const debts = [
    {
      name: 'Bob',
      amount: 10,
      id: 0,
      address: '0x0',
    },
    {
      name: 'Rick',
      amount: 88,
      id: 1,
      address: '0x1',
    },
    {
      name: 'Patrick',
      amount: 67,
      id: 2,
      address: '0x2',
    },
  ];

  return (
    <Stack>
      <Typography variant="h2">Settle up</Typography>
      <Stack direction="column" gap={2} p={2}>
        {debts.map((debt, index) => (
          <ListItemButton key={index}>
            <Checkbox
              checked={!!selectedDebts.find(d => d.address === debt.address)}
              onChange={(event) => handleChange(debt, event.target.checked)}
            />
            <ListItemText primary={`${debt.name} $${debt.amount}`} />
          </ListItemButton>
        ))}
      </Stack>
      <Typography variant="h4" p={2}>
        You will settle up with{' '}
        {selectedDebts.map(({ name }) => name).join(', ')} for $
        {selectedDebts
          .map(({ amount }) => amount)
          .reduce((accum, current) => accum + current, 0)}
      </Typography>
      <Button onClick={save} variant="contained">
        Settle up
      </Button>
    </Stack>
  );
};

export default SettleUp;
