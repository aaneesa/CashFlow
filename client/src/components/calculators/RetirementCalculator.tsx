import React, { useState } from "react";

const RetirementCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState<number>(25);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [monthlyExpense, setMonthlyExpense] = useState<number>(30000);
  const [inflation,] = useState<number>(6);
  const [corpus, setCorpus] = useState<string | null>(null);

  const calculate = (): void => {
    const yearsToRetire = retirementAge - currentAge;
    const futureExpense = monthlyExpense * Math.pow(1 + inflation / 100, yearsToRetire);
    // Assumes withdrawal rate of 5% (20x annual expense)
    const requiredCorpus = futureExpense * 12 * 20;
    setCorpus(requiredCorpus.toLocaleString("en-IN", { maximumFractionDigits: 0 }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold bg-linear-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">Retirement Plan</h2>
      <div className="grid grid-cols-2 gap-4">
        <label className="block text-sm font-medium">Current Age <input type="number" value={currentAge} onChange={(e) => setCurrentAge(+e.target.value)} className="w-full border rounded-xl px-3 py-2 mt-1" /></label>
        <label className="block text-sm font-medium">Retirement Age <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(+e.target.value)} className="w-full border rounded-xl px-3 py-2 mt-1" /></label>
      </div>
      <label className="block text-sm font-medium">Current Monthly Expenses (₹)
        <input type="number" value={monthlyExpense} onChange={(e) => setMonthlyExpense(+e.target.value)} className="w-full border rounded-xl px-3 py-2 mt-1" />
      </label>
      <button onClick={calculate} className="w-full bg-[#00FF7C] text-[#09332C] font-bold py-3 rounded-2xl shadow-md">Calculate Goal</button>
      {corpus && (
        <div className="p-4 rounded-xl bg-[#F0FFF7] border border-[#00FF7C]/40">
          <p className="text-[#09332C]">Required Retirement Corpus: <br /><span className="font-bold text-2xl text-[#007755]">₹ {corpus}</span></p>
        </div>
      )}
    </div>
  );
};

export default RetirementCalculator;