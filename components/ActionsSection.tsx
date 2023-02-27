import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HandshakeIcon from "@mui/icons-material/Handshake";

interface ActionsSectionProps {}

const ActionsSection: React.FC<ActionsSectionProps> = () => {
  return (
    <Stack direction="row" gap={2}>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<HandshakeIcon />}
        sx={{ flex: 1 }}
      >
        Settle up
      </Button>

      <Button variant="contained" startIcon={<AddIcon />} sx={{ flex: 1 }}>
        Add expense
      </Button>
    </Stack>
  );
};

export default ActionsSection;
