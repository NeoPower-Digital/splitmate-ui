import ActionsSection from "@/components/ActionsSection";
import GroupsSection from "@/components/GroupsSection";
import LatestActivitySection from "@/components/LatestActivitySection";
import { Stack, Typography } from "@mui/material";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const userName = "Brian";
  const positiveMessage = "🟢 You are owed";
  const negativeMessage = "🔴 You owe";
  const balance = -340;
  const token = "USDT";

  return (
    <Stack gap={2}>
      <Typography>👋🏻 Welcome {userName}!</Typography>

      <Typography variant="h4">
        {balance > 0 ? positiveMessage : negativeMessage} {Math.abs(balance)}{" "}
        {token}
      </Typography>

      <ActionsSection />

      <GroupsSection />

      <LatestActivitySection />
    </Stack>
  );
};

export default Home;
