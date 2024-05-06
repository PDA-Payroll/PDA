# Create Punch Card

Initialize a Punch Card in the database.

**URL**: `/punchCard/post/create/`

**Method**: `POST`

## Usage

Provide the following json data, `null` is not allowed unless specified otherwise:

```json
{
  "employeeId": "[integer]",
  "dateIn": "[date]",
  "dateOut": "[date]"
}
```

## Success Response

**Condition**: If Everything is okay and Employee is created.

**Code**: `200`

## Error Response

**Condition** Incorrect Format.

**Code**: `500`
