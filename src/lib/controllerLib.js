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
        message: `Error retrieving ${varNameToString(entity)} with id=${id}.`,
      });
    });
};
