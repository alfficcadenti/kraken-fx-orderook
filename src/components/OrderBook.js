/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect } from "react";

const OrderBook = () => {
	const [buy, setBuy] = useState([]);
	const [sell, setSell] = useState([]);

	const updatedOrderBook = (newOrderPrice, newOrderQuantity, book) => {
		const idx = book.findIndex(x=>x.price === newOrderPrice);
		if(idx === -1 &&  newOrderQuantity !== 0) {
			return ([...book,{price: newOrderPrice, qty: newOrderQuantity}]);
		} else {
			newOrderQuantity !== 0 ? 
				book[idx] = {price: newOrderPrice, qty: newOrderQuantity} : 
				book.splice(idx, 1);
			return book;
		}
	};

	useEffect(() => {
		const subscribe = {
			event: "subscribe",
			feed: "book",
			product_ids: ["PI_XBTUSD"]
		};
		const ws = new WebSocket("wss://futures.kraken.com/ws/v1");
		ws.onopen = () => {
			ws.send(JSON.stringify(subscribe));
		};
		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			if (data && data.feed === "book") {
				if (data.side === "buy") {
					const newBuyBook = updatedOrderBook(data.price, data.qty, buy);
					setBuy(newBuyBook);
				} else if (data.side === "sell") {
					const newSellBook = updatedOrderBook(data.price, data.qty, sell);
					setSell(newSellBook);
				}
			}
		};
		ws.onclose = () => {
			ws.close();
		};

		return () => {
			ws.close();
		};
	}, [buy,sell]);

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
			<div className="order-container">
				<table>
					{orderHead("buy")}
					<tbody>{orderRows(buy, "buy")}</tbody>
				</table>

				<table>
					{orderHead("sell")}
					<tbody>{orderRows(sell, "sell")}</tbody>
				</table>
			</div>
		</div>
	);
};

export default OrderBook;
