# Find Employee By Username

Return the all values of an employee with the given username.

**URL**: `/employee/get/${employeeUsername}`

**Method**: `GET`

## Usage

Send a get request with the Employee's username in place of ${employeeUsername}.

The request will then return the following data:

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
