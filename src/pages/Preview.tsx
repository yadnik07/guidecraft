export default function Preview() {
  const steps = [
    "Open the dashboard",
    "Click on Upload Recording",
    "Select your video file",
    "System analyzes the recording",
    "Guide is generated automatically",
  ];

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">
        Generated Guide Preview
      </h1>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-zinc-900 p-4 rounded-lg border border-zinc-800"
          >
            <span className="text-indigo-400 font-semibold">
              Step {index + 1}
            </span>
            <p className="mt-1 text-gray-300">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
