import React from "react";
import Choices from "./Choices"

const QuestionAnswer = () => {

    const [apiData, setApiData] = React.useState([])
    const [answers, setAnswers] = React.useState([])

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
    },[])

    const getAnswers = (newAns, index) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers]
            updatedAnswers[index] = newAns
            return updatedAnswers
        })
    }

    const quizData = apiData.map((item,index) =>{
        const cur = `cur_ans${index}`
        return (
            <div className="mx-12 mt-4" key={index}>
                <p className="quiz--question">{index + 1}. {item.question}</p>
                    <Choices choices={item.choices} id={index} 
                    passAns={(newAns) => getAnswers(newAns,index)} />
                <hr className="mt-2 mx-auto border-t-2"/>
            </div>
        )
    })

    return(
        <form className="quiz pt-8">
            {quizData}
        </form>
    )
}

/* <div className="question--ans__container 
                    flex
                    mt-2
                    flex-wrap
                ">
                    <input 
                        id={`choice${item.choices[0]}`}
                        type="radio"
                        value={item.choices[0]}
                        name={`choice${index}`}                  
                    /><label className="px-4 py-0.5 mb-2 mr-4 whitespace-nowrap"  
                    htmlFor={`choice${item.choices[0]}`}>{item.choices[0]}</label>
                    <input 
                        id={`choice${item.choices[1]}`}
                        type="radio"
                        value={item.choices[1]}
                        name={`choice${index}`}
                    /><label className="px-4 py-0.5 mb-2 mr-4 whitespace-nowrap"  
                    htmlFor={`choice${item.choices[1]}`}>{item.choices[1]}</label>
                    <input 
                        id={`choice${item.choices[2]}`}
                        type="radio"
                        value={item.choices[2]}
                        name={`choice${index}`}
                    /><label className="px-4 py-0.5 mb-2 mr-4 whitespace-nowrap"  
                    htmlFor={`choice${item.choices[2]}`}>{item.choices[2]}</label>
                    <input 
                        id={`choice${item.choices[3]}`}
                        type="radio"
                        value={item.choices[3]}
                        name={`choice${index}`}
                    /><label className="px-4 py-0.5 mb-2 mr-4 whitespace-nowrap"  
                    htmlFor={`choice${item.choices[3]}`}>{item.choices[3]}</label>
           </div> */

// const quizData = apiData.map((item, index) =>{

//     const shuffledData = [...item.choices]; // Create a copy of the original array
//     for (let i = shuffledData.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
//     }
//     return (
//         <li className="mx-12 mt-4" key={index}>
//             <p className="quiz--question">{index+1}. {item.question}</p>
//             <ul className="question--ans__container 
//                 flex
//                 mt-2
//                 flex-wrap
//             ">
                
//                 <li className="px-4 py-0.5 mb-2 mr-4 whitespace-nowrap" >{shuffledData[0]}</li>
//                 <li className="px-4 py-0.5 mb-2 mr-4 whitespace-nowrap" >{shuffledData[1]}</li>
//                 <li className="px-4 py-0.5 mb-2 mr-4 whitespace-nowrap" >{shuffledData[2]}</li>
//                 <li className="px-4 py-0.5 mb-2 mr-4 whitespace-nowrap" >{shuffledData[3]}</li>
//             </ul>
//             <hr className="mt-2 mx-auto border-t-2"/>
//         </li>
//     )
// })

// return(
//     <ul className="quiz pt-8">
//         {quizData}
//     </ul>
// )



export default QuestionAnswer