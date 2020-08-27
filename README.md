This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and connect to the [Kraken FX websocket API](https://www.kraken.com/features/websocket-api).<br /><br />
It displays the order book in real-time for the pair XBTUSD showing the Price, Quantity and calculates the cumulative quantity for each price.<br /><br />
From the Depth Level dropdown the user can select a how many level in the book wants to display.<br /><br />

## Install

Clone repo, then cd into the directory, then `npm install` and `npm start` to run the app in the development mode.<br />

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### Code

The websocket connection is establish in `App.js` and subscribe for the public order book data for the pair XBT USD (`feed: "book", product_ids: ["PI_XBTUSD"]`).
On connection, the first api message is the book snapshot `book_snapshot` and the following are all the order book updates with price and qty information. When qty is zero, the price can be removed from the book.<br />

Although is a small app and I could have used simply the component props for interacts with component, but I decided to use the react Context for the state management having app scalability in mind.

The components are all functional components with react hooks instead of Class components in order to improve the performance and code readibility

UI and code are split in 3 main components:

- Order Book
- Depth Level
- Input price

The data manipulation functions are included in `utils.js` for facilitate testing and reusability.

### Order book

It displays two tables for the order book Buy and Sell prices. Buy orders sorted by descending price and Sell orders sorted by ascending. Each level in the book include the quantity for the related prices and also the Total quantity which is the cumulated quantity of all the orders from the closest price from the market price.
Default depth level is 10 but can be changed by the Depth level dropdown selection.
By clicking on a price value, the Input price field will be populated with the selected value.

### Depth level

It's a dropdown menu that allow the user to select how many prices wants to be able to visualize. Default value is 10 max 50

### Input price

Number input field that accept manual input or can be populated by clocking on a specific price from the order book.
