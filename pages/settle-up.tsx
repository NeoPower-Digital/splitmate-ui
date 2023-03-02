import {
  Button,
  Card,
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface SettleUpProps {}

const SettleUp: React.FC<SettleUpProps> = () => {
  const [selectedDebts, setSelectedDebts] = useState<Array<number>>([]);
  const [clickedBox, setClickedBox] = useState();

  const handleChange = (index: number) => {
    const updateList = [...selectedDebts, index];
    setSelectedDebts(updateList);
  };
  // const handleClick = ()=>{
  //     if(clickBox){
  //         setClickBox()
  //     }
  // };

  const debts = [
    {
      name: "Bob",
      amount: 10,
    },
    {
      name: "Rick",
      amount: 88,
    },
    {
      name: "Patrick",
      amount: 67,
    },
  ];

  return (
    <Stack>
      <Typography variant="h2">Settle up</Typography>
      <Stack direction="column" gap={2} p={2}>
        {debts.map(({ name, amount }, index) => (
          <ListItemButton key={index}>
            <Checkbox
              checked={selectedDebts.includes(index)}
              onChange={() => handleChange(index)}
            />
            <ListItemText primary={`${name} $${amount}`} />
          </ListItemButton>
        ))}
      </Stack>
      <Typography variant="h4" p={2}>
        You will settle up with{" "}
        {debts[selectedDebts[0]]
          ? debts
              .filter((debt, index) => selectedDebts.includes(index))
              .map(({ name }) => name)
              .join(", ")
          : null}{" "}
        for $
        {debts[selectedDebts[0]]
          ? debts
              .filter((debt, index) => selectedDebts.includes(index))
              .map(({ amount }) => amount)
              .reduce((accum, current) => accum + current, 0)
          : null}
      </Typography>
      <Button variant="contained">Settle up</Button>
    </Stack>
  );
};

export default SettleUp;
