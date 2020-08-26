import React from "react";
import {shallow} from "enzyme";
import Order from "../Order";

test("renders Order without crashing", () => {
	shallow(<Order />);
});

test("buy order render a td with class order-price.buy", () => {
	const wrapper = shallow(Order(130,10,10,"buy",jest.fn().mockName("mockedFunction")));
	expect(wrapper.find("td.order-price.buy").length).toEqual(1);
	expect(wrapper.find("td").length).toEqual(2);
});

test("sell order render a tr with a td with class order-price.sell", () => {
	const wrapper = shallow(Order(130,10,10,"sell",jest.fn().mockName("mockedFunction")));
	expect(wrapper.html()).toEqual("<tr><td class=\"order-price sell\">130</td><td>10</td></tr>");
});