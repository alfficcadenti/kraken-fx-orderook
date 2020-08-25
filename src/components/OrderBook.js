/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect } from "react";

const OrderBook = () => {
	const [buy, setBuy] = useState([]);
	const [sell, setSell] = useState([]);

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
			if (data && data.feed) {
				if (data.side === "buy") {
					const idx = buy.findIndex(x=>x.price === data.price);
					if(idx === -1) {
						setBuy([...buy,{price: data.price, qty: data.qty}]);
					} else {
						const newBuy = buy;
						data.qty ? 
							newBuy[idx] = {price: data.price, qty: data.qty} : 
							newBuy.splice(idx, 1);
						newBuy[idx] = {price: data.price, qty: data.qty};
						setBuy(newBuy);
					}

					

				} else if (data.side === "sell") {
					const idx = sell.findIndex(x=>x.price === data.price);
					if(idx === -1) {
						setSell([...sell,{price: data.price, qty: data.qty}]);
					} else {
						const newSell = sell;
						data.qty ? 
							newSell[idx] = {price: data.price, qty: data.qty} : 
							newSell.splice(idx, 1);
						setSell(newSell);
					}
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
				.map((item, index) => (item.qty ? order(item, index, side) : ""));
		} else if (side === "buy") {
			return arr && arr
				.sort((a, b) => (b.price - a.price))
				.map((item, index) => (item.qty ? order(item, index, side) : ""));
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
