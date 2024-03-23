class Employee{
    constructor(employeeID, hourlyRate){ //initialize employee with hourly rate and ID
        this.employeeId = employeeID;
        this.hourlyRate = hourlyRate;
        let netLeave = 0;
        let netSalary = 0;
    }
    get EmployeeId(){
        return this.employeeId;
    }
    get hourlyRate(){
        return this.hourlyRate;
    }
    set netLeave(newLeave){
        this.netLeave = newLeave;
    }
    incrementNetSalary(newSalary){ // this is an incremental function as bi-weekly check will increment net salary
        this.netSalary += newSalary;
    }

}