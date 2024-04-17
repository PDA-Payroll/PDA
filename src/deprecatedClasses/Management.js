class Management extends Employee{
    constructor(hourlyRate, employeeID,managementLevel) {
        super(hourlyRate, employeeID);
        this.managementLevel = managementLevel;
    }
    getManagementLevel(){
        return this.managementLevel;
    }
}