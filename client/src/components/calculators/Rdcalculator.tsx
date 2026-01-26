import React, { useState } from "react";

const RdCalculator: React.FC = () => {
  // Define explicit types for state
  const [monthly, setMonthly] = useState<number>(2000);
  const [rate, setRate] = useState<number>(7);
  const [years, setYears] = useState<number>(5);
  const [maturity, setMaturity] = useState<string | null>(null);

  /**
   * Formula for RD Maturity:
   * M = P * [(1 + i)^n - 1] / (1 - (1 + i)^-1/3) [Approximate]
   * Using the standard bank monthly compounding formula:
   * M = R * ((1+i)^n - 1) / i * (1+i)
   */
  const calculate = (): void => {
    if (monthly <= 0 || rate <= 0 || years <= 0) return;

    const n: number = years * 12; // Total months
    const i: number = rate / 100 / 12; // Monthly interest rate
    
    const maturityValue: number =
      monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);

    // Formatted result for professional display
    setMaturity(
      new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(maturityValue)
    );
  };

  // Type-safe change handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const val = parseFloat(e.target.value);
    setter(isNaN(val) ? 0 : val);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-2 bg-linear-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
        RD Calculator
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Calculate the maturity amount of your Recurring Deposit.
      </p>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-[#2F3E46]">
            Monthly Deposit (₹)
          </label>
          <input
            type="number"
            value={monthly || ""}
            onChange={(e) => handleInputChange(e, setMonthly)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#00FF7C] outline-none transition"
            placeholder="e.g. 2000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-[#2F3E46]">
            Interest Rate (% per year)
          </label>
          <input
            type="number"
            value={rate || ""}
            onChange={(e) => handleInputChange(e, setRate)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#00FF7C] outline-none transition"
            placeholder="e.g. 7"
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
            placeholder="e.g. 5"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={calculate}
          className="w-full bg-[#00FF7C] text-[#09332C] font-bold py-3 rounded-2xl hover:bg-[#00e671] active:scale-[0.98] shadow-lg shadow-[#00FF7C]/20 transition-all"
        >
          Calculate RD
        </button>

        {/* Results Area */}
        {maturity && (
          <div className="mt-6 p-5 rounded-2xl bg-[#F0FFF7] border border-[#00FF7C]/30 shadow-inner">
            <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">
              Estimated Maturity Value
            </p>
            <p className="text-2xl font-black text-[#007755]">
              ₹ {maturity}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RdCalculator;