import { Button, Stack } from "@mui/material";

interface ActionsSectionProps {}

const ActionsSection: React.FC<ActionsSectionProps> = () => {
  return (
    <Stack direction="row" justifyContent="space-between" gap={2}>
      <Button variant="contained">Settle up</Button>
      <Button variant="contained">Add expense</Button>
    </Stack>
  );
};

export default ActionsSection;
