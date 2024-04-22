"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function createonRampTransaction(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  if (!session || !userId) {
    return {
      message: "User Not Logged In",
    };
  }
  const token = Math.floor(Math.random() * 100000).toString();
  await prisma.onRampTransaction.create({
    data: {
      status: "Pending",
      provider,
      amount,
      userId: Number(userId),
      startTime: new Date(),
      token: token,
    },
  });
  return {
    message: "On Ramp Transaction added",
  };
}
