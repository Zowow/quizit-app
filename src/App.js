import React from "react";
import logo from "./svg/quizit_logo.svg"
import QuestionAnswer from "./components/QuestionAnswer"

function App() {

  const [start, setStart] = React.useState(true)
  const [done, setDone] = React.useState(true)
  const clickStart = () => {
    setStart(true)
  }

  if(start === false){
    return (
      <div className='App 
        mx-auto 
        flex 
        flex-col 
        justify-around 
        items-center
        py-48
      '>
        <img src={logo} alt="logo"/>
        <button onClick={clickStart} className="app__start px-4 py-2">Start Quiz Now</button>
      </div>
  );
  }else{
    return(
      <div className="App--run
        mx-auto
      ">
        <QuestionAnswer />
        {done && <p className="mx-auto mt-4 w-3/6">You scored 3/5 correct answers</p> }
        {done && <button className="block mx-auto mt-2 mb-12 px-4 py-2">Play Again</button>}
      </div>
    )
  }
  
}

export default App;
