import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

const OrderBookContext = createContext([{}, () => {}]);

const OrderBookProvider = (props) => {
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

export { OrderBookContext, OrderBookProvider };