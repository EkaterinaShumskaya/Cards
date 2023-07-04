export const sxButtonCreator = (mt: string = "0", width: string = "100%") => {
  return {
    width: width,
    mt: mt
  };
};

export const sxButtonColorCreator = (
  color: string[],
  width: string = "127px",
  mt: string = "20px",
  mb: string = "20px"
) => {
  return {
    mb: mb,
    mt: mt,
    width: width,
    background: color[0],
    color: color[1],
    ":hover": {
      background: color[0],
      color: color[1]
    }
  };
};

export const sxButtonMarginTopWidthCreator = (mt: string = "0", width: string = "100%") => {
  return {
    width: width,
    mt: mt
  };
};