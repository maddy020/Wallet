import { getServerSession } from "next-auth";
import client from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import AddMoneyCard from "../../../components/AddMoneyCard";
import OnRampTransactions from "../../../components/OnRampTransactions";
import BalanceCard from "../../../components/BalanceCard";
async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await client.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await client.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

export default async function Transfer() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();
  return (
    <>
      <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
          Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
          <div>
            <AddMoneyCard />
          </div>
          <div>
            <BalanceCard amount={balance.amount} locked={balance.locked} />
            <div className="pt-4">
              <OnRampTransactions transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
