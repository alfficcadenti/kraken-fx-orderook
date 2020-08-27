import React, { useContext } from "react";
import { OrderBookContext } from "../OrderBook/OrderBookContext";

const DepthLevel = () => {
	const [state, setState] = useContext(OrderBookContext);

	const options = [
		1, 5, 10, 25, 50
	];
	const DEFAULT_OPTION = 10;
	const onDepthChange = (e) => {
		const newLevel = Number(e.target.value) || "";
		setState((state) => ({ ...state, depthLevel: newLevel }));
	};
	
	return (<div className="depth-level-dropwdown-container">
		<label>Depth Level</label>
		<select className='depth-level-dropwdown' onChange={onDepthChange}>
			{options.map((x,i)=>{
				const option = (state.depthLevel === x) || (x === DEFAULT_OPTION) ? 
					(<option className="depth-level-option" key={i} value={x} selected>{x}</option>) :
					(<option className="depth-level-option" key={i} value={x}>{x}</option>);
				return option;
			})}
		</select></div>);
};

export default DepthLevel;