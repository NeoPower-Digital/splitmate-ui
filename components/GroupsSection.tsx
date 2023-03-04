import { ROUTES } from '@/constants/routes';
import AddIcon from '@mui/icons-material/Add';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Card, Stack, Typography } from '@mui/material';
import { NextLinkComposed } from './Link';
import GroupIcon from '@mui/icons-material/Group';
import SectionTitle from './SectionTitle';

interface GroupsSectionProps {}

const GroupsSection: React.FC<GroupsSectionProps> = () => {
  const actions = [
    {
      icon: <VisibilityIcon />,
      label: 'View',
      path: ROUTES.VIEW_GROUPS,
    },
    {
      icon: <AddIcon />,
      label: 'Create',
      path: ROUTES.ADD_GROUP,
    },
    {
      icon: <QrCodeScannerIcon />,
      label: 'Join',
      path: 'open-camera',
    },
  ];

  return (
    <Stack gap={2}>
      <SectionTitle icon={<GroupIcon />} label="Groups" />

      <Stack direction="row" gap={2}>
        {actions.map(({ icon, label, path }, index) => (
          <Button
            key={index}
            startIcon={icon}
            component={NextLinkComposed}
            to={{ pathname: path }}
            sx={{ flex: 1, backgroundColor: 'lightgray' }}
            variant="contained"
          >
            {label}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default GroupsSection;
