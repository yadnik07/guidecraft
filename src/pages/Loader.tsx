import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loader() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/preview");
    }, 3000); // 3 sec fake processing

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-indigo-500 mb-6"></div>
      <p className="text-lg font-medium">Processing your video…</p>
      <p className="text-gray-400 text-sm mt-2">
        Generating step-by-step guide
      </p>
    </div>
  );
}
