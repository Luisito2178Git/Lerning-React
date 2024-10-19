import { useRef, useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data.js'; 
import reactLogo from '../../images/image.png';
import bajaLogo from '../../images/image2.jpg';
import tabienLogo from '../../images/image3.png';
import patLogo from '../../images/image4.png';
import chipiLogo from '../../images/chipi.gif';

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [userAnswers, setUserAnswers] = useState([]);


  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);
  let Option5 = useRef(null);

  let option_array = [Option1,Option2,Option3,Option4,Option5];

  const checkAns = (e, ans) =>{
    if (lock === false) {
      if(question.ans===ans){
        // e.target.classList.add("correct");
        e.target.classList.add("ans");
        setLock(true);
        setScore(prev=>prev+1);
      }
      else{
        // e.target.classList.add("wrong");
        e.target.classList.add("ans");
        setLock(true);
        // option_array[question.ans-1].current.classList.add("correct")
        // option_array[question.ans-1].current.classList.add("ans")
      }
      let updatedAnswers = [...userAnswers];
      updatedAnswers[index] = ans; // Guardar la respuesta seleccionada por el usuario para la pregunta actual
      setUserAnswers(updatedAnswers);  
    }
  }

  const next = () =>{ 
    if(lock === true){
      if(index === data.length-1){
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) =>{
        // option.current.classList.remove("wrong");
        // option.current.classList.remove("correct");
        option.current.classList.remove("ans");
        return null;
      })
    }
  }

  // const reset = () =>{
  //   setIndex(0);
  //   setQuestion(data[0]);
  //   setScore(0);
  //   setLock(false);
  //   setResult(false);
  // }

  return (
    <div className='container'>
      <h1>Friendship Quiz</h1>
      <hr />
      {result ? 
      <>
      <h2>{score} de {data.length}</h2>
      {/* <button onClick={reset}>Reset</button> */}
      {score === 3 || score === 2 || score === 1 ? 
      <><div className='container-img'>
        <img src={bajaLogo} alt="No Work" className='img'/>
      </div></> 
        : 
      ( score === 10 ? <> <div className='container-img'><img src={chipiLogo} alt="No Work" className='img'/></div></> :
        ( score === 4 || score === 5 || score === 6 ? <> <div className='container-img'><img src={tabienLogo} alt="No Work" className='img'/></div></>
            :
            ( score === 7 || score === 8 || score === 9 ? <> <div className='container-img'><img src={reactLogo} alt="No Work" className='img'/></div></>
                :
                ( score === 0 ? <> <div className='container-img'><img src={patLogo} alt="No Work" className='img'/></div></>
                  :
                  "nothing"
                )
              )
          )
      )
      }
       {/* Muestra todas las preguntas y opciones una vez terminado el quiz */}
       <div className="questions-summary">
          <h2>All Questions:</h2>
          <ul>
            {data.map((q, i) => (
              <li key={i}>
                <h3>{i + 1}. {q.question}</h3>
                <ul>
                  <li>{1 === q.ans & 1 === userAnswers[i] ? <p className='correct'>{q.option1} ✅ Respuesta Correcta!</p> 
                  : (1 === q.ans ? <p className='correct'> {q.option1} ☝️🤓Esta Era la respuesta correcta</p> 
                    : (1 === userAnswers[i] ? <p className='wrong'> {q.option1} ❌ Tu respuesta</p>: q.option1)) }
                  </li>
                  <li>{2 === q.ans & 2 === userAnswers[i] ? <p className='correct'>{q.option2} ✅ Respuesta Correcta!</p> 
                  : (2 === q.ans ? <p className='correct'> {q.option2} ☝️🤓 Esta Era la respuesta correcta</p> 
                    : (2 === userAnswers[i] ? <p className='wrong'> {q.option2} ❌ Tu respuesta</p>: q.option2)) }
                  </li>
                  <li>{3 === q.ans & 3 === userAnswers[i] ? <p className='correct'>{q.option3} ✅ Respuesta Correcta!</p> 
                  : (3 === q.ans ? <p className='correct'> {q.option3} ☝️🤓 Esta Era la respuesta correcta</p> 
                    : (3 === userAnswers[i] ? <p className='wrong'> {q.option3} ❌ Tu respuesta</p>: q.option3)) }
                  </li>
                  <li>{4 === q.ans & 4 === userAnswers[i] ? <p className='correct'>{q.option4} ✅ Respuesta Correcta!</p> 
                  : (4 === q.ans ? <p className='correct'> {q.option4} ☝️🤓 Esta Era la respuesta correcta</p> 
                    : (4 === userAnswers[i] ? <p className='wrong'> {q.option4} ❌ Tu respuesta</p>: q.option4)) }
                  </li>
                  <li>{5 === q.ans & 5 === userAnswers[i] ? <p className='correct'>{q.option5} ✅ Respuesta Correcta!</p> 
                  : (5 === q.ans ? <p className='correct'> {q.option5} ☝️🤓 Esta Era la respuesta correcta</p> 
                    : (5 === userAnswers[i] ? <p className='wrong'> {q.option5} ❌ Tu respuesta</p>: q.option5)) }
                  </li>
                </ul>
                
              </li>
            ))}
          </ul>
        </div>

      </> 
      : 
      <>
        <h2>{index+1}. {question.question}</h2>
      <p><b>Selecciona una opción (no podras cambiar la respuesta una vez seleccionada)</b></p>
      <ul>
        <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
        <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
        <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
        <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
        <li ref={Option5} onClick={(e)=>{checkAns(e,5)}}>{question.option5}</li>
      </ul>
      <button onClick={next} className='boton'>Siguiente</button>
      <div className='index'>{index+1} de {data.length} preguntas</div>
      </>
      }
      
    </div>
  )
}

export default Quiz