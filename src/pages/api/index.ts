import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const todos = await prisma.todos.findMany();
    res.send({ todos });
  } else if (req.method === "POST") {
    const { name } = req.body;

    await prisma.todos.create({
      data: {
        name,
      },
    });
    res.send(200);
  } else if (req.method === "DELETE") {
    const deleteId = req.query.id as string;
    if (!deleteId) return res.send(400);
    await prisma.todos.delete({
      where: {
        id: Number(deleteId),
      },
    });
    res.send(200);
  } else {
    res.send(405);
  }
}
