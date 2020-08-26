import React from "react";
import {shallow} from "enzyme";
import {OrderBook} from "../OrderBook";
import { OrderBookProvider } from "../OrderBookContext";
const buy = [{price:1, qty: 10}];
const sell = [{price:1, qty: 10}];
test("renders OrderBook without crashing", () => {
	jest.spyOn(React, "useContext").mockImplementation((context) => "context_value" );
	shallow(<OrderBookProvider><OrderBook buy={buy} sell={sell}/></OrderBookProvider>);
});