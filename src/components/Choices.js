import React from "react"

const Choices = (props) => {

    const [choices, setChoices] = React.useState(props.choices)
    const [ans, setAns] = React.useState([])

    React.useEffect(() => {
        setChoices(prevData => [...prevData].sort(() => Math.random() - 0.5))
    },[])


    const handleAnswer = (event) => {
        const {value} = event.target
        setAns({answer: value})
        props.passAns(value);
    }

    const mapChoices = choices.map((item, index) => {
        return (
            <div key={index}> 
                <input 
                type="radio" 
                id={`choice-${props.id}_${index}`}
                name={`choice-${props.id}`}
                value={item}
                checked={ans.answer === item}
                onChange={handleAnswer}
                disabled={props.disable}
                />
                <label className="px-4 py-0.5 mb-2 mr-4 whitespace-nowrap"  
                htmlFor={`choice-${props.id}_${index}`}>{item}</label>
            </div>
        )
    })

    return(

        <div className="question--ans__container flex mt-2 flex-wrap">
                 {mapChoices}   
           </div>
    )
}

export default Choices