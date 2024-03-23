class TimeSheet{
    date;
    earnedLeave;
    earnedOvertime;
    hoursWorkedForDay;
    constructor(date) {
    this.date = date;
    this.calcLeave();
    this.calcHoursWorkedForDay();
    this.calcOvertime();
    }
    calcLeave(){
        this.earnedLeave = calculatedEarnedLeave;
    }
    calcHoursWorkedForDay(){
        this.hoursWorkedForDay = calculatedHoursWorked;
    }
    calcOvertime(){
        this.earnedOvertime = calculatedOvertime;
    }
    get hoursWorkedForDay(){
        return this.hoursWorkedForDay
    }
    get earnedOvertime(){
        return this.earnedOvertime
    }
    get earnedLeave(){
        return this.earnedLeave;
    }

}