import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAmount } from "../store/reducers/RateReducer";
import { amountChanged } from "../store/actions/RateActions";
import { debounce } from "lodash";

export function AmountField () {
  const dispatch = useDispatch();
  const amount = useSelector(getAmount);
  const changeAmount = useCallback((newAmount) => dispatch(amountChanged(newAmount)), [dispatch]);
  const [displayAmount, setDisplayAmount] = useState(amount);
  
  const onAmountChanged = useMemo(() => debounce(changeAmount, 500), [changeAmount]);
  function onChange(e) {
    const newAmount = e.target.value;
    setDisplayAmount(newAmount);
    onAmountChanged(newAmount);
  }
  
  return (
    <form className="ExchangeRate-form">
      <input type="text" value={displayAmount} onChange={onChange} />
    </form>
  );
}
