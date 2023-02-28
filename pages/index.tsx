import { NextLinkComposed } from "@/components/Link";
import { MenuItem, MenuList, Paper, Stack, Typography } from "@mui/material";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const menuItems = [
    {
      path: "new-group",
      label: "Create group",
    },
    {
      path: "join-group",
      label: "Join group",
    },
    {
      path: "new-expense",
      label: "Add expense",
    },
    {
      path: "settle-up",
      label: "Settle up",
    },
    {
      path: "supabase",
      label: "Test Supabase",
    },
  ];

  return (
    <Stack gap={2}>
      <Typography variant="h4">Welcome to SplitMate!</Typography>
      <Typography>What do you want to do?</Typography>

      <Paper>
        <MenuList>
          {menuItems.map(({ path, label }, index) => (
            <MenuItem
              key={index}
              component={NextLinkComposed}
              to={{ pathname: path }}
            >
              {label}
            </MenuItem>
          ))}
        </MenuList>
      </Paper>
    </Stack>
  );
};

export default Home;
