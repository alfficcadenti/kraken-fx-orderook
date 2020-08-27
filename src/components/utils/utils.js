const volumeAccumulator = (accumulator, curr) => accumulator + curr.qty;

export const generateArrayToDisplay = (arr, side, depthLevel) => {
	const sortedArray = sortOrderBookData(arr, side).slice(0,depthLevel);
	return sortedArray && sortedArray.slice(0,depthLevel)
		.map((x,idx)=>(
			{
				price: x.price || 0, 
				qty: x.qty || 0, 
				total: sortedArray.slice(0,idx+1).reduce(volumeAccumulator,0) || 0
			}
		));
};

export const sortOrderBookData = (arr = [], side = "") => {
	if(side === "sell") {
		return Array.isArray(arr) && arr.sort((a, b) => (a.price - b.price));
	}
	if(side === "buy") {
		return Array.isArray(arr) && arr.sort((a, b) => (b.price - a.price));
	}
	return arr;
};

export const updatedOrderBook = (newOrderPrice, newOrderQuantity, book) => {
	const idx = book.findIndex(x=>x.price === newOrderPrice);
	if(idx === -1 &&  newOrderQuantity !== 0) {
		return ([...book,{price: newOrderPrice, qty: newOrderQuantity}]);
	} else {
		newOrderQuantity !== 0 ? 
			book[idx] = {price: newOrderPrice, qty: newOrderQuantity} : 
			book.splice(idx, 1);
		return book;
	}
};