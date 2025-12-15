import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleGenerate = () => {
    navigate("/loading");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-8 rounded-xl w-[380px] text-center">
        <h1 className="text-2xl font-bold mb-2">
          Turn recordings into <span className="text-indigo-400">step-by-step guides</span>
        </h1>

        <p className="text-gray-400 text-sm mb-6">
          Upload a screen recording to generate a guide
        </p>

        <div className="border border-dashed border-gray-600 rounded-lg p-6 mb-4 text-gray-400">
          Click or drag video file here
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-medium"
        >
          Generate Guide
        </button>
      </div>
    </div>
  );
}
