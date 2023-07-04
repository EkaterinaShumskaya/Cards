import React, { useEffect } from "react";
import { selectedPackSelector } from "features/packs/packsSelector";
import { useAppDispatch, useAppSelector } from "app/hooks";
import s from "./Learn.module.css";
import { PATH } from "common/contacts/path";
import { BackPackLink } from "common/components/back-pack-list/BackPackLink";
import { isLoadingLearnSelector } from "features/learn/learnSelector";
import { learnAction } from "features/learn/learn.slice";
import { getRandomCard } from "common/utils/getRandomCard";
import { Question } from "features/learn/question/Question";
import { Answer } from "features/learn/answer/Answer";
import Paper from "@mui/material/Paper";
import { LinearProgress } from "@mui/material";


export const Learn = () => {
  const selectedPack = useAppSelector(selectedPackSelector);
  const isShowAnswer = useAppSelector(state => state.learn.isShowAnswer);
  const currentCard = useAppSelector(state => state.learn.currentCard);
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cards.cards.cards);

  const isLoadingLearn = useAppSelector(isLoadingLearnSelector);


  const getQuestion = () => {
    if (cards.length > 0) {
      const randomCard = getRandomCard(cards);
      dispatch(learnAction.setCurrentCard(randomCard));
    }
  };

  const onUpdateGrade = () => {
    dispatch(learnAction.setIsShowAnswer(false));
    getQuestion();
  };

  useEffect(() => {
    getQuestion();
  }, [cards]);


  return (
    <>
      {isLoadingLearn && <LinearProgress />}
      <BackPackLink link={PATH.PACKS} text={"Back to Packs List"} />
      <div className={s.questionContainer}>
        <span className={s.title}>Learn &quot;{selectedPack.name}&quot;</span>
        <Paper elevation={3}>
          <Question />
          {isShowAnswer && (
            <Answer answer={currentCard.answer}
                    answerImg={currentCard.answerImg}
                    onUpdateGrade={onUpdateGrade}
            />)
          }
        </Paper>
      </div>
    </>
  );
};


// return (
//   <>
//     <BackPackLink link={PATH.PACKS} text={"Back to Packs List"} />
//     <Grid
//       container
//       spacing={3}
//       direction="column"
//       alignItems="center"
//       sx={{ marginTop: "20px" }}
//     >
//       <Grid item xs={12}>
//         <Typography variant="h5" component="h4" sx={{ fontWeight: 600 }}>
//           Learn: {selectedPack.name}
//         </Typography>
//       </Grid>
//       <Grid item xs={12}>
//         <Paper
//           variant="outlined"
//           sx={{ display: "flex", flexDirection: "column", gap: 1, p: "35px" }}
//         >
//           <div className={s.content}>
//             <div>Question: {currentCard.question ? currentCard.question : currentCard.questionImg}</div>
//           </div>
//           <Typography
//             variant="subtitle2"
//             component="div"
//             sx={{ marginBottom: "20px", opacity: 0.5 }}
//           >
//             Количество попыток ответов на вопрос:{" "}
//             {isLoadingLearn ? <Skeleton variant="text" /> : <b>{currentCard.shots}</b>}
//           </Typography>
//
//           {showAnswer ? (
//               <LearnFormRadio answer={currentCard.answer}
//                               answerImg={currentCard.answerImg}
//                               onUpdateGrade={onUpdateGrade}
//               />)
//             : (
//               <ButtonComponent
//                 sx={sxButtonCreator("35px")}
//                 onClick={handleShowAnswer}
//               >
//                 Show answer
//               </ButtonComponent>
//             )
//           }
//         </Paper>
//       </Grid>
//     </Grid>
//   </>
// );
// };


