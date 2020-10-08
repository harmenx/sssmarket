const expect = require('chai').expect;

const stock = require("../src/stock");
const Trade = require('../src/trade');


const databaseMock = [
    new stock("TEA", "Common", 0, 0, 100),
    new stock("POP", "Common", 8, 0, 100),
    new stock("ALE", "Common", 23, 0, 60),
    new stock("GIN", "Preffered", 8, 0.2, 100),
    new stock("JOE", "Common", 13, 0, 250),
]

it('dividend yield - common', function (done) {
    let testStock = databaseMock[1];
    expect(testStock.dividendYield(100.00)).to.equal(0.08);
    done();
});

it('dividend yield - preferred', function (done) {
    let testStock = databaseMock[3];
    expect(testStock.dividendYield(100.00)).to.equal(0.2);
    done();
});

it('dividend yield - cant take less than 0', function (done) {
    let testStock = databaseMock[1];
    expect(testStock.dividendYield(-1)).to.equal(0.00);
    done();
});

it('price earnings ratio', function (done) {
    let testStock = databaseMock[1];
    expect(testStock.peRatio(100)).to.equal(12.5);
    done();
});

it('price earnings ratio - cant take less than 0', function (done) {
    let testStock = databaseMock[1];
    expect(testStock.peRatio(-1)).to.equal(0);
    done();
});

it('record a trade', function (done) {
    let testStock = databaseMock[0];
    testStock.recordTrade(100, 100);
    expect(testStock.trades.length).to.equal(1);
    expect(testStock.trades[0].indicator).to.equal("BUY");
    expect(testStock.trades[0].price).to.equal(100);
    expect(testStock.trades[0].shares).to.equal(100);
    testStock.trades=[];
    done();
});

it('check trade price', function (done) {
    let testStock = databaseMock[0];
    testStock.recordTrade(1,100);
    testStock.recordTrade(3,300);
    expect(testStock.volWeightedStockPrice()).to.equal(250);
    testStock.trades=[];
    done();
});

it('check new price', function (done) {
    let testTrade = new Trade(databaseMock);
    testTrade.stocks[0].recordTrade(100, 100);
    testTrade.stocks[1].recordTrade(100, 100);
    testTrade.stocks[2].recordTrade(100, 100);
    expect(testTrade.calculateGBCE()).to.equal(100);
    testTrade.stocks[0].trades=[];
    testTrade.stocks[1].trades=[];
    testTrade.stocks[2].trades=[];
    done();
});