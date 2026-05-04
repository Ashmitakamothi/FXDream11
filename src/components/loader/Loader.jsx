import { Spin } from "antd";

const Loader = ({ size = "large" }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Spin size={size} />
      <p
        className={`font-medium text-gray ${
          size === "large" ? "text-lg" : "text-base"
        }`}
      >
        Loading...
      </p>
    </div>
  );
};

export default Loader;
