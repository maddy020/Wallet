"use client";
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/text-input";
import { useState } from "react";
import { Center } from "@repo/ui/center";
import { Card } from "@repo/ui/card";
import p2ptransfer from "../app/lib/actions/p2ptransfer";
export default function SendMoneyCard() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send Money">
          <div className="min-w-72 pt-2">
            <TextInput
              label="Phone Number"
              placeholder="999XXXX999"
              onChange={(value) => setPhone(value)}
            />
            <TextInput
              label="Amount"
              placeholder="Rs. 0"
              onChange={(value) => setAmount(value)}
            />
            <div className="pt-4 flex justify-center">
              <Button
                onClick={async () => {
                  await p2ptransfer(phone, Number(amount) * 100);
                }}
              >
                <span>Send Money</span>
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}
