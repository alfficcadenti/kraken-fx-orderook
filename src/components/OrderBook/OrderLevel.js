import React, { Fragment } from "react";
import PropTypes from "prop-types"; 

const OrderLevel = (price, qty, total, idx, type, onPriceClick) => (
	<tr key={idx}>
		{type === "buy" ? (<Fragment><td>{total}</td><td>{qty}</td></Fragment>) : <td className="order-price sell" onClick={()=>onPriceClick(price)}>{price}</td>} 
		{type === "buy" ? <td className="order-price buy" onClick={()=>onPriceClick(price)}>{price}</td> : (<Fragment><td>{qty}</td><td>{total}</td></Fragment>)}
	</tr>
);

OrderLevel.propTypes = {
	price: PropTypes.number.isRequired,
	qty: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired,
	idx: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	type: PropTypes.string.isRequired,
	onPriceClick: PropTypes.func.isRequired,
};

export default OrderLevel;