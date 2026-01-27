import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const InflationCalculator: React.FC = () => {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);
  const [value, setValue] = useState<string | null>(null);

  const calculate = () => {
    const result = amount / Math.pow(1 + rate / 100, years);
    setValue(result.toLocaleString("en-IN", { maximumFractionDigits: 0 }));
  };

  return (
    <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md
                    border border-[#00FF7C]/20 rounded-3xl
                    p-8 shadow-xl">
      <h2 className="text-2xl font-bold bg-linear-to-r from-[#00FF7C] to-[#007755]
                     bg-clip-text text-transparent mb-1">
        Inflation Calculator
      </h2>

      <p className="text-sm text-[#5f7f73] mb-6">
        Understand the impact of inflation on your money.
      </p>

      <div className="grid gap-5">
        <Input label="Today's Amount (₹)" value={amount}
               onChange={(e) => setAmount(+e.target.value)} />

        <Input label="Inflation Rate (% p.a.)" value={rate}
               onChange={(e) => setRate(+e.target.value)} />

        <Input label="Years" value={years}
               onChange={(e) => setYears(+e.target.value)} />
      </div>

      <div className="mt-6">
        <Button onClick={calculate}>Calculate Value</Button>
      </div>

      {value && (
        <div className="mt-6 p-5 rounded-2xl bg-[#F0FFF7]
                        border border-[#00FF7C]/30">
          <p className="text-xs uppercase text-[#5f7f73]">
            Future Purchasing Power
          </p>
          <p className="text-2xl font-black text-[#007755]">
            ₹ {value}
          </p>
        </div>
      )}
    </div>
  );
};

export default InflationCalculator;
