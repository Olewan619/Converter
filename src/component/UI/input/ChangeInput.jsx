import React from "react";
import classes from './ChangeInput.module.css'
import PropTypes from 'prop-types'; 


function ChangeInput(props) {
    return (
      <div className={classes.group}>
        <input type="text" value={props.amount} onChange={e => props.onAmountChange(e.target.value)} />
        <select value={props.currency} onChange={e => props.onCurrencyChange(e.target.value)}>
          {props.currencies.map((currency => (
            <option  value={currency}>{currency}</option>
          )))}
        </select>
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