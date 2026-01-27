import React from "react";

interface InputProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, value, onChange }) => {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[#1d2b28]">
        {label}
      </span>
      <input
        type="number"
        value={value}
        onChange={onChange}
        className="w-full mt-1 px-4 py-3 rounded-xl
                   bg-white text-[#1d2b28]
                   border border-[#00FF7C]/30
                   focus:ring-2 focus:ring-[#00FF7C]
                   outline-none transition"
      />
    </label>
  );
};

export default Input;
