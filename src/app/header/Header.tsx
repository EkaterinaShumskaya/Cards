import React from "react";
import s from './Main.module.css'
import { sxBox } from "common/utils/styles-utils/sxBox";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { PasswordInput } from "common/components/input/PasswordInput";
import { ButtonComponent } from "common/components/button/ButtonComponent";
import { sxButtonCreator } from "common/utils/styles-utils/sxButtonCreator";
import { NavLink } from "react-router-dom";
import { PATH } from "common/contacts/path";
import Box from "@mui/material/Box";
export const Main = () => {
  return (
   <div className={s.main}>
         <button>Sing in</button>
   </div>
  )
};

