import React from "react";
import {shallow} from "enzyme";
import {DepthLevel} from "../DepthLevel";
import { OrderBookProvider } from "../../OrderBook/OrderBookContext";

test("renders DepthLevel without crashing", () => {
	jest.spyOn(React, "useContext").mockImplementation((context) => "context_value" );
	shallow(<OrderBookProvider><DepthLevel/></OrderBookProvider>);
});