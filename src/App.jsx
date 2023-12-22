import { useState, useCallback, useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength]=useState(8)
  const[numberAllowed, setNumberAllowed]=useState(false)
  const[charAllowed, setCharAllowed]=useState(false)
  const[password, setPassword]=useState("")

  //UseRef Hook
  const passwordRef = useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str+="0123456789"
    }
    if(charAllowed){
      str+="[];:/??!@#$%"
    }
    for (let i = 0; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass = pass+str.charAt(char)
    }
    setPassword(pass)

  }, [length,numberAllowed,charAllowed,setPassword])

  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-grey-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <input type="text" 
        value={password} 
        className="outline-none w-full py-1 px-4" 
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button 
        onClick={copyToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}} />
          <label className='text-white'>Length = {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{
            setNumberAllowed((prev)=> !prev)
          }} />
          <label htmlFor="numberInput" className='text-white'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={charAllowed}
          id="charInput"
          onChange={()=>{
            setCharAllowed((prev)=> !prev)
          }} />
          <label htmlFor="charInput" className='text-white'>Characters</label>
        </div>
      </div>
    </>
  )
}

export default App
