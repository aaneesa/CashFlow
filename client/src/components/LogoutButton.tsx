import React from "react";


interface LogoutButtonProps {
  className?: string; 
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {
  const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <button
      onClick={logout}
      className={`bg-red-400 text-white px-4 py-2 rounded ${className || ""}`}
    >
      Logout
    </button>
  );
};

export default LogoutButton;