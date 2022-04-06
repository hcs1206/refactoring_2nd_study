const createStatementData = require('./createStatementData')

function statement(invoice, plays){
    return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data){
    let result = `청구 내역 (고객명: ${data.customer})\n`;
    
    for(let performance of data.performances){
        result +=` ${performance.play.name}: ${usd(performance.amount)} (${performance.audience}석)\n`;
    }
    
    // 청구 내역을 출력한다
    result += `총액: ${usd(data.totalAmount)}\n`
    result += `적립 포인트: ${data.totalVolumeCredits}점\n`;

    return result;   
}

function usd(aNumber){
    return new Intl.NumberFormat("en-US", 
    {style: "currency", currency: "USD", minimumFractionDigits: 2}).format(aNumber/100);
}

module.exports = statement;