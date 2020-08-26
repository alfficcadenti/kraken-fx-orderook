import {sortOrderBookData, generateArrayToDisplay} from "../utils";
import {mockRawBookData} from "./mockData";

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