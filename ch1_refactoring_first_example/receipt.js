function statement(invoice, plays){
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

    for(let performence of invoice.performances){
        const play = plays[performence.playID];
        let thisAmount = 0;

        switch(play.type){
        case "tragedy":
            thisAmount = 40000;
            if(performence.audience > 30){
                thisAmount += 1000 * (performence.audience - 30);
            }
            break;
        case "comedy":
            thisAmount = 30000;
            if(performence.audience > 20){
                thisAmount += 10000 + 500*(performence.audience - 20);
            }    
            thisAmount += 300*performence.audience;
            break;
        default:
            throw new Error(`알 수 없는 장르: ${play.type}`);
        }
        // 포인트 적립
        volumeCredits += Math.max(performence.audience - 30, 0);
        // 희극 관객 5명마다 추가 포인트 제공
        if("comedy" == play.type) volumeCredits += Math.floor(performence.audience / 5);

        result +=` ${play.name}: ${format(thisAmount/100)} (${performence.audience}석)\n`;
        totalAmount += thisAmount;
    }
        // 청구 내역을 출력한다
        result += `총액: ${format(totalAmount/100)}\n`
        result += `적립 포인트: ${volumeCredits}점\n`;

        return result;
}

module.exports = statement;