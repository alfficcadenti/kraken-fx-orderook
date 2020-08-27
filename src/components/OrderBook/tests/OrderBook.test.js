import React from "react";
import {shallow} from "enzyme";
import OrderBook from "../OrderBook";
import { OrderBookProvider } from "../OrderBookContext";
import renderer from "react-test-renderer";

const buy = [{price:10, qty: 10}];
const buy2 = [{price:10, qty: 10},{price:1, qty: 12},{price:50, qty: 10}];
const sell = [{price:1, qty: 10}];


describe("<OrderBook>", () => {
	test("renders OrderBook without crashing", () => {
		// eslint-disable-next-line no-unused-vars
		jest.spyOn(React, "useContext").mockImplementation((_context) => "context_value" );
		shallow(<OrderBookProvider><OrderBook buy={buy} sell={sell}/></OrderBookProvider>);
	});
	
	it("matches the snapshot", () => {
		const tree = renderer
			.create(<OrderBook buy={buy} sell={sell}/>)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("should display total quantity in buy order eql to 32", () => {
		const wrapper = shallow(<OrderBook buy={buy2} sell={sell}/>);
		expect(wrapper.find("table").first()
			.find("tr").last()
			.find("td").first().text()).toEqual("32");
	});
	
	it("should have 2 theads", () => {
		const wrapper = shallow(<OrderBook buy={buy} sell={sell}/>);
		expect(wrapper.find("thead").length).toEqual(2);
	});

	it("should have 2 tbody", () => {
		const wrapper = shallow(<OrderBook buy={buy} sell={sell}/>);
		expect(wrapper.find("tbody").length).toEqual(2);
	});

	it("should have 1 td with class buy and value 10", () => {
		const wrapper = shallow(<OrderBook buy={buy} sell={sell}/>);
		expect(wrapper.find(".buy").text()).toEqual("10");
	});

	it("should have empty tbody when buy and sell are empty array", () => {
		const wrapper = shallow(<OrderBook buy={[]} sell={[]}/>);
		expect(wrapper.find("tbody").length).toEqual(2);
		expect(wrapper.find("tbody").first().text()).toEqual("");
		expect(wrapper.find("tbody").last().text()).toEqual("");
	});
});