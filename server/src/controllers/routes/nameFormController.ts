import { Response } from "express";

const startSession = (req: any, res: Response) => {
  // if (!req.session.start) req.session.start = true;
  // req.session.save();
  res.end();
};

export default startSession;