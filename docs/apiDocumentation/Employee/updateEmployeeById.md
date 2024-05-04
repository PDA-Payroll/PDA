# Update Employee

Edit values for an employee in the database

**URL**: `/employee/post/update/${id}`

## Usage

Send the post request using the employee's id number where it says id in the url.

Provide any of the the following json data:

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
