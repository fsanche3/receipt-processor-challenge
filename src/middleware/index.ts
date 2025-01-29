import { Request, Response, NextFunction } from "express";
import { type Schema, ZodError } from "zod";

export const validateRequest = ({
  queryShema,
  paramsSchema,
  bodyShema,
}: {
  queryShema?: Schema;
  paramsSchema?: Schema;
  bodyShema?: Schema;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (queryShema) {
        queryShema.parse(req.query);
      }
      if (paramsSchema) {
        paramsSchema.parse(req.params);
      }
      if (bodyShema) {
        bodyShema.parse(req.body);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json("The receipt is invalid");
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
};
