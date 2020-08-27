import {sortOrderBookData, generateArrayToDisplay, updatedOrderBook} from "./utils";
import {mockRawBookData} from "../OrderBook/tests/mockData";

const unsortedBook = [
	{
		price: 0,
		qty: 10
	},
	{
		price: 15,
		qty: 20
	},
	{
		price: 13,
		qty: 300
	},
];

const sellBookSorted = [{"price": 0, "qty": 10}, {"price": 13, "qty": 300}, {"price": 15, "qty": 20}];
const buyBookSorted = [{"price": 15, "qty": 20}, {"price": 13, "qty": 300}, {"price": 0, "qty": 10}];


describe("sortOrderBookData()", () => {
	test("returns sell array sorted ASC", () => {
		expect(sortOrderBookData(unsortedBook,"sell")).toEqual(sellBookSorted);
	});
    
	test("returns sell array sorted DESC", () => {
		expect(sortOrderBookData(unsortedBook,"buy")).toEqual(buyBookSorted);
	});
    
	test("returns same array if 'side' is not specifed", () => {
		expect(sortOrderBookData(unsortedBook)).toEqual(unsortedBook);
	});
    
	test("returns same array if 'side' is not specifed", () => {
		expect(sortOrderBookData([])).toEqual([]);
	});
    
	test("returns empty array when no input", () => {
		expect(sortOrderBookData()).toEqual([]);
	});
    
	test("returns same array if price are undefined or null", () => {
		const emptyBook = [
			{
				price: null,
				qty: 100
			},
			{
				price: "",
				qty: 12
			}
		];
		expect(sortOrderBookData(emptyBook)).toEqual(emptyBook);
	});
});

describe("generateArrayToDisplay()", () => {
	test("returns the expected array formatted", () => {
		expect(generateArrayToDisplay(mockRawBookData,"sell",1)).toEqual([{"price": 2, "qty": 10, "total":10}]);
		expect(generateArrayToDisplay(mockRawBookData,"sell",2)).toEqual([{"price": 2, "qty": 10, "total":10}, {"price": 12, "qty": 300, "total":310}]);

	});
});

describe("updatedOrderBook()", () => {
	test("returns replace the qty for a price already in the book", () => {
		expect(updatedOrderBook(15,10,unsortedBook)).toEqual([{"price": 15, "qty": 10}, {"price": 13, "qty": 300}, {"price": 0, "qty": 10}]);
	});

	test("adds the new price and qty to the book", () => {
		const oldBook = [
			{
				price: 12,
				qty: 4
			},
			{
				price: 3,
				qty: 30
			},
		];
		expect(updatedOrderBook(16,1,oldBook).length).toEqual(3);
	});
});
