import { LoadingButton } from '@mui/lab';
import {
  Button,
  Checkbox,
  ListItemButton,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface SettleUpProps {
  ides: number;
  addresses: [string];
}

interface Debt {
  address: string;
  name: string;
  amount: number;
}

const SettleUp: React.FC<SettleUpProps> = () => {
  const [selectedDebts, setSelectedDebts] = useState<Array<Debt>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (debt: Debt, checked: boolean) => {
    let result = [...selectedDebts];

    if (checked) {
      result.push(debt);
    } else {
      result.splice(
        selectedDebts.findIndex((d) => d.address === debt.address),
        1
      );
    }

    setSelectedDebts(result);
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const save = () => {
    const debtsToSettleUp = selectedDebts.map(({ address, amount }) => {
      return { address, amount };
    });
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  const debts = [
    {
      name: 'Bob',
      amount: 10,
      address: '0x0',
    },
    {
      name: 'Rick',
      amount: 88,
      address: '0x1',
    },
    {
      name: 'Patrick',
      amount: 67,
      address: '0x2',
    },
  ];

  return (
    <Stack>
      <Typography variant="h2">Settle up</Typography>
      <Stack direction="column" gap={2} p={2}>
        {isLoading ? (
          <>
            <Skeleton height={50} variant="rectangular" />
            <Skeleton height={50} variant="rectangular" />
            <Skeleton height={50} variant="rectangular" />
          </>
        ) : (
          debts.map((debt, index) => (
            <ListItemButton key={index}>
              <Checkbox
                checked={
                  !!selectedDebts.find((d) => d.address === debt.address)
                }
                onChange={(event) => handleChange(debt, event.target.checked)}
              />
              <ListItemText primary={`${debt.name} $${debt.amount}`} />
            </ListItemButton>
          ))
        )}
      </Stack>
      <Typography variant="h4" p={2}>
        You will settle up with{' '}
        {selectedDebts.map(({ name }) => name).join(', ')} for $
        {selectedDebts
          .map(({ amount }) => amount)
          .reduce((accum, current) => accum + current, 0)}
      </Typography>
      {!isLoading && (
        <LoadingButton
          onClick={save}
          loading={isSaving}
          variant="contained"
          loadingPosition="end"
        >
          {isSaving ? 'Sending transaction' : 'Settle up'}
        </LoadingButton>
      )}
    </Stack>
  );
};

export default SettleUp;
