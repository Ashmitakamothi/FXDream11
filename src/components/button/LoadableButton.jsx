import React from "react";
import { Spin } from "antd";

const LoadableButton = ({
  lable,
  htmlType = "button",
  isLoading = false,
  loadingLable = "Loading...",
  className = "",
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <button 
      type={htmlType} 
      onClick={onClick} 
      disabled={disabled || isLoading} 
      className={`${className} ${isLoading || disabled ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      <div className="flex items-center justify-center gap-2">
        {children ? children : <strong className="text-inherit">{lable}</strong>}
        {isLoading && <Spin size="small" className="ml-2" />}
      </div>
    </button>
  );
};

export default LoadableButton;
