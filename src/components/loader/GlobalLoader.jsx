import Loader from "./Loader";

const GlobalLoader = ({ fullScreen = false, size = "medium" }) => {
  return (
    <div
      className={`flex items-center justify-center w-full ${
        fullScreen ? "h-screen" : "h-full"
      }`}
    >
      <Loader size={size} />
    </div>
  );
};

export default GlobalLoader;