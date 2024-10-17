import { useState, useEffect } from "react";
import "./App.css";
import "./animate.css";
import QuestionsFetcher from './components/QuestionsFetcher';
import QuestionsContainer from "./components/QuestionsContainer";
import Answers from "./components/Answers";
import QuizHeader from "./components/QuizHeader";
import MainMenu from "./components/MainMenu";
import Question from "./components/Question";
import Paging from "./components/Paging";
import QuizResults from "./components/QuizResults";
import ScoreIndicatorBoard from "./components/ScoreIndicatorBoard";

function App(props) {

  const [questions, setQuestions] = useState({
    html5_questions: [],
    css3_questions: [],
    js_questions: [],
    react_questions: [],
  });

  const [categoryValue, setCategoryValue] = useState("");
  const [questionsList, setQuestionsList] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showText, setShowText] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSlider, setShowSlider] = useState("");
  const [correctState, setCorrectState] = useState(undefined);
  const [isSelectedAnswer, setIsSelectedAnswer] = useState(undefined);
  const [answerClassName, setAnswerClassName] = useState(undefined);
  const [pagingTextState, setPagingTextState] = useState("");
  const [currentAnswerClassName, setCurrentAnswerClassName] = useState("");
  const [showApp, setShowApp] = useState(false);
  const [totalTime, setTotalTime] = useState(20);
  const [time, setTime] = useState(new Date(0, 0, 0, 0, 20));
  const [timerRunning, setTimerRunning] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [isSelectedDiff, setIsSelectedDiff] = useState(false);
  const [questionsNumberPickerValue, setQuestionsNumberPickerValue] =
    useState(1);

  function chooseHome() {
    setShowApp(false);
    setIsSelectedDiff(false);
    setCategoryValue("");
    setTime(new Date(0, 0, 0, 0, 5));
    setTimerRunning(true);
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setShowResult(false)
    setShowText(false);
  }

  const updateTimerRunning = (value) => {
    setTimerRunning(value);
  };

  const updateTotalTime = (value) => {
    setTotalTime(value);
  };

  const updatePercentage = (value) => {
    setPercentage(Math.min(100, value));
  };

  const updateTime = (value) => {
    setTime(value);
  };

  const updateSetQuestionsList = (value) => {
    //setQuestionsList(value);
    const qlist = value.slice(0, questionsNumberPickerValue);
    setQuestionsList(qlist);
  };

  const correctAnswersCounter = () => {
    //setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1);
    setCorrectAnswers(correctAnswers + 1);
  };

  const incorrectAnswersCounter = () => {
    setIncorrectAnswers(incorrectAnswers + 1);
  };

  function updateChooseDiff(difficulty) {
    if (difficulty === "easy") {
      setTotalTime(20);
      setTime(new Date(0, 0, 0, 0, 20));
    } else if (difficulty === "medium") {
      setTotalTime(10);
      setTime(new Date(0, 0, 0, 0, 10));
    } else if (difficulty === "hard") {
      setTotalTime(5);
      setTime(new Date(0, 0, 0, 0, 5));
    }
  }

  function updateIsSelectedDiff(value) {
    setIsSelectedDiff(value);
  }
  function updateSetShowText(value) {
    setShowText(value);
  }

  function updateGetQuestionsNumberPickerValue(value) {
    setQuestionsNumberPickerValue(value);
  }

  useEffect(() => {
    setCorrectState([]);
    if (showSlider === "slide-right") {
      const slidertimeout = setTimeout(() => {
        setShowSlider("");
      }, 1200);
      return () => clearTimeout(slidertimeout);
    }
  }, [showSlider]);

  return (
    <div className="app-container">
      <QuestionsFetcher setQuestions={setQuestions} />
      {showApp === false ? (
        <MainMenu
          category={categoryValue}
          setCategoryValue={setCategoryValue}
          questions={questionsList}
          questionsList={questionsList}
          html5_questions={questions.html5_questions || []}
          css3_questions={questions.css3_questions || []}
          js_questions={questions.js_questions || []}
          react_questions={questions.react_questions || []}
          setQuestionsList={updateSetQuestionsList}
          showApp={showApp}
          setShowApp={setShowApp}
          chooseHome={chooseHome}
          chooseDiff={updateChooseDiff}
          isSelectedDiff={isSelectedDiff}
          setIsSelectedDiff={updateIsSelectedDiff}
          questionsNumberPickerValue={questionsNumberPickerValue}
          setQuestionsNumberPickerValue={updateGetQuestionsNumberPickerValue}
        />
      ) : (
        categoryValue && (
          <>
            <QuizHeader
              category={categoryValue}
              setCategoryValue={setCategoryValue}
              showApp={showApp}
              setShowApp={setShowApp}
              chooseHome={chooseHome}
            />
            {showResult ? (
              <QuizResults
                showText={showText}
                correctAnswers={correctAnswers}
                questions={questionsList}
              />
            ) : (
              <>
                <ScoreIndicatorBoard
                  correctAnswers={correctAnswers}
                  incorrectAnswers={incorrectAnswers}
                  questions={questionsList}
                />
                <main className={`flex flex-column ${showSlider}`}>
                  <QuestionsContainer
                    currentQuestion={currentQuestion}
                    questions={questionsList}
                    timerRunning={timerRunning}
                    setTimerRunning={updateTimerRunning}
                    time={time}
                    setTime={updateTime}
                    totalTime={totalTime}
                    setTotalTime={updateTotalTime}
                    percentage={percentage}
                    setPercentage={updatePercentage}
                    showApp={showApp}
                    setShowApp={setShowApp}
                    chooseHome={chooseHome}
                  />

                  {timerRunning ? (
                    <>
                      <Question
                        questions={questionsList}
                        currentQuestion={currentQuestion}
                        question={questionsList[currentQuestion].question}
                        codeblock={questionsList[currentQuestion].code}
                        language="javascript"
                      />
                      <Answers
                        question={questionsList[currentQuestion]}
                        questions={questionsList}
                        setShowSlider={setShowSlider}
                        setShowResult={setShowResult}
                        setShowText={updateSetShowText}
                        correctState={correctState}
                        correctAnswer={
                          questionsList[currentQuestion].correctAnswer
                        }
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                        answerClassName={answerClassName}
                        correctAnswersCounter={correctAnswersCounter}
                        incorrectAnswersCounter={incorrectAnswersCounter}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </main>
              </>
            )}
          </>
        )
      )}
    </div>
  );
}

export default App;
