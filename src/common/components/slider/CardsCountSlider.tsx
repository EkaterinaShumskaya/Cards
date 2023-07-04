import React, { memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Slider } from "@mui/material";

type CardsCountSliderPropsType = {
  disabled?: boolean
  onChange: (minCardsCount: string, maxCardsCount: string) => void
  minMax: number[]
  setMinMax: (value: number[]) => void
}

export const CardsCountSlider: React.FC<CardsCountSliderPropsType> = memo(
  ({ onChange, disabled, minMax, setMinMax }) => {

    const handleMouseUp = () => {
      onChange(minMax[0].toString(), minMax[1].toString());
    };
    const handleChange = (event: Event, newValue: number | number[]) => {
      if (Array.isArray(newValue)) setMinMax(newValue);
    };

    const boxSx = {
      width: "60px",
      height: "33px",
      border: "1px solid rgba(000, 000, 000, 0.3)",
      borderRadius: "3px",
      padding: "3px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    };
    const typographySx = {
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: "20px",
      textAlign: "center"
    };

    return (
      <Box>
        <Typography sx={{ fontSize: "16px", fontWeight: "500", mb: "8px" }}>
          Number of cards
        </Typography>
        <Box sx={{ width: 300, display: "flex", alignItems: "center" }}>
          <Box sx={boxSx}>
            <Typography sx={typographySx}>{minMax[0]}</Typography>
          </Box>
          <Slider
            value={minMax}
            onMouseUp={handleMouseUp}
            onChange={handleChange}
            sx={{ m: "0 20px" }}
            disabled={disabled}
          />
          <Box sx={boxSx}>
            <Typography sx={typographySx}>{minMax[1]}</Typography>
          </Box>
        </Box>
      </Box>
    );
  }
);