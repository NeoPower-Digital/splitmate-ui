import { Stack, Typography } from '@mui/material';

interface SectionTitleProps {
  icon: React.ReactNode;
  label: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ icon, label }) => {
  return (
    <Stack direction="row" gap={1} alignItems="center">
      {icon}

      <Typography variant="h6">{label}</Typography>
    </Stack>
  );
};

export default SectionTitle;
