import { useState } from "react"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"

/* ---------- PROTECTED ROUTE ---------- */
function Protected({ children }: { children: JSX.Element }) {
  const isLoggedIn = localStorage.getItem("auth") === "true"
  return isLoggedIn ? children : <Navigate to="/login" />
}

/* ---------- LOGIN PAGE ---------- */
function Login() {
  const navigate = useNavigate()
  const [name, setName] = useState("")

  const handleLogin = () => {
    if (!name.trim()) return
    localStorage.setItem("auth", "true")
    localStorage.setItem("user", name)
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="bg-white/10 p-8 rounded-xl w-80">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          type="text"
          placeholder="Your name"
          className="w-full p-3 mb-4 bg-black/40 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 py-3 rounded font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  )
}

/* ---------- HOME ---------- */
function Home() {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const user = localStorage.getItem("user")

  const logout = () => {
    localStorage.clear()
    navigate("/login")
  }

  const generate = () => {
    if (!file) return
    setLoading(true)
    setTimeout(() => navigate("/preview"), 2000)
  }

  return (
    <div className="min-h-screen text-white">
      <header className="flex justify-between items-center px-8 py-6">
        <div>
          <h1 className="text-xl font-bold">GuideCraft</h1>
          <p className="text-sm text-gray-400">Logged in as {user}</p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      <main className="flex flex-col items-center mt-32">
        <h2 className="text-4xl font-bold text-center mb-10">
          Turn recordings into <br />
          <span className="text-indigo-400">step-by-step guides</span>
        </h2>

        <div className="bg-white/10 p-8 rounded-xl">
          {!loading ? (
            <>
              <input
                type="file"
                onChange={(e) =>
                  setFile(e.target.files?.[0] || null)
                }
              />

              <button
                onClick={generate}
                disabled={!file}
                className="block w-full mt-6 bg-indigo-600 py-3 rounded disabled:opacity-50"
              >
                Generate Guide
              </button>
            </>
          ) : (
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4">Processing…</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

/* ---------- PREVIEW ---------- */
function Preview() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen text-white p-8">
      <button
        onClick={() => navigate("/")}
        className="text-indigo-400 mb-6"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">
        Generated Guide
      </h1>

      {["Open app", "Click settings", "Save changes"].map(
        (step, i) => (
          <div
            key={i}
            className="bg-white/10 p-6 mb-4 rounded"
          >
            Step {i + 1}: {step}
          </div>
        )
      )}
    </div>
  )
}

/* ---------- ROUTES ---------- */
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <Protected>
            <Home />
          </Protected>
        }
      />
      <Route
        path="/preview"
        element={
          <Protected>
            <Preview />
          </Protected>
        }
      />
    </Routes>
  )
}
