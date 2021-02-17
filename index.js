const Binance = require('node-binance-api');
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

/**
 * The coin you want to trade
 * @type {string}
 */
const coin = 'DOGEBUSD';
/**
 * How many do you want the bot to buy/sell ?
 * @type {number}
 */
const qty = 100;
/**
 * The last price the coin was bought at, this could be manually changed before starting the script
 * @type {{boughtAt: string}}
 */
let latestOrders = {
	boughtAt: '',
};

/**
 * Get your API details from Binance
 */
const binance = new Binance().options({
	APIKEY: '',
	APISECRET:
		'',
});

app.use(cors());
app.use(bodyParser.json());

const startServer = (port = 1337) => {
	http.createServer(app).listen(port);
	console.info('Listening on port ' + port);
};

app.get('/', (req, res) => {
	return res.json({ success: true });
});

/**
 * This is where you'll have TradingView webhook alerts set to
 * Example message:
 * { "action": "Buy" }
 */
app.post('/webhook', async (req, res) => {
	binance.prices(coin, (error, ticker) => {
		let price = parseFloat(ticker[coin]);
		if (req.body.action === 'Buy') {
			binance
				.buy(coin, qty, price)
				.then((r) => {
					console.info(`Bought ${qty} of ${coin} at ${r.price}`);
					latestOrders.boughtAt = r.price;
				})
				.catch((e) => {
					console.info('Error buying', e.body);
				});
		} else if (req.body.action === 'Sell') {
			if (price < latestOrders.boughtAt)
				return console.info(
					'Avoided selling because bought at ' +
						latestOrders.boughtAt +
						' and current price is ' +
						price
				);
			binance
				.sell(coin, qty, price)
				.then((r) => {
					console.info(
						`Sold ${qty} of ${coin} at ${r.price} for a total of ${
							r.price * qty
						}`
					);
					latestOrders.soldAt = r.price;
				})
				.catch((e) => {
					console.info('Error selling', e.body);
				});
		}
	});
	console.log(latestOrders);
	return res.send({});
});

startServer();
