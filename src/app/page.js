"use client"
import { useState } from "react";
import { Rampart_One } from 'next/font/google'
 
const rampart = Rampart_One({
   subsets: ['latin'],
   weight: '400'
  })


export default function Home() {

  const [result, setResult] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [errorInput, setErrorInput] = useState(false);

  const handleClick = () => {
    
    if (!textInput || textInput.trim().length === 0){
      setErrorInput(true);
      return;
    }

    setErrorInput(false);
    // Fetch Data async await
    const getData = async () => {
      try {
        const res = await fetch('/api/find-anagrams', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({"sentence": textInput})
        })
  
        if(!res.ok){
          throw new Error(`Bad response! Can't fetch data`);
        }
        const data = await res.json();
        setResult(data);
        
      } catch (err) {
        console.error("ERROR: ", err)
      }

    }
    getData();
  }
  return (
    <div className={`flex transition justify-center min-h-screen p-8 ${result ? 'items-start' : 'items-center'}`}>
      {/* <main className="flex flex-col gap-[5px] row-start-2 items-start p-8"> */}
      <main className="flex flex-col  gap-[5px] items-center p-8 justify-start">
        <div className="text-center">
          <h1 
            onClick={() => {
              setResult(null);
              setTextInput('');
              setErrorInput(false);
            }}
            className={`text-black cursor-pointer text-[60px] leading-none mb-10 font-medium ${rampart.className}`}>
            Anagram Finder
          </h1>
          <p className="text-2xl font-light">Enter a sentence and check for anagrams.</p>
          
          <div className="mt-10 sm:flex sm:flex-row sm:gap-[20px] sm:mt-8 mb-2">
            <div className="relative">
              {errorInput ? (
              <p className="absolute top-[-20px] w-full text-right text-xs text-red-500">Text is required</p>
            ) : ''}
              <input 
                aria-label="Enter a sentence to check for anagrams"
                onChange={(e) => {
                  setTextInput(e.target.value);
                  if(e.target.value !== "") setErrorInput(false);
                }}
                value={textInput}
                placeholder="Type sentence here"
                className={`w-full bg-gray-200 p-5 rounded-lg sm:w-sm border-gray-200 border-3 ${errorInput ? 'border-red-400' : ''}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleClick();
                  }
                }}
              ></input>
              <p 
                className="absolute top-[105%] sm:bottom-[-20px] text-left text-xs italic ms-0 text-gray-500">Example: She taps past the stop to spot the tops.</p>
            </div>
            

            <button
              className={`mt-8 sm:mt-0 py-4 px-8 font-medium bg-purple-500 rounded-lg cursor-pointer transition duration-100 text-white hover:bg-purple-400  active:scale-105 active:bg-lime-500 `}
              onClick={handleClick}
            >Find Anagrams</button>
          </div>

          
            
          
          

        </div>
       
          
          {result && (
             <div className="w-full mt-20">
            <div className="text-lg text-left">
              
              
              
              {result.anagrams && result.anagrams.length > 0 ? (
                <><p className="text-2xl text-slate-800 font-semibold">Anagrams Found! 🎉</p> 
                  {/* <p className="mb-10 text-[14px]">Unique Word Count: {result.uniqueWords.length}</p>   */}
                  <ul className="text-md font-light text-left">
                    {result.anagrams.map((word,i) => (
                      <li key={i} className="
                        my-4
                        bg-emerald-50
                        rounded-xl
                        p-8
                      ">{word.map((w, i) => {
                        if (i === 0) return <strong key={i}>{w} </strong>;
                        return w + " ";
                      }
                        )}</li> 
                    ))}
                  </ul>
                </>
              ) : <div>
                    <p className="mb-10 text-2xl font-light">No anagrams found 🫥</p>

                    <div className="bg-violet-100 rounded-xl p-7 text-left  text-sm">
                      <p className="font-light text-black font-semibold text-lg">What&#39;s an anagram, anyway?</p>
                      <p className="text-md">An anagram is a word formed by rearranging the letters of another.</p>

                      <p className="mt-6"><span className="font-bold">EXAMPLES</span></p>
                      <p>despair diapers praised</p>
                      <p>elints enlist inlets silent tinsel</p>
                    </div>
                  </div>
              }
            </div>
            </div>
          )}
        



        
      </main>
    </div>
  );
}
