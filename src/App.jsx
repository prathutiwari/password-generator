import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // use ref hook
  const passwordRef = useRef(null);

  const pwdgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += `!@#$%&(){}[]?><`;
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPwdToClipBoard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }, [password])

  useEffect(() => {
    pwdgenerator();
  }, [length, numberAllowed, charAllowed, pwdgenerator])


  return (
    <div className='min-w-xl'>
      <h1 className='text-5xl text-center font-bold text-white mb-7'>Password Generator</h1>
      <div className='w-full mx-auto shadow-md rounded-lg px-8 py-10 bg-blue-200 text-center '>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text' value={password} className='outline-none w-full py-1 px-3 bg-white text-gray-600' placeholder='Password' ref={passwordRef} readOnly />
          <button className='outline-none bg-blue-500 text-white px-3 py-1 shrink-0 cursor-pointer hover:bg-blue-800' onClick={copyPwdToClipBoard}>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2 justify-between items-baseline">
          <div className="flex flex-col items-baseline gap-x-1">
            <input type='range' min={6} max={50} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
            <label className='text-gray-700 text-[18px] font-medium'>Length: {length}</label>
          </div>
          <div className="flex items-baseline flex-col gap-x-1">
            <div className='mb-2'>
              <input type='checkbox' defaultChecked={numberAllowed} id='numberInput' onChange={() => { setNumberAllowed((prev) => !prev) }} />
              <label className='text-gray-700 text-[18px] font-medium ml-2' htmlFor='numberInput'>Numbers</label>
            </div>
            <div>
              <input type='checkbox' defaultChecked={charAllowed} id='charInput' onChange={() => { setCharAllowed((prev) => !prev) }} />
              <label className='text-gray-700 text-[18px] font-medium ml-2' htmlFor='charInput'>Characters</label>
            </div>
          </div>
        </div>
      </div>
      <p className='mt-3 text-white text-xl'> Your Generated Password is <b>{password}</b></p>
    </div>
  )
}

export default App
