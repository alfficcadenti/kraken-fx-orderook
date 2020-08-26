const volumeAccumulator = (accumulator, curr) => accumulator + curr.qty;

export const generateArrayToDisplay = (arr, side, depthLevel) => {
	const sortedArray = sortOrderBookData(arr, side).slice(0,depthLevel);
	return sortedArray && sortedArray.slice(0,depthLevel)
		.map((x,idx)=>(
			{
				price: x.price, 
				qty: x.qty, 
				total: sortedArray.slice(0,idx+1).reduce(volumeAccumulator,0)
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