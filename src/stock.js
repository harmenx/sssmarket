module.exports = class Stock {

    constructor(symbol, type, lastDividend, fixedDividend, parVale) {
        this.symbol = symbol;
        this.trades = [];
        this.lastDividend = lastDividend;
        this.fixedDividend = fixedDividend;
        this.type = type;
        this.parVale = parVale;
    }

    dividendYield(price) {
        if (price > 0) {
            return this.type === "Common" ? this.lastDividend / price : this.fixedDividend * this.parVale / price;
        } else {
            return 0;
        }
    }

    peRatio(price) {
        if (price > 0) {
            return price / this.lastDividend;
        }
        return 0;
    }

    recordTrade(qty, price) {
        if (qty > 0 && price > 0) {
            this.trades.push({ timestamp: new Date(), shares: qty, indicator: "BUY", price: price });
        }
    }

    volWeightedStockPrice() {
        let startTime = new Date(new Date() - (15 * 60 * 1000));
        let totalQty = 0;
        let sumPrice = 0;
        let relevantTrades = this.trades.filter(function (trade) { return trade.timestamp > startTime });
        for (let i = 0; i < relevantTrades.length; i++) {
            let trade = relevantTrades[i];
            sumPrice += trade.price * trade.shares;
            totalQty += trade.shares;
        }
        return sumPrice / totalQty;
    }

}