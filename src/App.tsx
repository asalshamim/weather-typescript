import { ChangeEvent, useState } from "react";

import { optionType } from "./types";

const App = (): JSX.Element => {
  const [term, setTerm] = useState<string>('');
  const[options, seOptions] = useState<[]>([])

  const getSearchOption = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => res.json())
      .then((data) => seOptions(data))
  
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value  = e.target.value.trim()
    setTerm(value)
    console.log(term)

    if(value === '')return

    getSearchOption(value)


  }

  const onOptionSelect = (option: optionType) => {
    console.log(option.name)
    
  }

  // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-500 via-rose-200 to-green-200 h-[100vh] w-full">

      <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg roun drop-shadow-lg text-zinc-700">

        <h1 className="text-4xl font-thin">
          
          Weather <span className="font-black"> Forecast</span>
        </h1>
        <p className=" mt-3 text-sm">
          Enter below a place you want to know the weather of and select an option from the dropdown
        </p>

        <div className=" relative flex mt-10 md:mt-4">
          
          
        <input
          type="text"
          value={term}
            className="px-2 py-1 rounded-1-md border-2 border-white"
            onChange={onInputChange}
          />
          
          <ul className="absolute top-9 bg-white ml-1 rounded-b-md">

           {options.map((option: optionType, index : number) => (
             <li key={option.name + '-' + index}>
               <button className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                 onClick={() => onOptionSelect(option)}>
                 {option.name}
               </button>
              </li>
           ))}
             </ul>

        <button className="rounded-r-md border-2 border-zinc-500 hover:border-zinc-500 text-zinc-700 hover:text-zinc-500 px-2 py-1 cursor-pointer">
          Search
          </button>
          </div>
      </section>
    </main>
  )
}

export default App
