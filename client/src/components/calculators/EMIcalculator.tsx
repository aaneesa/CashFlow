import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const EmiCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(5);
  const [emi, setEmi] = useState<string | null>(null);

  const calculate = () => {
    const months = years * 12;
    const monthlyRate = rate / 12 / 100;

    const emiValue =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    setEmi(
      emiValue.toLocaleString("en-IN", { maximumFractionDigits: 2 })
    );
  };

  return (
    <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md
                    border border-[#00FF7C]/20 rounded-3xl
                    p-8 shadow-xl">
      <h2 className="text-2xl font-bold
                     bg-linear-to-r from-[#00FF7C] to-[#007755]
                     bg-clip-text text-transparent mb-1">
        EMI Calculator
      </h2>

      <p className="text-sm text-[#5f7f73] mb-6">
        Calculate your monthly loan EMI instantly.
      </p>

      <div className="grid gap-5">
        <Input
          label="Loan Amount (₹)"
          value={principal}
          onChange={(e) => setPrincipal(+e.target.value)}
        />

        <Input
          label="Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(+e.target.value)}
        />

        <Input
          label="Tenure (Years)"
          value={years}
          onChange={(e) => setYears(+e.target.value)}
        />
      </div>

      <div className="mt-6">
        <Button onClick={calculate}>Calculate EMI</Button>
      </div>

      {emi && (
        <div className="mt-6 p-5 rounded-2xl bg-[#F0FFF7]
                        border border-[#00FF7C]/30">
          <p className="text-xs uppercase text-[#5f7f73]">
            Monthly EMI
          </p>
          <p className="text-2xl font-black text-[#007755]">
            ₹ {emi}
          </p>
        </div>
      )}
    </div>
  );
};

export default EmiCalculator;
