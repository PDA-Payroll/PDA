class BiWeeklyCheck{
    federalTax;
    stateTax;
    grossEarnings;
    takeHome;
    overtimePayment;
    constructor(paymentPeriod) {
        this.paymentPeriod = paymentPeriod;
    }
    calculateStateTax(stateTaxRate){
        this.stateTax = calculatedStateTax;
    }
    calculateFederalTax(federalTaxRate){
        this.federalTax = calulatedFederalTax;
    }
    calculateGrossEarnings(){

        this.grossEarnings = calculatedGrossEarnings;
    }
    calculatetakeHome(){
        this.takeHome = calculatedTakeHome;
    }
    calculateOvertimePayment(){
        this.overtimePayment = calculatedOvertimePayment;
    }
    get stateTax(){
        return this.stateTax;
    }
    get federalTax(){
        return this.federalTax;
    }
    get grossEarnings(){
        return this.grossEarnings;
    }
    get takeHome(){
        return this.takeHome;
    }
    get overtimePayment(){
        return this.overtimePayment;
    }




}