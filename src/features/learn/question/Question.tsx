import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import s from "features/learn/question/Question.module.css";
import errorImg from "assets/errorImg.png";
import { sxButtonMarginTopWidthCreator } from "common/utils/styles-utils/sxButtonCreator";
import { ButtonComponent } from "common/components/buttons/ButtonComponent";
import { learnAction } from "features/learn/learn.slice";


export const Question = () => {
  const currentCard = useAppSelector(state => state.learn.currentCard);
  const [isImgBroken, setIsImgBroken] = useState(false);
  const isShowAnswer = useAppSelector(state => state.learn.isShowAnswer);
  const dispatch = useAppDispatch();


  const handleShowAnswer = () => {
    dispatch(learnAction.setIsShowAnswer(true));
  };

  const errorHandler = (setBroken: (error: boolean) => void) => {
    setBroken(true);
  };

  const finalQuestion =
    currentCard.questionImg && currentCard.questionImg !== "noImg" ? (
      <img
        alt="img"
        src={isImgBroken ? errorImg : currentCard.questionImg}
        style={{ width: "100%" }}
        onError={() => errorHandler(setIsImgBroken)}
      />
    ) : (
      currentCard.question
    );

  return (
    <div className={s.questionContainer}>
      <div className={s.question}>
        <b>Question: </b> {finalQuestion}
      </div>
      <span className={s.numberOfAnswers}>
        Number of answers to the question: <b>{currentCard.shots}</b>
      </span>

      {!isShowAnswer && (
        <ButtonComponent
          sx={sxButtonMarginTopWidthCreator()}
          onClick={handleShowAnswer}
        >
          Show answer
        </ButtonComponent>
      )
      }
    </div>
  );
};
