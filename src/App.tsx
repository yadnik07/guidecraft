import { useState } from "react"

function App() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  const handleGenerate = () => {
    if (!fileName) return
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setShowPreview(true)
    }, 3000)
  }

  // -------- PREVIEW PAGE --------
  if (showPreview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white px-10 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold">
            Guide<span className="text-indigo-400">Craft</span>
          </h1>
          <button
            onClick={() => {
              setShowPreview(false)
              setFileName(null)
            }}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            ← Back
          </button>
        </header>

        {/* Preview Content */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-2">
            Generated Guide
          </h2>
          <p className="text-gray-400 mb-8">
            From recording: <span className="text-indigo-400">{fileName}</span>
          </p>

          {/* Steps */}
          <div className="space-y-6">
            {[
              "Open the application dashboard",
              "Navigate to the settings panel",
              "Enable the required feature",
              "Save changes and verify output",
            ].map((step, index) => (
              <div
                key={index}
                className="rounded-xl bg-white/10 border border-white/10 p-6"
              >
                <h3 className="text-xl font-semibold mb-2">
                  Step {index + 1}
                </h3>
                <p className="text-gray-300">{step}</p>
                <div className="mt-4 h-40 rounded-lg bg-black/40 flex items-center justify-center text-gray-500">
                  Screenshot preview
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // -------- HOME PAGE --------
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white">
      {/* Navbar */}
      <header className="flex items-center justify-between px-10 py-6">
        <h1 className="text-2xl font-bold">
          Guide<span className="text-indigo-400">Craft</span>
        </h1>
        <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition">
          Sign In
        </button>
      </header>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center text-center mt-32 px-4">
        <h2 className="text-5xl font-extrabold leading-tight text-white/90">
          Turn recordings into <br />
          <span className="text-indigo-400">step-by-step guides</span>
        </h2>

        <p className="mt-6 max-w-xl text-gray-400 text-lg">
          Create beautiful product guides automatically from your screen
          recordings.
        </p>

        {/* Upload Card */}
        <div className="mt-12 w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-8">
          <p className="mb-4 text-gray-300">Upload a screen recording</p>

          {!loading && (
            <>
              <label
                htmlFor="upload"
                className="block border-2 border-dashed border-white/20 rounded-xl p-8
                text-gray-400 hover:border-indigo-400 hover:bg-white/5 transition cursor-pointer"
              >
                {fileName ? fileName : "Click or drag file here"}
              </label>

              <input
                id="upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="h-12 w-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
              <p className="mt-4 text-gray-300">
                Processing recording…
              </p>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !fileName}
            className="mt-6 w-full py-3 rounded-xl bg-indigo-600
            hover:bg-indigo-500 transition font-semibold disabled:opacity-50"
          >
            {loading ? "Generating…" : "Generate Guide"}
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
