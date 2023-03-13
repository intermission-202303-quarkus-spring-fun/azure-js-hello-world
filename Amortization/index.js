


function amortization(totalLoan, currentInterestRate, repaymentPerYear) {

    let years = 0.0;
    let remainingDebt = totalLoan;
    let totalPaymentAmount = 0.0;
    let lastPayment = 0.0;

    while (remainingDebt > 0.0) {
        years++;
        // not really correct, we should rather use decimal library here, but for the sake of this example it is enough
        let interest = parseFloat((remainingDebt * currentInterestRate).toFixed(2));
        if (interest >= repaymentPerYear) {
            throw new Error("would run forever");
        }
        remainingDebt = remainingDebt + interest;
        if (remainingDebt < repaymentPerYear) {
            totalPaymentAmount = totalPaymentAmount + remainingDebt;
            lastPayment = remainingDebt;
            remainingDebt = 0.0;
        } else {
            remainingDebt = remainingDebt - repaymentPerYear;
            totalPaymentAmount = totalPaymentAmount + repaymentPerYear;
            lastPayment = repaymentPerYear;
        }
    }

    return {
        totalPaymentAmount: totalPaymentAmount.toFixed(2),
        lastPayment: lastPayment.toFixed(2),
        years: years
    };
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Read incoming data
    const totalLoan = parseFloat(req.query.totalLoan || (req.body && req.body.totalLoan));
    const currentInterestRate = parseFloat(req.query.currentInterestRate || (req.body && req.body.currentInterestRate));
    const repaymentPerYear = parseFloat(req.query.repaymentPerYear || (req.body && req.body.repaymentPerYear));

    if (totalLoan && currentInterestRate && repaymentPerYear) {
        const response = amortization(totalLoan, currentInterestRate, repaymentPerYear);

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: response
        };    
    } else {
        context.res = {
            status: 400,
            body: "invalid parameters"
        };
    }

}

