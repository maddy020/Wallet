"use client";

import { useBalance } from "@repo/store/balance";

export default function () {
  const balance = useBalance();
  return (
    <div>
      hi there {balance}
      <p>kjsnvjfnj</p>
    </div>
  );
}
