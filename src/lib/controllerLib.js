import * as db from "../db/dbIndex";
import { varNameToString } from "./misc";

const Op = db.Op;

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
