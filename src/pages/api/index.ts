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

      return res.send({ user: newUser });
    } else {
      const userId = userFromDB.id;
      const todos = await prisma.todos.findMany({
        where: {
          users_id: userId,
        },
      });

      return res.send({ user: userFromDB, todos });
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
  } else {
    return res.send(405);
  }
}
