"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  return (
    <div className="flex items-center justify-center">
      <Center>
        <div className="w-full max-w-lg p-6 border-[#6a51a6]">
          <Card title="Send">
            <div className="min-w-72 pt-2">
              <TextInput
                placeholder="Number"
                label="Number"
                onChange={(value: string) => setNumber(value)}
              />
              <TextInput
                placeholder="Amount"
                label="Amount"
                onChange={(value: string) => setAmount(value)}
              />
              <div className="pt-4 flex justify-center">
                <Button
                  onClick={async () => {
                    await p2pTransfer(number, Number(amount) * 100);
                  }}
                >
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Center>
    </div>
  );
}

