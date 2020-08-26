import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const OrderBookContext = createContext([{}, () => {}]);

export const OrderBookProvider = (props) => {
	const [state, setState] = useState({});
	return (
		<OrderBookContext.Provider value={[state, setState]}>
			{props.children}
		</OrderBookContext.Provider>
	);
};

OrderBookProvider.propTypes = { 
	children: PropTypes.node.isRequired
};