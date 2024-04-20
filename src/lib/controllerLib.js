import * as db from "../db/dbIndex.js";
import { varNameToString } from "./misc.js";

const Op = db.Op;

// findAll :: Object -> (req, res) -> void
export const findAllOfObject = (Entity) => (field) => (req, res) => {
  const field = req.query.field;
  var condition = field ? { field: { [Op.like]: `%${field}%` } } : null;

  Entity.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving ${varNameToString(Entity)}`,
      });
    });
};

// findByPk :: Object -> (req, res) -> void
export const findObjectByPk = (Entity) => (req, res) => {
  const id = req.params.id;

  Entity.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ${varNameToString(Entity)} with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving ${varNameToString(Entity)} with id=${id}.`,
      });
    });
};

// deleteObjectById :: Object -> (req, res) -> void
export const deleteObjectById = (Entity) => (req, res) => {
  const id = req.params.id;

  Entity.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `${varNameToString(Entity)} was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete ${varNameToString(Entity)} with id = ${id}. Most likely doesn't exist`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Cannot delete ${varNameToString(Entity)} with id = ${id}.`,
      });
    });
};

// deleteAll :: Object -> (req, res) -> void
export const deleteAll = (Entity) => (req, res) => {
  Entity.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} ${varNameToString(Entity)}s were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while removing all ${varNameToString(Entity)}s`,
      });
    });
};
