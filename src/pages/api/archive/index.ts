import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const archivedTodoIds = req.body.archivedTodoIds as number[];
    if (!archivedTodoIds.length) return res.send(400);

    await prisma.todos.updateMany({
      data: {
        is_archived: false,
      },
      where: {
        id: {
          in: archivedTodoIds,
        },
      },
    });
    res.send(200);
  }
}
