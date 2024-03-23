class PunchCard{
    #clockIn;
    #clockOut;

    constructor(partOfDay) {
        this.partOfDay = partOfDay;
        this.clockIn;
        this.clockOut;
        this.timeWorked;
    }
    set clockIn(time){

    }
    set clockOut(time){

    }
    calcTimeWorked(){

    }
    get timeWorked(){
        return calcTimeWorked();
    }
}