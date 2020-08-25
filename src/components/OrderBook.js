import React, { useState } from "react";
import PriceInput from "./PriceInput";
import PropTypes from "prop-types";

const OrderBook = ({buy,sell}) => {
	const [price, setPrice] = useState(0);

	const orderRows = (arr, side) => {
		if(side === "sell") {
			return arr && arr
				.sort((a, b) => (a.price - b.price))
				.map((item, index) => (order(item, index, side)));
		} else if (side === "buy") {
			return arr && arr
				.sort((a, b) => (b.price - a.price))
				.map((item, index) => (order(item, index, side)));
		}
	};
		

	const order = (order,idx, side) => (
		<tr key={idx}>
			<td> {side === "sell" ? order.price : order.qty} </td>
			<td> {side === "sell" ? order.qty  : order.price} </td>
		</tr>);

	const orderHead = (side) => (
		<thead>
			<tr>
				<th colSpan="2">{side}</th>
			</tr>
			<tr>
				<th>{side === "buy" ? "Q.ty (XBT)" : "Price (USD)"}</th>
				<th>{side === "buy" ? "Price (USD)" : "Q.ty (XBT)"}</th>
			</tr>
		</thead>
	);
 
	return (
		<div className="order-book">
			<PriceInput value={price} onclick={setPrice}/>
			<div className="order-container">
				<table>
					{orderHead("buy")}
					<tbody>{buy.length ? orderRows(buy, "buy") : ""}</tbody>
				</table>

				<table>
					{orderHead("sell")}
					<tbody>{sell.length ? orderRows(sell, "sell") : ""}</tbody>
				</table>
			</div>
		</div>
	);
};

OrderBook.propTypes = {
	buy: PropTypes.array,
	sell: PropTypes.array,
};

export default OrderBook;
