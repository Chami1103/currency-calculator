const express =require("express");
const cors = require("cors");
const axios=require("axios");

const app =express();

//middleware 

app.use(express.json());
app.use(cors());

app.get("/getAllCurrencies",async(req,res)=>{

const nameURL="https://openexchangerates.org/api/currencies.json?app_id=63be8b353dab4297a91c8bdcf3541bb3";


try {

const nameResponce=await axios.get(nameURL);
const nameData =nameResponce.data;

return res.json(nameData);

} catch (err) {
    console.error(err);
    
}
});

//target amount

app.get("/convert",async (req,res)=>{
    const{date,sourceCurrency,targetCurrency,amount} = req.query;


    

    try{
     
        const dataUrl='https://openexchangerates.org/api/historical/${date}.json?app_id=63be8b353dab4297a91c8bdcf3541bb3'
        const dataResponce = await axios.get(dataUrl);
        const data =dataResponce.data;

        const rates = data.rates;
        
        const sourceCurrencyName=data[sourceCurrency];
        const targetCurrencyName=data[targetCurrency];

  
//rates

      const sourceRate =rates[sourceCurrency];
      const targetRate =rates[targetCurrency];

      //final target 

      const targetValue=(targetRate / sourceRate) * amount;

      return res.json(targetValue,sourceCurrencyName,targetCurrencyName);

 }catch(error){
        console.error(error);
}
});

  


//listen to a part
app.listen(5004 ,()=>{
    console.log("server started");
});