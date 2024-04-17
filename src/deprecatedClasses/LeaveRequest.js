class LeaveRequest{
    paidLeaveAmount;
    isApproved =false;
    constructor(leaveDuration) {
        this.leaveDuration = leaveDuration;
    }
    set setIsApproved(approval){
        this.isApproved = approval;
    }
    calcPaidLeaveAmount(hourlyRate){
        this.paidLeaveAmount = this.leaveDuration * hourlyRate;
    }

}