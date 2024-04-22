"use client";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/text-input";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import createonRampTransaction from "../app/lib/actions/onRampTxn";
const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];
export default function AddMoneyCard(): JSX.Element {
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl || ""
  );
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  return (
    <Card title="Add Money">
      <div>
        <TextInput
          label="Amount"
          placeholder="Amount"
          onChange={(value) => {
            setAmount(Number(value));
          }}
        />
        <div>Bank</div>
        <Select
          onSelect={(value) => {
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl
            );
          }}
          options={SUPPORTED_BANKS.map((c) => ({
            key: c.name,
            value: c.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              await createonRampTransaction(amount * 100, provider);
              window.location.href = redirectUrl || "";
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
}
