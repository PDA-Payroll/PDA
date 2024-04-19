import path from "path";
import { fileURLToPath } from "url";

export const error418 = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "responses",
  "418.html",
);
