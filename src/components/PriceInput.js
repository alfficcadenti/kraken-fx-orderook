import React, {useState} from "react";
import PropTypes from "prop-types";

const PriceInput = ({price}) => {
	const [value, setValue] = useState(price);
    
	const check = (e) => {
		var keyCode = e.keyCode ? e.keyCode : e.which;
		if (keyCode === 110 && price) {
			e.preventDefault();
		}
		if (keyCode > 47 && keyCode < 58) {
			e.preventDefault();
		}
	};
    
	const onHandleChange = (e) => {
		e.preventDefault();
		console.log("test", e.target.value);
		if (!e.target.value) {
			setValue(0);
			return;
		}
		if (!Number(e.target.value)) {
			if(!e.target.value) {
				setValue(0);
			}
			return;
		}
		setValue(e.target.value);
	};

	return (
		<div className="price-input">
			<label 
				htmlFor="input" 
				className="price-input-label">
                        Price
			</label>
			<input 
				className="price-input" 
				type="number" 
				value={value}
				onChange = {onHandleChange}
				onKeyUp={check}
			/>
		</div>
	);
};

PriceInput.propTypes = {
	price: PropTypes.oneOfType([PropTypes.number]),
};

export default PriceInput;
