# Delete Employee

Delete an employee from the database.

**URL**: `/deleete/${id}`

**Method**: `DELETE`

## Usage

Provide the employee's id number to permanently delete them from the database. This action is not undoable.

## Success Response

**Condition**: If Everything is okay and Employee is created.

**Code**: `200`

## Error Response

**Condition** Incorrect Format.

**Code**: `500`
