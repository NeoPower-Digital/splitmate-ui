import { ROUTES } from '@/constants/routes';
import AddIcon from '@mui/icons-material/Add';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Card, Stack, Typography } from '@mui/material';
import { NextLinkComposed } from './Link';

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
      <Typography>Groups</Typography>

      <Stack direction="row" gap={2}>
        {actions.map(({ icon, label, path }, index) => (
          <Card
            key={index}
            sx={{
              flex: 1,
              p: 2,
              textDecoration: 'none',
              '&:hover': { filter: 'brightness(0.8)' },
              backgroundColor: ({ palette }) => palette.primary.main,
            }}
            component={NextLinkComposed}
            to={{ pathname: path }}
          >
            <Stack justifyContent="center" alignItems="center">
              {icon}

              <Typography>{label}</Typography>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};

export default GroupsSection;
