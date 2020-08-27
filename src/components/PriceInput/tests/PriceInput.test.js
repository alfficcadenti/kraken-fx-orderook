import React from "react";
import {shallow} from "enzyme";
import PriceInput from "../PriceInput";
import { OrderBookProvider } from "../../OrderBook/OrderBookContext";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";

describe("<PriceInput>", () => {
	test("renders PriceInput without crashing", () => {
		// eslint-disable-next-line no-unused-vars
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

	it("it display the label Price", () => {
		render(<PriceInput />);
		expect(
			screen.getByText(/Price/i)
		).toBeInTheDocument();
	});
	
	it("should have proper props for input field", () => {
		const wrapper = shallow(<PriceInput/>);
		expect(wrapper.find("input").props()).toEqual({
			id: "price-input",
			className: "price-input floating__input",
			onChange: expect.any(Function),
			onKeyUp: expect.any(Function),
			type: "number",
			value: "",
		});
	});
});