import { memo } from "react";
import  ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type SwitchButtonPropsType = {
  disabled?: boolean
  showCards: boolean
  setShowCards: (value: boolean) => void
  onClick: () => void
}

export const SwitchButton: React.FC<SwitchButtonPropsType> = memo(({ showCards, setShowCards, onClick, disabled }) => {
  const onMyClick = () => {
    setShowCards(!showCards);
    onClick();

  };
  const onAllClick = () => {
    setShowCards(!showCards);
    onClick();

  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Typography sx={{ fontSize: "16px", fontWeight: "500", mb: "8px" }}>
        Show packs cards
      </Typography>
      <ButtonGroup variant="outlined" sx={{height:"40px",width: "100%"}}>
        <Button onClick={onMyClick} disabled={disabled || !showCards}>
          My
        </Button>
        <Button onClick={onAllClick} disabled={disabled || showCards}>
          All
        </Button>
      </ButtonGroup>
    </Box>
  );
});