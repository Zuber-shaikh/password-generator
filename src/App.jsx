import { useEffect, useState } from "react";

function App() {
  const [numAllowed, setNumAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");

  function createPassword() {
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
  }

  useEffect(() => {
    createPassword();
  }, [length, numAllowed, specialCharAllowed, setPassword])

  return (
    <div className="w-full h-screen bg-black">
      <div>
        <div className="flex justify-center">
          <h1 className="bg-white px-5 py-5 my-10 rounded-xl">
            Password Generator
          </h1>
        </div>

        <div className="flex justify-center bg-slate-400">
          <div className=" my-5 px-5 py-5 ">
            <input
              value={password}
              readOnly
            ></input>
          </div>
          <div>  
            <input
            type="checkbox"
            defaultChecked={numAllowed}
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
            >

            </input>
            <input 
            type="checkbox"
            onChange={() => {
              setSpecialCharAllowed((prev) => !prev);
            }}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
