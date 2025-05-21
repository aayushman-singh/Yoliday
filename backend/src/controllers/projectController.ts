import { Request, Response } from "express";
import { z } from "zod";
import { getProjects, addToCart, getCart, addToSaved, getSaved } from "../models/projectModel";

export async function getProjectsHandler(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 6;
  const offset = (page - 1) * limit;

  try {
    const rows = await getProjects(offset, limit);
    res.json({ projects: rows });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects." });
  }
}

export async function addToCartHandler(req: Request, res: Response) {
  const schema = z.object({ projectId: z.number() });

  try {
    const { projectId } = schema.parse(req.body);
    await addToCart(projectId);
    res.status(201).json({ message: "Added to cart." });
  } catch (err) {
    res.status(400).json({ error: "Invalid data." });
  }
}

export async function getCartHandler(req: Request, res: Response) {
  try {
    const rows = await getCart();
    res.json({ cart: rows });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart." });
  }
}
export async function addToSavedHandler(req: Request, res: Response) {
  const schema = z.object({ projectId: z.number() });

  try {
    const { projectId } = schema.parse(req.body);
    await addToSaved(projectId);
    res.status(201).json({ message: "Added to saved." });
  } catch (err) {
    res.status(400).json({ error: "Invalid data." });
  }
}

export async function getSavedHandler(req: Request, res: Response) {
  try {
    const rows = await getSaved();
    res.json({ cart: rows });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch saved." });
  }
}

