import { FC, memo } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { packsAction } from "features/packs/packs.slice";
import Box from "@mui/material/Box";
import { BackLink } from "common/components/back-pack-list/BackLink";


type BackToPropsType = {
  text: string
  link: string
}


export const BackPackLink: FC<BackToPropsType> = memo(({ text, link }) => {
  const dispatch = useAppDispatch();
  const clearPacksFilters = () => {
    const defaultGetPacksParams = {
      page: "1",
      pageCount: "4",
      min: "0",
      max: "100",
      user_id: "",
      packName: ""
    };
    dispatch(packsAction.setQueryParams({ params: { ...defaultGetPacksParams } }));
  };


  return (
    <BackLink justifyContent={"flex-start"} colorText={"#000"}>
      <Link to={link}>
        <Box
          component={"span"}
          onClick={clearPacksFilters}
          sx={{
            display: "flex",
            gap: "10px",
            minWidth: "200px",
            mt: "25px"
          }}
        >
          <KeyboardBackspaceIcon />
          {text}
        </Box>
      </Link>
    </BackLink>
  );
});


