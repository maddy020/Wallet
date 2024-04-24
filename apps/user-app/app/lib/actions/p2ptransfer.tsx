"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function p2ptransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  console.log("amount", amount);
  if (!session || !userId) {
    return {
      message: "User Not Logged In",
    };
  }
  const receiver = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });
  if (!receiver) return { message: "Receiver does not exist " };
  await prisma.$transaction(async (txn) => {
    await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(userId)} FOR UPDATE`;
    const fromBalance = await txn.balance.findUnique({
      where: {
        userId: Number(userId),
      },
    });
    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error("Insufficient Balance");
    }
    await txn.balance.update({
      where: {
        userId: Number(userId),
      },
      data: {
        amount: {
          decrement: amount,
        },
      },
    });
    await txn.balance.update({
      where: {
        userId: receiver.id,
      },
      data: {
        amount: {
          increment: amount,
        },
      },
    });
  });
  return {
    message: "Success",
  };
}
