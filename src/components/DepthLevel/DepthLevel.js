import React, { useContext } from "react";
import Dropdown from "react-dropdown";
import { OrderBookContext } from "../OrderBook/OrderBookContext";


const DepthLevel = () => {
	const [state, setState] = useContext(OrderBookContext);

	const options = [
		1, 10, 30, 100
	];
	const defaultOption = options[1];
	
	const onDepthChange = (e) => {
		const newLevel = Number(e.value) || "";
		setState((state) => ({ ...state, depthLevel: newLevel }));
	};
	
	return (<Dropdown 
		className='dropwdown-input'
		options={options} 
		onChange={onDepthChange} 
		value={state.depthLevel || defaultOption} 
		placeholder="Depth Level" />);
};

export default DepthLevel;