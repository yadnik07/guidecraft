import { useState, useEffect } from "react"
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom"

/* ---------------- AUTH STATE (MOCK) ---------------- */
function isLoggedIn() {
  return localStorage.getItem("auth") === "true"
}

/* ---------------- LOGIN PAGE ---------------- */
function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (!email || !password) return
    localStorage.setItem("auth", "true")

    // after login, go back to home (generate again)
    navigate("/", { replace: true })
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
      <div className="w-full max-w-sm bg-white/5 p-8 rounded-2xl border border-white/10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Please Login First
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-black/40 border border-white/10"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded bg-black/40 border border-white/10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-indigo-600 rounded-xl font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  )
}

/* ---------------- HOME (PUBLIC) ---------------- */
function Home() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const generate = () => {
    // 🔑 check login first
    if (!isLoggedIn()) {
      navigate("/login")
      return
    }

    // fake processing
    setLoading(true)
    setTimeout(() => {
      navigate("/preview")
    }, 2000)
  }

  const logout = () => {
    localStorage.removeItem("auth")
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white">
      <header className="flex justify-between px-10 py-6">
        <h1 className="text-2xl font-bold">
          Guide<span className="text-indigo-400">Craft</span>
        </h1>

        {isLoggedIn() && (
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500/80 rounded-lg"
          >
            Logout
          </button>
        )}
      </header>

      <main className="flex flex-col items-center mt-32 text-center">
        <h2 className="text-5xl font-extrabold">
          Turn recordings into <br />
          <span className="text-indigo-400">step-by-step guides</span>
        </h2>

        <div className="mt-12 bg-white/10 p-8 rounded-2xl w-[380px]">
          {!loading ? (
            <>
              <div className="border-2 border-dashed p-8 rounded-xl text-gray-400 mb-6">
                Upload recording (mock)
              </div>

              <button
                onClick={generate}
                className="w-full py-3 bg-indigo-600 rounded-xl font-semibold hover:bg-indigo-500"
              >
                Generate Guide
              </button>
            </>
          ) : (
            <div className="py-10">
              <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4">Processing…</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

/* ---------------- PREVIEW (PROTECTED) ---------------- */
function Preview() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login", { replace: true })
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-10 py-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-indigo-400"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-8">
        Generated Guide
      </h1>

      {["Open app", "Click settings", "Save changes"].map((s, i) => (
        <div
          key={i}
          className="mb-6 p-6 bg-white/5 rounded-xl"
        >
          <h2 className="text-xl font-semibold">
            Step {i + 1}: {s}
          </h2>
          <div className="mt-3 h-40 bg-black/40 rounded-lg flex items-center justify-center">
            Screenshot
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---------------- ROUTES ---------------- */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/preview" element={<Preview />} />
    </Routes>
  )
}
