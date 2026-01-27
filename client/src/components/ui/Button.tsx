import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 rounded-2xl font-bold
                 bg-linear-to-r from-[#00FF7C] to-[#00C06A]
                 text-[#09332C]
                 hover:opacity-90
                 active:scale-[0.98]
                 shadow-lg shadow-[#00FF7C]/25
                 transition-all"
    >
      {children}
    </button>
  );
};

export default Button;
