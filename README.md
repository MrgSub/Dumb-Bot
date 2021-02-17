# Dumb-Crypto
A "dumb" crypto bot that uses Binance and TradingView alerts to make trades on your behalf

## How to use
1. Clone the repo & put your keys and selected coin
2. ``npm install``
3. Run the server
4. Use `ngrok` to create a remote URL for your server and forward the proper port
5. Go to TradingView and go to the selected coin
6. Add an indicatior that gives "Buy/Sell" signals to your chart (Supertrend)
7. Configure the alerts to send a webhook request to the URL you got from `ngrok` (Don't forget to add `/webhook`)
8. Make sure you have enough balance to Buy and sell the quantity you specified

## Notes
- Every coin has its minimum purchase amount and quantity, so you can't trade with 1 DOGE for example, minimum is 100. (To be made)
- The bot will buy whenever it gets a buy signal, and it will only sell when there's profit to be made, otherwise it will hold.
- The bot currently has no buying limit (To be made)

## TODO
1. Order History (Prevents the bot from selling with loss because HODL and we like the stock)
2. Maximum Allowed Quantity (Prevents the bot from buying more)
3. 

Disclaimer: You know, this isn't perfect, but it'll get there
