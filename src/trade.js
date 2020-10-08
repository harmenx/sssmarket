module.exports = class Trade {

  constructor(stocks) {
    this.stocks = stocks;
  }

  calculateGBCE() {
    let trades = this.stocks.map(function (stock) { return stock.trades.length > 0 && stock.trades })[0]
    let total = 1;
    for (let i = 0; i < trades.length; i++) {
      total = total * trades[i].price;
    }
    let result = Math.pow(total, (1 / trades.length));
    return Math.round(result, 2);
  }
  
}