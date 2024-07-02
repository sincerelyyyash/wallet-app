import { SendCard } from "../../../components/SendMoneyCard"
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";


async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id)
    }
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0
  }
}

async function getP2pTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    }
  });
  return txns.map(t => ({
    time: t.timestamp,
    amount: t.amount,
  }))
}
export default async function() {
  const balance = await getBalance();
  const transactions = await getP2pTransactions();


  return <div className="w-screen">
    <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
      Send Money
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 p-4">
      <div>
        <SendCard />
      </div>
      <div>
        <div className="pb-4">
          <OnRampTransactions transactions={transactions} />
        </div>
        <BalanceCard amount={balance.amount} locked={balance.locked} />
      </div>
    </div>
  </div>
}

