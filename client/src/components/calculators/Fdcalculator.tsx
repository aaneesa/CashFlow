import { useState } from "react";

export default function FdCalculator() {
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(6);
  const [years, setYears] = useState<number>(5);
  const [maturity, setMaturity] = useState<string | null>(null);

  const calculate = () => {
    const maturityValue = principal * Math.pow(1 + rate / 100, years);
    setMaturity(maturityValue.toFixed(2));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 bg-linear-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
        FD Calculator
      </h2>
      <p className="text-sm text-gray-600 mb-6">Calculate maturity amount of your Fixed Deposit.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Principal Amount (₹)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#00FF7C]"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Interest Rate (% per year)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#00FF7C]"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Time Period (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#00FF7C]"
          />
        </div>
        <button
          onClick={calculate}
          className="w-full bg-[#00FF7C] text-[#09332C] font-semibold py-2 rounded-2xl hover:bg-[#00e671]"
        >
          Calculate FD
        </button>

        {maturity && (
          <div className="mt-4 p-4 rounded-xl bg-[#F0FFF7] border border-[#00FF7C]/40 shadow">
            <p className="font-medium text-[#09332C]">
              Maturity Value: <span className="font-bold text-lg text-[#007755]">₹ {maturity}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
