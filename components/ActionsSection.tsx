import { Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { NextLinkComposed } from './Link';
import { ROUTES } from '@/constants/routes';

interface ActionsSectionProps {}

const ActionsSection: React.FC<ActionsSectionProps> = () => {
  return (
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
  );
};

export default ActionsSection;
