import { db } from "../db";

export async function getProjects(offset: number, limit: number) {
  const [rows] = await db.query("SELECT * FROM projects LIMIT ?, ?", [
    offset,
    limit,
  ]);
  return rows;
}

export async function addToCart(projectId: number) {
  await db.query("INSERT INTO cart (project_id) VALUES (?)", [projectId]);
}

export async function getCart() {
  const [rows] = await db.query(
    "SELECT p.* FROM cart c JOIN projects p ON c.project_id = p.id"
  );
  return rows;
}
