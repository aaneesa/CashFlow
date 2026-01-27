import React, { useState } from "react";
import { motion } from "framer-motion";

// Import Calculators (Ensure these are converted to .tsx as well)
import SipCalculator from "../../components/calculators/SIPcalculator";
import EmiCalculator from "../../components/calculators/EMIcalculator";
import FdCalculator from "../../components/calculators/Fdcalculator";
import RdCalculator from "../../components/calculators/Rdcalculator";
import RetirementCalculator from "../../components/calculators/RetirementCalculator";
import InflationCalculator from "../../components/calculators/InflationCalculator";

// --- Interfaces ---

interface CalculatorItem {
  name: string;
  component: React.ReactNode; // or JSX.Element
}

const calculators: CalculatorItem[] = [
  { name: "SIP", component: <SipCalculator /> },
  { name: "EMI", component: <EmiCalculator /> },
  { name: "FD", component: <FdCalculator /> },
  { name: "RD", component: <RdCalculator /> },
  { name: "Retirement", component: <RetirementCalculator /> },
  { name: "Inflation", component: <InflationCalculator /> },
];

const Calculators: React.FC = () => {
  // Use number type for index tracking
  const [active, setActive] = useState<number>(0);

  return (
    <div className="min-h-screen relative font-poppins pb-30">
      {/* Background Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #ffffffff 0%, #FFFFFF 100%)",
        }}
      />

      <div className="relative z-10 pt-28 max-w-5xl mx-auto px-6">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-center mb-6"
        >
          FINANCE{" "}
          <span className="bg-linear-to-r from-[#0bdd70] to-[#1c4237] bg-clip-text text-transparent flex justify-center">
            CALCULATORS
          </span>
        </motion.h1>
        
        <p className="text-center text-[#2F3E46] mb-12 max-w-2xl mx-auto">
          Explore easy-to-use tools for savings, loans, retirement and more.
          Choose a calculator below and start planning smarter!
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {calculators.map((calc, idx) => (
            <button
              key={calc.name} 
              onClick={() => setActive(idx)}
              className={`px-5 py-2 rounded-2xl font-medium transition-all duration-300
                ${
                  active === idx
                    ? "bg-[#00FF7C] text-[#09332C] shadow-lg shadow-[#00FF7C]/30 scale-105"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {calc.name}
            </button>
          ))}
        </div>

        {/* Active Calculator Card */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl"
        >
          {/* Safe access with fallback */}
          {calculators[active]?.component || <div>Calculator not found</div>}
        </motion.div>
      </div>
    </div>
  );
};

export default Calculators;