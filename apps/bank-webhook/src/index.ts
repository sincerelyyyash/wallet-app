import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
  const paymentInformation: {
    token: string;
    userId: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
  };

  try {

    const transaction = await db.onRampTransaction.findFirst({
      where: {
        userId: Number(paymentInformation.userId),
        token: paymentInformation.token,
      },
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.status === "Success") {
      return res.status(200).json({ message: "Transaction already processed successfully" });
    }

    const { amount } = transaction;

    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId)
        },
        data: {
          amount: {
            increment: amount
          }
        }
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token
        },
        data: {
          status: "Success",
        }
      })
    ]);

    res.json({
      message: "Captured"
    })
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook"
    })
  }

})

app.listen(3003);
