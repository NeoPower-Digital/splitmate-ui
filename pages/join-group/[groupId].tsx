import { LoadingButton } from "@mui/lab";
import { Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

interface JoinGroupProps {}

const JoinGroup: React.FC<JoinGroupProps> = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { groupId } = router.query;

  // TODO: Replace with DB data
  const memberName = useRef("");
  const groupName = "ETH Denver";

  const handleClick = () => {
    // TODO: Add member with provided name
    console.log({ name: memberName.current, groupId });
  };

  return (
    <Stack gap={2}>
      <Typography variant="h3">You are joining:</Typography>
      <Typography variant="h3" fontWeight="bold">
        {groupName}
      </Typography>

      <Typography>Tell us your name for this group:</Typography>

      <TextField
        required
        id="name"
        label="Your name"
        autoComplete="off"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          memberName.current = event.target.value;
        }}
      />

      <LoadingButton
        loading={isLoading}
        variant="contained"
        onClick={handleClick}
        loadingPosition="end"
      >
        <span>{isLoading ? "Sending TX..." : "Join"}</span>
      </LoadingButton>
    </Stack>
  );
};

export default JoinGroup;
