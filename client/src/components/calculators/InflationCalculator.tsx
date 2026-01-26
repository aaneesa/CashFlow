import React, { useState } from "react";

const InflationCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(100000);
  const [rate, setRate] = useState<number>(6);
  const [years, setYears] = useState<number>(10);
  const [futureValue, setFutureValue] = useState<string | null>(null);

  const calculate = (): void => {
    const value = amount / Math.pow(1 + rate / 100, years);
    setFutureValue(value.toLocaleString("en-IN", { maximumFractionDigits: 0 }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold bg-linear-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">Inflation Calculator</h2>
      <div className="grid gap-4">
        <label className="block text-sm font-medium">Today's Amount (₹)
          <input type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} className="w-full border rounded-xl px-3 py-2 mt-1" />
        </label>
        <label className="block text-sm font-medium">Avg. Inflation Rate (%)
          <input type="number" value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full border rounded-xl px-3 py-2 mt-1" />
        </label>
        <label className="block text-sm font-medium">Years
          <input type="number" value={years} onChange={(e) => setYears(+e.target.value)} className="w-full border rounded-xl px-3 py-2 mt-1" />
        </label>
      </div>
      <button onClick={calculate} className="w-full bg-[#00FF7C] text-[#09332C] font-bold py-3 rounded-2xl">Calculate Purchasing Power</button>
      {futureValue && (
        <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
          <p className="text-orange-900">Future Purchasing Power: <span className="font-bold text-lg">₹ {futureValue}</span></p>
          <p className="text-xs mt-2 text-orange-700">This amount in {years} years will buy what ₹{amount.toLocaleString()} buys today.</p>
        </div>
      )}
    </div>
  );
};

export default InflationCalculator;