import express from "express";
import db from "@repo/db/client";
const app = express();

app.post("/hdfcwebhook", async (req, res) => {
  console.log(req.body);
  const paymentInfo: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  console.log("Entered the webhook baby");
  try {
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInfo.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInfo.amount),
          },
        },
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInfo.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.json({ mesage: "Captured" });
  } catch (error) {
    res.status(411).json({ message: "Error while processing webhook" });
  }
});

app.listen("8080", () => console.log("Server is Running at a Port 8080"));
