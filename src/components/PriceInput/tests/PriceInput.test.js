import React from "react";
import {shallow} from "enzyme";
import {PriceInput} from "../PriceInput";
import { OrderBookProvider } from "../../OrderBook/OrderBookContext";

test("renders OrderBook without crashing", () => {
	jest.spyOn(React, "useContext").mockImplementation((context) => "context_value" );
	shallow(<OrderBookProvider><PriceInput/></OrderBookProvider>);
});