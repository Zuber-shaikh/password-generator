import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [numAllowed, setNumAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");

  // useRef hook to have link between copy button and inputText
  // whenever we click on copy button it would highlight the text
  const passwordRef = useRef(null);

  const createPassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let newPassword = "";

    if (numAllowed) {
      str += "0123456789";
    }
    if (specialCharAllowed) {
      str += "@#${}()*&^";
    }

    for (let index = 1; index <= length; index++) {
      const random = Math.floor(Math.random() * str.length);
      newPassword += str.charAt(random);
    }
    setPassword(newPassword);
  }, [length, numAllowed, specialCharAllowed, setPassword]);

  const copyPasswordToClipboar = useCallback(() => {
    passwordRef.current?.select(); // will highlight the complete text when we click on copy button
    passwordRef.current?.setSelectionRange(0, 4);
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    createPassword();
  }, [length, numAllowed, specialCharAllowed, createPassword]);

  return (
    // <div className="flex justify-center ">
    <div className="self-center w-full max-w-lg mx-auto my-8 px-4 py-3 bg-white text-orange-500 rounded-lg shadow-md">
      <h1 className="text-slate-700 text-center text-2xl my-3">
        Password Generator
      </h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />

        <button
          onClick={copyPasswordToClipboar}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            className="cursor-pointer"
            type="range"
            min={8}
            max={50}
            value={length}
            onChange={(event) => {
              setLength(event.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={specialCharAllowed}
            id="specialChar"
            onChange={() => {
              setSpecialCharAllowed((prev) => !prev);
            }}
          />
          <label>Special Characters</label>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default App;
