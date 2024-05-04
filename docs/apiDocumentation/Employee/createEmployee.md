# Create Employee

Initialize an employee and their account in the database.

**URL**: `/employee/post/create/`

**Method**: `POST`

## Usage

Provide the following json data, `null` is not allowed unless specified otherwise:

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

**Condition**: If Everything is okay and Employee is created.

**Code**: `200`

## Error Response

**Condition** Incorrect Format.

**Code**: `500`
