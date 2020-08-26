import React, { useContext } from "react";
import {OrderBookContext} from "../OrderBook/OrderBookContext";

const PriceInput = () => {
	const [state, setState] = useContext(OrderBookContext);
	const check = (e) => {
		const keyCode = e.keyCode ? e.keyCode : e.which;
		if (keyCode !== 110) {
			e.preventDefault();
		}
		if (keyCode > 47 && keyCode < 58) {
			e.preventDefault();
		}
	};
    
	const onHandleChange = (e) => {
		e.preventDefault();
		const newPrice = Number(e.target.value) || "";
		setState((state) => ({ ...state, inputPrice: newPrice }));
	};

	return (
		<div className="price-input-container floating">
			<input 
				className="price-input floating__input" 
				type="number" 
				value={Number(state.inputPrice) || ""}
				onChange = {onHandleChange}
				onKeyUp={check}
				placeholder={"Price"}
			/>
		</div>
	);
};

export default PriceInput;