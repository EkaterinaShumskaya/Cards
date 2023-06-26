import { useAppDispatch } from "app/hooks";
import React, { useEffect } from "react";
import { learnAction } from "features/learn/learn.slice";
import FormControl from "@mui/material/FormControl";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export const Grades = () => {
  const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(learnAction.setGrade(1))
  }, [])

  const onChangeGrade = (grade: number) => {
    dispatch(learnAction.setGrade(grade + 1))
  }

  return (
    <FormControl>
      <span>Rate yourself:</span>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue={0}
        name="radio-buttons-group"
      >
        {grades.map((elem, index) => (
          <FormControlLabel
            key={index}
            value={index}
            control={<Radio />}
            label={elem}
            onChange={() => onChangeGrade(index)}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}


