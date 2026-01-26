import React, { useState } from "react";

const SipCalculator: React.FC = () => {
  // Define explicit types for state
  const [monthly, setMonthly] = useState<number>(1000);
  const [rate, setRate] = useState<number>(12);
  const [years, setYears] = useState<number>(10);
  const [future, setFuture] = useState<string | null>(null);

  // Type-safe calculation function
  const calculate = (): void => {
    if (monthly <= 0 || rate <= 0 || years <= 0) return;

    const months: number = years * 12;
    const i: number = rate / 12 / 100; // Monthly interest rate
    
    // SIP Formula: M = P × ({[1 + i]^n – 1} / i) × (1 + i)
    const total: number = monthly * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
    
    // Format to Indian Currency string
    setFuture(total.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }));
  };

  // Reusable Input Handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const val = parseFloat(e.target.value);
    setter(isNaN(val) ? 0 : val);
  };

  return (
    <div className="w-full">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-2 bg-linear-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
        SIP Calculator
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Estimate the future value of your monthly SIP investments.
      </p>

      {/* Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-[#2F3E46]">
            Monthly Investment (₹)
          </label>
          <input
            type="number"
            value={monthly || ""}
            onChange={(e) => handleInputChange(e, setMonthly)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#00FF7C] outline-none transition"
            placeholder="e.g. 5000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-[#2F3E46]">
            Expected Return (% per year)
          </label>
          <input
            type="number"
            value={rate || ""}
            onChange={(e) => handleInputChange(e, setRate)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#00FF7C] outline-none transition"
            placeholder="e.g. 12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-[#2F3E46]">
            Time Period (Years)
          </label>
          <input
            type="number"
            value={years || ""}
            onChange={(e) => handleInputChange(e, setYears)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#00FF7C] outline-none transition"
            placeholder="e.g. 10"
          />
        </div>

        {/* Button */}
        <button
          onClick={calculate}
          className="w-full bg-[#00FF7C] text-[#09332C] font-bold py-3 rounded-2xl hover:bg-[#00e671] active:scale-[0.98] shadow-lg shadow-[#00FF7C]/20 transition-all"
        >
          Calculate Wealth
        </button>

        {/* Result Area */}
        {future && (
          <div className="mt-6 p-5 rounded-2xl bg-[#F0FFF7] border border-[#00FF7C]/30 shadow-inner">
            <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">
              Estimated Future Value
            </p>
            <p className="text-2xl font-black text-[#007755]">
              ₹ {future}
            </p>
            <p className="text-[10px] text-gray-400 mt-2 italic">
              *Wealth creation is subject to market risks.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SipCalculator;