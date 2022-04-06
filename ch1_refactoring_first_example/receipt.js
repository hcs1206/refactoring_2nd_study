function statement(invoice, plays){
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

    for(let performance of invoice.performances){
        const play = plays[performance.playID];
        let thisAmount = amountFor(performance, play);
        // 포인트 적립
        volumeCredits += Math.max(performance.audience - 30, 0);
        // 희극 관객 5명마다 추가 포인트 제공
        if("comedy" == play.type) volumeCredits += Math.floor(performance.audience / 5);

        result +=` ${play.name}: ${format(thisAmount/100)} (${performance.audience}석)\n`;
        totalAmount += thisAmount;
    }
        // 청구 내역을 출력한다
        result += `총액: ${format(totalAmount/100)}\n`
        result += `적립 포인트: ${volumeCredits}점\n`;

        return result;
}

function amountFor(aPerformance, play){
    let result = 0;

    switch(play.type){
    case "tragedy":
        result = 40000;
        if(aPerformance.audience > 30){
            result += 1000 * (aPerformance.audience - 30);
        }
        break;
    case "comedy":
        result = 30000;
        if(aPerformance.audience > 20){
            result += 10000 + 500*(aPerformance.audience - 20);
        }    
        result += 300*aPerformance.audience;
        break;
    default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    return result;
}

module.exports = statement;