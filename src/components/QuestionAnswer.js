import React from "react";
import Choices from "./Choices"

const QuestionAnswer = () => {

    const [apiData, setApiData] = React.useState([])
    const [answers, setAnswers] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [done, setDone] = React.useState(false)
    const [play, setPlay] = React.useState(false)


    React.useEffect(() => {
        async function getQuestion() {
            try{
            const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
            const data = await res.json()

            const updatedChoices = data.results.map((choice) => ({
                ...choice,
                choices: choice.incorrect_answers.concat(choice.correct_answer)
            }))
            setApiData(updatedChoices)

            } catch(error) {
                console.error("Error fetching data", error);
            }
        }
        getQuestion()
    },[play])


    const getAnswers = (newAns, index) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers]
            updatedAnswers[index] = newAns
            return updatedAnswers
        })
    }

    const quizData = apiData.map((item,index) =>{
        return (
            <div className="mx-12 mt-4" key={index}>
                <p className="quiz--question">{index + 1}.{item.question}</p>
                    <Choices choices={item.choices} id={index} disable={done}
                    passAns={(newAns) => getAnswers(newAns,index)} />
                <hr className="mt-2 mx-auto border-t-2"/>
            </div>
        )
    })


    const handleQuiz = (event) => {
        event.preventDefault();
        const updatedScore = apiData.reduce((acc, item, index) => {
            if (item.correct_answer === answers[index]) {
            return acc + 1;
            }
            return acc;
        }, 0);

        setScore(updatedScore);
        isQuizComplete();
    }

    const isQuizComplete = () => {
        setDone(answers.every(element => element !== ''))
    }

    const handlePlayAgain = () => {
        setApiData([]);
        setAnswers([]);
        setScore(0);
        setDone(false);
        setPlay(prevData => !prevData)
    };
    


    return(
        <form className="quiz pt-8" onSubmit={handleQuiz}>
            {quizData}
            {done && (
                <p className="mx-auto mt-4 w-3/6">
                You scored {score}/{answers.length} correct answers
                </p>
            )}
            {done && (
                <button className="block mx-auto mt-2 mb-12 px-4 py-2" onClick={handlePlayAgain}>
                Play Again
                </button>
            )}
            {!done && (
                <button className="block mx-auto mt-2 mb-12 px-4 py-2" >
                Submit Answers
                </button>
            )}
        </form>
    )
}

export default QuestionAnswer