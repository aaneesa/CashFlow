import React, { useState } from "react";

const EmiCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(500000);
  const [rate, setRate] = useState<number>(10);
  const [years, setYears] = useState<number>(5);
  const [emi, setEmi] = useState<string | null>(null);

  const calculate = (): void => {
    const months = years * 12;
    const monthlyRate = rate / 12 / 100;
    const emiValue =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    setEmi(emiValue.toLocaleString("en-IN", { maximumFractionDigits: 2 }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold bg-linear-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">EMI Calculator</h2>
      <div className="grid gap-4">
        <label className="block text-sm font-medium">Loan Amount (₹)
          <input type="number" value={principal} onChange={(e) => setPrincipal(+e.target.value)} className="w-full border rounded-xl px-3 py-2 mt-1 focus:ring-2 focus:ring-[#00FF7C] outline-none" />
        </label>
        <label className="block text-sm font-medium">Interest Rate (%)
          <input type="number" value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full border rounded-xl px-3 py-2 mt-1 focus:ring-2 focus:ring-[#00FF7C] outline-none" />
        </label>
        <label className="block text-sm font-medium">Tenure (Years)
          <input type="number" value={years} onChange={(e) => setYears(+e.target.value)} className="w-full border rounded-xl px-3 py-2 mt-1 focus:ring-2 focus:ring-[#00FF7C] outline-none" />
        </label>
      </div>
      <button onClick={calculate} className="w-full bg-[#00FF7C] text-[#09332C] font-bold py-3 rounded-2xl hover:opacity-90 transition shadow-md">Calculate EMI</button>
      {emi && (
        <div className="p-4 rounded-xl bg-[#F0FFF7] border border-[#00FF7C]/40">
          <p className="text-[#09332C]">Monthly EMI: <span className="font-bold text-lg text-[#007755]">₹ {emi}</span></p>
        </div>
      )}
    </div>
  );
};

export default EmiCalculator;