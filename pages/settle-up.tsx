import { Debt } from '@/model/splitmate';
import { debtsByGroupAtom } from '@/states/debts.atom';
import { groupsAtom } from '@/states/groups.atom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LoadingButton } from '@mui/lab';
import {
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

interface SettleUpProps {
  ides: number;
  addresses: [string];
}

const SettleUp: React.FC<SettleUpProps> = () => {
  const token = 'USDT';
  const [selectedDebts, setSelectedDebts] = useState<Array<Debt>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [debtsByGroup, setDebtsByGroup] = useAtom(debtsByGroupAtom);
  const [groups, setGroups] = useAtom(groupsAtom);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

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

  const save = () => {
    console.log(selectedDebts);

    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  const getMemberName = (groupId: number, address: string) => {
    return groups
      .find((g) => g.id === groupId)
      ?.members.find((m) => m.address === address)?.name;
  };

  return (
    <Stack gap={2}>
      <Typography variant="h2">Settle up</Typography>

      {debtsByGroup.map(({ groupId, debts }) => (
        <Accordion key={groupId}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {groups.find((g) => g.id === groupId)?.name}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Stack direction="column" gap={1} p={2}>
              {isLoading ? (
                <>
                  <Skeleton variant="rectangular" />
                  <Skeleton variant="rectangular" />
                  <Skeleton variant="rectangular" />
                </>
              ) : (
                debts.map(({ address, amount }, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={
                          !!selectedDebts.find((d) => d.address === address)
                        }
                      />
                    }
                    label={`${getMemberName(
                      groupId,
                      address
                    )} ${amount} ${token}`}
                    onChange={(event, checked) =>
                      handleChange(
                        {
                          address,
                          name: getMemberName(groupId, address),
                          amount,
                        },
                        checked
                      )
                    }
                  />
                ))
              )}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}

      <Typography variant="h4" p={2}>
        You will settle up with{' '}
        {selectedDebts.map(({ name }) => name).join(', ')} for{' '}
        {selectedDebts
          .map(({ amount }) => amount)
          .reduce((accum, current) => accum + current, 0)}{' '}
        {token}
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
