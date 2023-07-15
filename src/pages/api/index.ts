import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getSession({ req });
    if (!session) return res.send(400);
    const user = session.user;
    const name = user?.name as string;
    const email = user?.email as string;
    const image = user?.image as string;

    const userFromDB = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (!userFromDB) {
      const newUser = await prisma.users.create({
        data: {
          name,
          email,
          image,
        },
      });
      console.log("newUser :", newUser);
      return res.send({ user: newUser });
    } else {
      const userId = userFromDB.id;
      const todos = await prisma.todos.findMany({
        where: {
          users_id: userId,
          is_archived: false,
        },
      });

      const archivedTodos = await prisma.todos.findMany({
        where: {
          users_id: userId,
          is_archived: true,
        },
      });

      return res.send({ user: userFromDB, todos, archivedTodos });
    }
  } else if (req.method === "POST") {
    const { title, userId } = req.body;
    const isVaid = title && userId;
    if (!isVaid) return res.send(400);

    await prisma.todos.create({
      data: {
        title,
        users_id: Number(userId),
      },
    });
    return res.send(200);
  } else if (req.method === "PUT") {
    const { userId, todoId, isDone, isLineThrough } = req.body;
    const isValid = userId && todoId;
    if (!isValid) return res.send(400);

    if (!isLineThrough) {
      //if lineThrough is false , want to make undone this todo.
      await prisma.todos.update({
        data: {
          is_lineThrough: isLineThrough,
        },
        where: {
          id: Number(todoId),
        },
      });
      return res.send(200);
    }

    //If lineThrough and isDone are true , want to make done this todo.
    await prisma.todos.update({
      data: {
        is_done: isDone,
        is_lineThrough: isLineThrough,
      },
      where: {
        id: Number(todoId),
      },
    });
    return res.send(200);
  } else if (req.method === "DELETE") {
    const todoId = req.query.todoId as string;
    if (!todoId) return res.send(405);

    await prisma.todos.delete({
      where: {
        id: Number(todoId),
      },
    });

    return res.send(200);
  } else {
    return res.send(405);
  }
}
