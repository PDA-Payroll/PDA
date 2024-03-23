class PunchChange{
    isApproved = false;
    constructor(punchType, timeRequest) {
        this.punchType = punchType;
        this.timeRequest = timeRequest;

    }

    get isApproved(){//returns the approval state of request
        return this.isApproved;
    }
    set isApproved(approval){//need to make it such that only those with a high enough management level can call this function
        this.isApproved = approval;
    }
}