import { Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { NextLinkComposed } from './Link';
import { ROUTES } from '@/constants/routes';
import { balanceAtom } from '@/states/balance.atom';
import { useAtom } from 'jotai';
import PaidIcon from '@mui/icons-material/Paid';

interface ActionsSectionProps {}

const ActionsSection: React.FC<ActionsSectionProps> = () => {
  const [balance, setBalance] = useAtom(balanceAtom);
  const positiveMessage = 'You are owed';
  const negativeMessage = 'You owe';
  const token = 'USDT';

  return (
    <>
      <Stack direction="row" gap={1} alignItems="center">
        <PaidIcon fontSize="large" color="secondary" />

        <Typography variant="h4" alignContent="center">
          {balance > 0 ? positiveMessage : negativeMessage}{' '}
          <span style={{ fontWeight: 'bold' }}>
            {Math.abs(balance)} {token}
          </span>
        </Typography>
      </Stack>

      <Stack direction="row" gap={2}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<HandshakeIcon />}
          sx={{ flex: 1 }}
          component={NextLinkComposed}
          to={{ pathname: ROUTES.SETTLE_UP }}
        >
          Settle up
        </Button>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ flex: 1 }}
          component={NextLinkComposed}
          to={{ pathname: ROUTES.ADD_EXPENSE }}
        >
          Add expense
        </Button>
      </Stack>
    </>
  );
};

export default ActionsSection;
