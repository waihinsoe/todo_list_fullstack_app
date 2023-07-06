import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { todoId, date, note } = req.body;
    const isValid = todoId && date.length && note.length;
    if (!isValid) return res.send(400);

    await prisma.todos.update({
      data: {
        note,
        date,
      },
      where: {
        id: Number(todoId),
      },
    });

    res.send(200);
  }
}
