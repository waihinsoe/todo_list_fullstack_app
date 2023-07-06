import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const doneTodoIds = req.body.doneTodoIds as number[];
    const lineThroughTodoIds = req.body.lineThroughTodoIds as number[];
    if (doneTodoIds.length) {
      //if true, want to show in frontend with lineThrough
      await prisma.todos.updateMany({
        data: {
          is_done: false,
        },
        where: {
          id: {
            in: doneTodoIds,
          },
        },
      });
      return res.send(200);
    }
    // if not , want to hide from frontend with lineThrough todos
    await prisma.todos.updateMany({
      data: {
        is_done: true,
      },
      where: {
        id: {
          in: lineThroughTodoIds,
        },
      },
    });

    res.send(200);
  }
}
