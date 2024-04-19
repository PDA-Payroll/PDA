import path from "path";
import { fileURLToPath } from "url";

const error418 = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "responses",
  "418.html",
);

module.exports = {
  error418,
};
