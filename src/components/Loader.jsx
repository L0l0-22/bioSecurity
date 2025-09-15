import Lottie from "lottie-react";
import horseLoader from "../assets/horse-loader.json";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/70">
      <Lottie animationData={horseLoader} loop={true} className="w-72 h-72" />
      <p className="mt-4 text-gray-700 font-semibold">Loading...</p>
    </div>
  );
}
