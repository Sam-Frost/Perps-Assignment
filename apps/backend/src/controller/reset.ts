import type { Request, Response } from "express";

export function reset(req: Request, res: Response) {
  // TODO : Implement
  res.status(200).json({ ok: true });
}
