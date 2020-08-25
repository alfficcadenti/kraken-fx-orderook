import React, {useState} from "react";
import PropTypes from "prop-types";

const PriceInput = ({price}) => {
	const [value, setValue] = useState(price);
    
	const onHandleChange = (e) => {
		console.log(e, e.target.value);
		let price = e.target.value;

		if (!Number(price)) {
			return;
		}
		setValue(value);
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
			/>
		</div>
	);
};

PriceInput.propTypes = {
	price: PropTypes.oneOfType([PropTypes.number]),
};

export default PriceInput;
