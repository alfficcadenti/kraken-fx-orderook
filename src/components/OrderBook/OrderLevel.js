import React from "react";
import PropTypes from "prop-types"; 

const OrderLevel = (price, qty, idx, type, onPriceClick) => (
	<tr key={idx}>
		{type === "buy" ? <td>{qty}</td> : <td className="order-price sell" onClick={()=>onPriceClick(price)}>{price}</td>} 
		{type === "buy" ? <td className="order-price buy" onClick={()=>onPriceClick(price)}>{price}</td> : <td>{qty}</td>}
	</tr>
);

OrderLevel.propTypes = {
	price: PropTypes.number.isRequired,
	qty: PropTypes.number.isRequired,
	idx: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	type: PropTypes.string.isRequired,
	onPriceClick: PropTypes.func.isRequired,
};

export default OrderLevel;