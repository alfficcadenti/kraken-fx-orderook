import React, { useContext, Fragment } from "react";
import PropTypes from "prop-types";
import { OrderBookContext } from "./OrderBookContext";
import OrderLevel from "./OrderLevel";
import {generateArrayToDisplay} from "../utils/utils";

const OrderBook = ({buy,sell}) => {
	// eslint-disable-next-line no-unused-vars
	const [state, setState] = useContext(OrderBookContext);

	const onPriceClick = (price) => setState(state => ({ ...state, inputPrice: price }));

	const orderRows = (arr, side) => {
		const depthLevel = state.depthLevel || 10;
		const formattedBook = generateArrayToDisplay(arr, side, depthLevel);
		return formattedBook.map((item, index) => (OrderLevel(item.price, item.qty, item.total, index, side, onPriceClick)));
	};

	const orderBookHead = (side) => (
		<thead>
			<tr>
				{side === "buy" ? 
					<Fragment><th>Total</th><th>Q.ty</th><th>Price</th></Fragment> :
					<Fragment><th>Price</th><th>Q.ty</th><th>Total</th></Fragment>
				}
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
