import React, { Fragment,useState, useEffect, useRef} from "react";
import "./App.css";
import { OrderBookProvider } from "./components/OrderBook/OrderBookContext";
import OrderBook from "./components/OrderBook/OrderBook";
import PriceInput from "./components/PriceInput/PriceInput";
import DepthLevel from "./components/DepthLevel/DepthLevel";
import {updatedOrderBook} from "./components/utils/utils";

const App = () => {

	const ws = useRef(null);
	const [buy, setBuy] = useState([]);
	const [sell, setSell] = useState([]);
	const [interval, setInterval] = useState();

	useEffect(() => {
		const subscribe = {
			event: "subscribe",
			feed: "book",
			product_ids: ["PI_XBTUSD"]
		};
		ws.current = new WebSocket("wss://futures.kraken.com/ws/v1");
		ws.current.onopen = () => {
			console.log("ws opened");
			ws.current.send(JSON.stringify(subscribe));
		};
		ws.current.onclose = () => console.log("ws closed");

		return () => {
			ws.current.close();
		};
	}, [interval]);

	useEffect(() => {
		ws.current.onmessage = (event) => {
			const data = JSON.parse(event.data);
			if (data && data.feed === "book_snapshot") {
				data.bids && setBuy(data.bids);
				data.asks && setSell(data.asks);
			} else if (data && data.feed === "book") {
				if (data.side === "buy") {
					const newBuyBook = updatedOrderBook(data.price, data.qty, buy);
					setBuy(newBuyBook);
				} else if (data.side === "sell") {
					const newSellBook = updatedOrderBook(data.price, data.qty, sell);
					setSell(newSellBook);
				}
			}
		};
	});

	useEffect(() => {
		const timer = setTimeout(() => setInterval(Date.now()), 10000);
		return () => clearTimeout(timer);
	}, [interval]);

	return (
		<div className="app-container">
			<OrderBookProvider>
				{buy.length && sell.length ? 
					<Fragment>
						<div className="header-container">
							<PriceInput />
							<DepthLevel/>
						</div>
						<OrderBook buy={buy} sell={sell}/>
					</Fragment>: ""}
			</OrderBookProvider>
		</div>
	);
};

export default App;