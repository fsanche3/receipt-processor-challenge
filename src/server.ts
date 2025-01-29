import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import * as uuid from "uuid";
import { getReceiptPoints, postReceiptPoints } from "./database";
import { validateRequest } from "./middleware";
import { Receipt, idSchema, receiptSchema } from "./middleware/schemas";
import { getPoints } from "./utils/calculatePoints";

export const app = express();

app.use(cors());
app.use(express.json());

app.get(
  "/receipts/:id/points",
  (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const { success } = idSchema.safeParse(id);

    if (!success || !getReceiptPoints(id)) {
      res.status(404).json("No receipt found for that ID.");
    } else {
      res.status(200).json({ points: getReceiptPoints(id) });
    }
  }
);

app.post(
  "/receipts/process",
  validateRequest({ bodyShema: receiptSchema }),
  (req: Request, res: Response, next: NextFunction) => {
    const receipt: Receipt = req.body;

    const id = uuid.v4();

    postReceiptPoints(id, getPoints(receipt));

    res.status(200).json({ id });
  }
);

export const server = app.listen(3000, () => {
  console.info("Server running on port 3000");
});
