import React from "react";
import classes from './ChangeInput.module.css'
import PropTypes from 'prop-types'; 
import { useForm } from "react-hook-form";



const ChangeInput = ({amount, onAmountChange, currency, onCurrencyChange, currencies, }) => {

    const newCurrency = currencies.filter(i => i === 'USD' || i === 'EUR' || i === 'UAH');

    const {
      register,
      formState: {
          errors,
      },
      handleSubmit,
  
    } = useForm({
        mode:'onBlur'
    });

    return (
      <div className={classes.group}>
        <form>
          <input type="number" value={amount} 
           {...register("test", {
            onChange: e => onAmountChange(e.target.value),
            required: 'Введите число',
            min: {
              value: 0,
              message: 'Минимальное число ноль'
            }
          })}/> 
          <select value={currency} onChange={e => onCurrencyChange(e.target.value)}>
              
              {newCurrency.map((item => (
                <option  value={item}>{item}</option>
              )))}
    
        </select>
        <div>{errors?.test && <p style={{textShadow: '2px 2px 6px black', textAlign: 'center', color: 'red'}}> {errors?.test?.message} </p>}</div>
          </form>
      </div>
    );

  };

  ChangeInput.propTypes = {
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
  };




  export default ChangeInput;