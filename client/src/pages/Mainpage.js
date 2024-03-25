import React,{useEffect, useState}from 'react'
import axios from "axios";

export default function Mainpage() {

//state default the form feilds

const[date,setDate]=useState(null);
const[sourceCurrency,setSourceCurrency]=useState("");
const[targetCurrency,setTargetCurrency]=useState("");
const[amount,setAmount]=useState(0);
const[targetamount,setTargetamount]=useState(0);
const[currencyNames,setCurrencyNames]=useState([]);

const [sourceCurrencyName, setsourceCurrencyName] = useState("");
const [targetCurrencyName, settargetCurrencyName] = useState("");

const [pressed, setPressed] = useState(false);






//handle submit
const handleSubmit= async (e)=>{
  e.preventDefault();
  setPressed(true);
  
  try{
      const responce =await axios.get("http://localhost:5004/convert",{
        params:{
          date,
          sourceCurrency,
          targetCurrency,
          amount,
        },
    });

//TODO set
setTargetamount(responce.data);

console.log(amount,targetamount);
  }catch(err){
    console.error(err);
  }
  
};

//get currency

useEffect(()=>{
const getCurrencyNames=async() =>{
  try{

    const responce= await axios.get("http://localhost:5004/getAllCurrencies");
    setCurrencyNames(responce.data);


  }catch(err){
    console.error(err);
  }
};
 getCurrencyNames();
}, [])



  return (
    <div>
      <h1 className="lg:mx-32"> Unity Exchange </h1>
      <p  className="lg:mx-32 opacity-40 py-4">"Welcome to our user-friendly currency converter, your go-to tool for seamless
         and accurate currency conversions. Whether you're a globetrotter or a savvy investor,
          our website ensures quick and reliable exchange rate information, making financial transactions 
          hassle-free. Stay updated with real-time rates and convert currencies effortlessly, enhancing your
           online experience with convenience at your fingertips."</p>

        <div className="mt-5 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                <label htmlFor={date} className="block mb-2 text-sm font-medium text-orange-700">Date</label>
                <input onChange={(e)=>setDate(e.target.value)} type="Date" id={date} name={date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"  required/>
                </div>
            
            <div className="mb-4">
                <label htmlFor={sourceCurrency} className="block mb-2 text-sm font-medium text-orange-700">Source currency</label> 
                <select onChange={(e)=>setSourceCurrency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" name={sourceCurrency} id={sourceCurrency} value={sourceCurrency}>
                    <option value="">Select Currency</option>
                    {Object.keys(currencyNames).map((currency)=>(
                      <option className="p-1" key={currency} value={currency}>
                        {currencyNames[currency]}
                      </option>
                    ))}
                </select>
             </div>

            <div className="mb-4">
                <label htmlFor={targetCurrency} className="block mb-2 text-sm font-medium text-orange-700 ">Target currency</label> 
                <select onChange={(e)=>setTargetCurrency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" name={targetCurrency} id={targetCurrency} value={targetCurrency}>
                    <option value="" >Select Currency</option>
                    {Object.keys(currencyNames).map((currency) => (
                  <option className=" p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
                  
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor={amount} className="block mb-2 text-sm font-medium text-orange-700">Amount in source currency</label>
                <input onChange={(e)=>setAmount(e.target.value)}type="number" id={amount} name={amount} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Amount in source currency" required/>
                </div>
                
                <div className="mb-4 flex items-center justify-center ">
                <button id="cal"  className="animated-button bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out">
                <span>C O N V E R T</span>
                <span></span>
                <p id="result"></p>
                </button>
                </div>

            </form>
        </section>
        </div>
        
        <div className="flex items-center justify-center">
           
        {pressed && (
    <p className="text-amber-600 text-xl">
      {amount} {sourceCurrency} is equal to  
      <span className="bg-white text-sky-900 font-bold rounded-full p-0.5 ml-1.2 mr-1.2 ">{4390.49}</span> 
      {}{targetCurrency}
    </p>
  )}
        </div>

        </div>



        
    
  )
}

