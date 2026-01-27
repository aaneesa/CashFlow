import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const RetirementCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState(25);
  const [retirementAge, setRetirementAge] = useState(60);
  const [expense, setExpense] = useState(30000);
  const [corpus, setCorpus] = useState<string | null>(null);

  const calculate = () => {
    const years = retirementAge - currentAge;
    const futureExpense = expense * Math.pow(1.06, years);
    const total = futureExpense * 12 * 20;

    setCorpus(total.toLocaleString("en-IN", { maximumFractionDigits: 0 }));
  };

  return (
    <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md
                    border border-[#00FF7C]/20 rounded-3xl
                    p-8 shadow-xl">
      <h2 className="text-2xl font-bold bg-linear-to-r from-[#00FF7C] to-[#007755]
                     bg-clip-text text-transparent mb-1">
        Retirement Planner
      </h2>

      <p className="text-sm text-[#5f7f73] mb-6">
        Estimate the retirement corpus you need.
      </p>

      <div className="grid gap-5">
        <Input label="Current Age" value={currentAge}
               onChange={(e) => setCurrentAge(+e.target.value)} />

        <Input label="Retirement Age" value={retirementAge}
               onChange={(e) => setRetirementAge(+e.target.value)} />

        <Input label="Monthly Expense (₹)" value={expense}
               onChange={(e) => setExpense(+e.target.value)} />
      </div>

      <div className="mt-6">
        <Button onClick={calculate}>Calculate Corpus</Button>
      </div>

      {corpus && (
        <div className="mt-6 p-5 rounded-2xl bg-[#F0FFF7]
                        border border-[#00FF7C]/30">
          <p className="text-xs uppercase text-[#5f7f73]">
            Required Corpus
          </p>
          <p className="text-2xl font-black text-[#007755]">
            ₹ {corpus}
          </p>
        </div>
      )}
    </div>
  );
};

export default RetirementCalculator;
