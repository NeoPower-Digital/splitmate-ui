import { IconButton, Stack, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { NextLinkComposed } from "./Link";

interface GroupsSectionProps {}

const GroupsSection: React.FC<GroupsSectionProps> = () => {
  const actions = [
    {
      icon: <VisibilityIcon />,
      label: "View",
      path: "groups",
    },
    {
      icon: <AddIcon />,
      label: "Create",
      path: "new-group",
    },
    {
      icon: <QrCodeScannerIcon />,
      label: "Join",
      path: "open-camera",
    },
  ];

  return (
    <Stack gap={2}>
      <Typography>Groups</Typography>

      <Stack direction="row" gap={4} justifyContent="space-around">
        {actions.map(({ icon, label, path }, index) => (
          <Stack
            key={index}
            gap={1}
            alignItems="center"
            component={NextLinkComposed}
            to={{ pathname: path }}
            sx={{ textDecoration: "none" }}
          >
            {icon}

            <Typography>{label}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default GroupsSection;
