import React from "react";
import {shallow} from "enzyme";
import DepthLevel from "../DepthLevel";
import { OrderBookProvider } from "../../OrderBook/OrderBookContext";
import renderer from "react-test-renderer";

describe("<DepthLevel>", () => {
	test("renders PriceInput without crashing", () => {
		// eslint-disable-next-line no-unused-vars
		jest.spyOn(React, "useContext").mockImplementation((context) => "context_value" );
		shallow(<OrderBookProvider><DepthLevel/></OrderBookProvider>);
	});
	
	it("matches the snapshot", () => {
		const tree = renderer
			.create(<DepthLevel />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
	
	it("should have a select field", () => {
		const wrapper = shallow(<DepthLevel/>);
		expect(wrapper.find("select").length).toEqual(1);
	});
	
	it("should have 1 classname depth-level-dropwdown", () => {
		const wrapper = shallow(<DepthLevel/>);
		expect(wrapper.find(".depth-level-dropwdown").length).toEqual(1);
	});
});