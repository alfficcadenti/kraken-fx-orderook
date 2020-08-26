import React, { useContext } from "react";
import PropTypes from "prop-types";
import { OrderBookContext } from "./OrderBookContext";
import Order from "./Order";

const OrderBook = ({buy,sell}) => {
	// eslint-disable-next-line no-unused-vars
	const [state, setState] = useContext(OrderBookContext);

	const onPriceClick = (price) => setState(state => ({ ...state, inputPrice: price }));

	const orderRows = (arr, side) => {
		if(side === "sell") {
			return arr && arr.slice(0, 10)
				.sort((a, b) => (a.price - b.price))
				.map((item, index) => (Order(item.price, item.qty, index, side, onPriceClick)));
		} else if (side === "buy") {
			return arr && arr.slice(0, 10)
				.sort((a, b) => (b.price - a.price))
				.map((item, index) => (Order(item.price, item.qty, index, side, onPriceClick)));
		}
	};

	const orderBookHead = (side) => (
		<thead>
			<tr>
				<th>{side === "buy" ? "Total" : "Price"}</th>
				<th>{side === "buy" ? "Price" : "Total"}</th>
			</tr>
		</thead>
	);
 
	return (
		<div className="order-container">
			<table>
				{orderBookHead("buy")}
				<tbody>{buy.length ? orderRows(buy, "buy") : ""}</tbody>
			</table>

			<table>
				{orderBookHead("sell")}
				<tbody>{sell.length ? orderRows(sell, "sell") : ""}</tbody>
			</table>
		</div>
	);
};

OrderBook.propTypes = {
	buy: PropTypes.array,
	sell: PropTypes.array,
};

export default OrderBook;