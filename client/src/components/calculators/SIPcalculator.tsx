import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const SipCalculator: React.FC = () => {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [future, setFuture] = useState<string | null>(null);

  const calculate = () => {
    const months = years * 12;
    const i = rate / 12 / 100;
    const value = monthly * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);

    setFuture(value.toLocaleString("en-IN", { maximumFractionDigits: 2 }));
  };

  return (
    <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md
                    border border-[#00FF7C]/20 rounded-3xl
                    p-8 shadow-xl">
      <h2 className="text-2xl font-bold bg-linear-to-r from-[#00FF7C] to-[#007755]
                     bg-clip-text text-transparent mb-1">
        SIP Calculator
      </h2>

      <p className="text-sm text-[#5f7f73] mb-6">
        Estimate the future value of your SIP investments.
      </p>

      <div className="grid gap-5">
        <Input label="Monthly Investment (₹)" value={monthly}
               onChange={(e) => setMonthly(+e.target.value)} />

        <Input label="Expected Return (% p.a.)" value={rate}
               onChange={(e) => setRate(+e.target.value)} />

        <Input label="Investment Period (Years)" value={years}
               onChange={(e) => setYears(+e.target.value)} />
      </div>

      <div className="mt-6">
        <Button onClick={calculate}>Calculate SIP</Button>
      </div>

      {future && (
        <div className="mt-6 p-5 rounded-2xl bg-[#F0FFF7]
                        border border-[#00FF7C]/30">
          <p className="text-xs uppercase text-[#5f7f73]">
            Estimated Wealth
          </p>
          <p className="text-2xl font-black text-[#007755]">
            ₹ {future}
          </p>
        </div>
      )}
    </div>
  );
};

export default SipCalculator;
