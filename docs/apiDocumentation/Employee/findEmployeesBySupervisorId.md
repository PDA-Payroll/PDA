# Find Employees By Supervisor Id

Return the all employees who's given supervisor matches the input id.

**URL**: `/employee/get/supervisor/${supervisorId}`

**Method**: `GET`

## Usage

Send a get request with the Supervisor's id.

The request will then all employees in the following format who's supervisorId matches the given supervisorId.

```json
{
  "employeeFirstName": "[unicode unilimited length]",
  "employeeMiddleName": "[unicode unilimited length]",
  "employeeLastName": "[unicode unilimited length]",
  "employeeUserName": "[unicode unilimited length]",
  "employeePassword": "[unicode unilimited length]",
  "isAdmin": "[boolean]",
  "isSupervisor": "[boolean]",
  "socialSecurityNumber": "[integer]",
  "supervisorId": "[integer or null]"
}
```

## Success Response

**Condition**: If Everything is okay and the Employee data is updated.

**Code**: `200`

## Error Response

**Condition** Incorrect Format or nonexistant field.

**Code**: `500`
