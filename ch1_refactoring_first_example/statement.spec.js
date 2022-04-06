const should = require('should');
const statement = require("./statement.js");
const plays = require('./plays.json');
const invoices = require('./invoices.json');

describe("receipt.js 모듈의 statement 함수는", ()=>{
    it("json을 분석해 영수증을 출력한다",()=>{
        let result = statement(invoices[0], plays)
        result.should.be.equal(`청구 내역 (고객명: BigCo)
 Hamlet: $650.00 (55석)
 As You Like It: $580.00 (35석)
 Othello: $500.00 (40석)
총액: $1,730.00
적립 포인트: 47점
`)
    })
})