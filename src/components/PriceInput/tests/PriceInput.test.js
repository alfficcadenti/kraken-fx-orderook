import React from "react";
import {shallow} from "enzyme";
import PriceInput from "../PriceInput";
import { OrderBookProvider } from "../../OrderBook/OrderBookContext";
import renderer from "react-test-renderer";

describe("<PriceInput>", () => {
	test("renders PriceInput without crashing", () => {
		jest.spyOn(React, "useContext").mockImplementation((context) => "context_value" );
		shallow(<OrderBookProvider><PriceInput/></OrderBookProvider>);
	});
	
	it("matches the snapshot", () => {
		const tree = renderer
			.create(<PriceInput />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
	
	it("should have an input field", () => {
		const wrapper = shallow(<PriceInput/>);
		expect(wrapper.find("input").length).toEqual(1);
	});
	
	it("should have proper props for input field", () => {
		const wrapper = shallow(<PriceInput/>);
		expect(wrapper.find("input").props()).toEqual({
			className: "price-input floating__input",
			onChange: expect.any(Function),
			onKeyUp: expect.any(Function),
			type: "number",
			value: "",
		});
	});
});