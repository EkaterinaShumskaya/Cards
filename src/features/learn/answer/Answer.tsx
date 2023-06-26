import React, { FC, useState } from "react";
import { ButtonComponent } from "common/components/buttons/ButtonComponent";
import { useAppDispatch, useAppSelector } from "app/hooks";
import s from './Answer.module.css'
import { learnThunks } from "features/learn/learn.slice";
import errorImg from "../../assets/errorImg.png";
import { SetGradePayloadType } from "features/learn/learn.api";
import { Grades} from "features/learn/Grades";
import { sxButtonMarginTopWidthCreator } from "common/utils/styles-utils/sxButtonCreator";


type PropsType={
  answer:string,
  answerImg: string | undefined
  onUpdateGrade:()=>void
}


export const Answer:FC<PropsType> = ({answer,answerImg,onUpdateGrade}) => {
  const dispatch=useAppDispatch()
  const [isImgBroken, setIsImgBroken] = useState(false)
  const card_id=useAppSelector(state => state.learn.currentCard._id)
  const grade=useAppSelector(state => state.learn.grade)




  const onNextHandler=()=>{
    const model:SetGradePayloadType={
      card_id:card_id,
      grade:grade,
    }
    dispatch(learnThunks.updateGrade(model))
    onUpdateGrade()
  }



  const errorHandler = (setBroken: (error: boolean) => void) => {
    setBroken(true)
  }
  const finalAnswer =
       answerImg && answerImg !== 'noImg' ? (
      <img
        alt="img"
        src={isImgBroken ? errorImg : answerImg}
        style={{ width: '100%' }}
        onError={() => errorHandler(setIsImgBroken)}
      />
    ) : (
      answer
    )

  return (
    <div className={s.answer}>
      <span>
        <b>Answer: </b> {finalAnswer}
      </span>
      <Grades />
      <ButtonComponent sx={sxButtonMarginTopWidthCreator()} onClick={onNextHandler}>
        Next
      </ButtonComponent>
    </div>
  );
};


