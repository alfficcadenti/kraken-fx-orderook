import React, { Fragment } from "react";
import PropTypes from "prop-types"; 

const quantityTDs = (total,qty, type) => 
	type === "buy" ? 
		<Fragment><td>{total}</td><td>{qty}</td></Fragment> : 
		<Fragment><td>{qty}</td><td>{total}</td></Fragment>;

const priceTD = (price, type) => <td className={`order-price ${type}`}>{price}</td>;

const OrderLevel = (price, qty, total, idx, type, onPriceClick) => (
	<tr key={idx} onClick={()=>onPriceClick(price)}>
		{type === "buy" ? quantityTDs(total, qty, type) : priceTD(price, type, onPriceClick)} 
		{type === "buy" ? priceTD(price, type, onPriceClick) : quantityTDs(total, qty, type)}
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