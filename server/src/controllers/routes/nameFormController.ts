import { Request, Response } from "express";

const startSession = (req: Request, res: Response) => {
  res.end();
};

export default startSession;