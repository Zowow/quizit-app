import React from "react";
import logo from "./svg/quizit_logo.svg"
import QuestionAnswer from "./components/QuestionAnswer"

function App() {

  const [start, setStart] = React.useState(false)

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
      </div>
    )
  }
  
}

export default App;
