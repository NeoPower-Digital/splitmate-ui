import ActionsSection from "@/components/ActionsSection";
import GroupsSection from "@/components/GroupsSection";
import LatestActivitySection from "@/components/LatestActivitySection";
import { Stack, Typography } from "@mui/material";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const userName = "Brian";
  const positiveMessage = "You are owed";
  const negativeMessage = "You owe";
  const balance = 100;
  const token = "USDT";

  return (
    <Stack gap={2}>
      <Typography variant="h4">Welcome {userName}!</Typography>
      <Typography>
        {balance > 0 ? positiveMessage : negativeMessage} {balance} {token}
      </Typography>

      <GroupsSection />

      <ActionsSection />

      <LatestActivitySection />
    </Stack>
  );
};

export default Home;
