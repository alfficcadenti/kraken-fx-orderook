import React, { Fragment } from "react";
import PropTypes from "prop-types"; 

const quantityTDs = (total,qty) => <Fragment><td>{total}</td><td>{qty}</td></Fragment>;
const priceTD = (price, type, onPriceClick) => <td className={`order-price ${type}`} onClick={()=>onPriceClick(price)}>{price}</td>;

const OrderLevel = (price, qty, total, idx, type, onPriceClick) => (
	<tr key={idx}>
		{type === "buy" ? quantityTDs(total, qty) : priceTD(price, type, onPriceClick)} 
		{type === "buy" ? priceTD(price, type, onPriceClick) : quantityTDs(total, qty)}
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