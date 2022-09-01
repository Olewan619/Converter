import React from "react";
import ChangeInput from './UI/input/ChangeInput';
import classes from './UI/input/ChangeInput.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';


const CurrencyForm = () => {


    const [amountFrom, setAmountFrom] = useState(0);
    const [amountTo, setAmountTo] = useState(0);
    const [currencyFrom, setCurrencyFrom] = useState('UAH');
    const [currencyTo, setCurrencyTo] = useState('USD');
    const [results, setResults] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
      axios.get('https://api.fastforex.io/fetch-all?api_key=0b9b2f7214-9f000df8be-rg3bl4')
        .then(response => {
          if(response  && error) {
              console.log('ERROR');
              setError();
          } 
          setResults(response.data.results);

        })
        .catch(error => {
            setError(error);
        });}
        , []);
  
    

    useEffect(() => {
      if (!!results) {
        handleAmountFromChange(1);
      }
    }, [results]);
  
    const format = (number) => {
      return number.toFixed(4)
    }
  
    const handleAmountFromChange = (amountFrom) => {
      setAmountTo(format(amountFrom * results[currencyTo] / results[currencyFrom]));
      setAmountFrom(amountFrom);
    }
  
    const handleCurrencyFromChange = (currencyFrom) => {
      setAmountTo(format(amountFrom * results[currencyTo] / results[currencyFrom]));
      setCurrencyFrom(currencyFrom);
      
    }
  
    const handleAmountToChange = (amountTo) => {
      setAmountFrom(format(amountTo * results[currencyFrom] / results[currencyTo]));
      setAmountTo(amountTo);
    }
       
    const handleCurrencyToChange = (currencyTo) => {
      setAmountFrom(format(amountTo * results[currencyFrom] / results[currencyTo]));
      setCurrencyTo(currencyTo);
      
    }

    return(
        <div>
            {error 
                ?
                <p className={classes.errp}>ERROR</p>
                :
                <div>
                    <h1>Currency Converter</h1>
                    <ChangeInput
                    onCurrencyChange={handleCurrencyFromChange}
                    onAmountChange={handleAmountFromChange}
                    currencies={Object.keys(results)}
                    amount={amountFrom}
                    currency={currencyFrom} />
                    <ChangeInput
                    onCurrencyChange={handleCurrencyToChange}
                    onAmountChange={handleAmountToChange}
                    currencies={Object.keys(results)}
                    amount={amountTo}
                    currency={currencyTo} />
                </div>
              
            }
        </div>
    );
};

export default CurrencyForm;