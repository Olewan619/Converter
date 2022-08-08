
import { useEffect, useState } from 'react';
import './App.css';
import ChangeInput from './component/UI/input/ChangeInput';
import axios from 'axios';
import PropTypes from 'prop-types'; 

function App() {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('EUR');
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('https://api.fastforex.io/fetch-all?api_key=0b9b2f7214-9f000df8be-rg3bl4')
      .then(response => {
        setResults(response.data.results);
      })
  }, []);

  useEffect(() => {
    if (!!results) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [results]);

  const format = (number) => {
    return number.toFixed(3)
  }

  const handleAmount1Change = (amount1) => {
    setAmount2(format(amount1 * results[currency2] / results[currency1]));
    setAmount1(amount1);
  }

  const handleCurrency1Change = (currency1) => {
    setAmount2(format(amount1 * results[currency2] / results[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format(amount2 * results[currency1] / results[currency2]));
    setAmount2(amount2);
  }
     
  function handleCurrency2Change(currency2) {
    setAmount1(format(amount2 * results[currency1] / results[currency2]));
    setCurrency2(currency2);
  }


  return (
    <div>
      <h1>Currency Converter</h1>
      <ChangeInput
        onCurrencyChange={handleCurrency1Change}
        onAmountChange={handleAmount1Change}
        currencies={Object.keys(results)}
        amount={amount1}
        currency={currency1} />
      <ChangeInput
        onCurrencyChange={handleCurrency2Change}
        onAmountChange={handleAmount2Change}
        currencies={Object.keys(results)}
        amount={amount2}
        currency={currency2} />
    </div>
  );

}

export default App;
