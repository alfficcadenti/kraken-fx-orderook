import React, { useContext } from "react";
import {OrderBookContext} from "./OrderBookContext";
//import PropTypes from "prop-types";

const PriceInput = () => {
	const [state, setState] = useContext(OrderBookContext);
	const check = (e) => {
		var keyCode = e.keyCode ? e.keyCode : e.which;
		if (keyCode !== 110) {
			e.preventDefault();
		}
		if (keyCode > 47 && keyCode < 58) {
			e.preventDefault();
		}
	};
    
	const onHandleChange = (e) => {
		e.preventDefault();
		const newPrice = Number(e.target.value) || 0;
		setState((state) => ({ ...state, inputPrice: newPrice }));
	};

	return (
		<div className="price-input-container floating">
			<label 
				htmlFor="input" 
				className="floating__label">
                        Price
			</label>
			<input 
				className="price-input floating__input" 
				type="number" 
				value={state.inputPrice || 0}
				onChange = {onHandleChange}
				onKeyUp={check}
			/>
		</div>
	);
};

// PriceInput.propTypes = {
// 	price: PropTypes.number,
// };

export default PriceInput;