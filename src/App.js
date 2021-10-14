import { useEffect, useState } from 'react';
import './App.css';
import Statistic from './components/statistic/Statistic';
import TextWidget from './components/textWidget/TextWidget';



function App() {

  const [data, setData] = useState(' ')
  const [input, setInput] = useState('')
  const [errors, setErrors] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [isBackspace, setIsBackspace] = useState(false)

  const [started, setStarted] = useState(false)
  const [finshed, setFinshed] = useState(false)
  
  // get random paragraph (1: number of paragraphs, 4: number of sentence in each paragraph)
  useEffect(() => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            setData(this.responseText)
        }
    };
    xhttp.open("GET", "http://metaphorpsum.com/paragraphs/1/4", true);
    xhttp.send();
  }, [])

  // count errors and detect if user start typing and finshed
  useEffect(() => {
    console.log(correct);
    let i = input.length - 1;
    if(input[i] !== data[i] && !isBackspace) {
      setErrors(errors + 1)
    } else if (!isBackspace) {
      let t = data.trim()
      let result = input.trim().split('').filter((c, i) => c === t[i]).length
      setCorrect(result)
    }
    setIsBackspace(false)

    if(input.length > 0) {
      setStarted(true)
    }

    if(input === data) {
      setFinshed(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input])

  function handleClick(e) {
    if (e.which === 8) {
      setIsBackspace(true)
    }
  }


  return (
    <div className="App">
      <div className="container">
        <TextWidget data={data} input={input} setErrors={setErrors} errors={errors} />
        <textarea
          className='userInput'
          value={input}
          onKeyDown={handleClick}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type Here...'
          autoFocus
          readOnly={finshed}
        ></textarea>
        <Statistic isStarted={started} isFinshed={finshed} errors={errors} correct={correct} />
      </div>
    </div>
  );
}

export default App;
