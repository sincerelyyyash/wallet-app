import express from "express";
import db from "@repo/db/client";
import { z } from "zod";


const app = express();

app.use(express.json())


const paymentInfoSchema = z.object({
  token: z.string(),
  user_identifier: z.string().transform((val) => Number(val)),
});


app.post("/hdfcWebhook", async (req, res) => {
  //TODO: HDFC bank should ideally send us a secret so we know this is sent by them

  const paymentInformation = paymentInfoSchema.parse(req.body);

  try {

    const transaction = await db.onRampTransaction.findFirst({
      where: {
        userId: paymentInformation.user_identifier,
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
          userId: paymentInformation.user_identifier
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

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
