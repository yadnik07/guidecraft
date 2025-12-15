import React, { useEffect, useState } from "react"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"

/* ---------- AUTH HOOK ---------- */
function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    const auth = localStorage.getItem("auth")
    const name = localStorage.getItem("user")
    if (auth === "true" && name) {
      setIsLoggedIn(true)
      setUser(name)
    }
  }, [])

  const login = (name: string) => {
    localStorage.setItem("auth", "true")
    localStorage.setItem("user", name)
    setIsLoggedIn(true)
    setUser(name)
  }

  const logout = () => {
    localStorage.removeItem("auth")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUser(null)
  }

  return { isLoggedIn, user, login, logout }
}

/* ---------- PROTECTED ROUTE ---------- */
function Protected({ children }: { children: React.ReactNode }) {
  const auth = localStorage.getItem("auth")
  return auth === "true" ? <>{children}</> : <Navigate to="/login" />
}

/* ---------- LOGIN / SIGNUP ---------- */
function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [name, setName] = useState("")

  const handleLogin = () => {
    if (!name.trim()) return
    login(name)
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="bg-white/10 p-8 rounded-xl w-80">
        <h1 className="text-2xl font-bold mb-4">Login / Signup</h1>

        <input
          placeholder="Enter your name"
          className="w-full p-3 mb-4 bg-black/40 rounded outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 py-2 rounded font-semibold"
        >
          Continue
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
    <div className="min-h-screen bg-black text-white">
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

      <main className="flex flex-col items-center mt-32 text-center">
        <h2 className="text-4xl font-bold mb-10">
          Turn recordings into <br />
          <span className="text-indigo-400">step-by-step guides</span>
        </h2>

        <div className="bg-white/10 p-8 rounded-xl w-96">
          {!loading ? (
            <>
              <input
                type="file"
                className="mb-6"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />

              <button
                onClick={generate}
                disabled={!file}
                className="w-full bg-indigo-600 py-3 rounded disabled:opacity-50"
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
    <div className="min-h-screen bg-black text-white p-8">
      <button
        onClick={() => navigate("/")}
        className="text-indigo-400 mb-6"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Generated Guide</h1>

      {["Open app", "Click settings", "Save changes"].map((step, i) => (
        <div key={i} className="bg-white/10 p-6 mb-4 rounded">
          Step {i + 1}: {step}
        </div>
      ))}
    </div>
  )
}

/* ---------- ROUTES ---------- */
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Protected><Home /></Protected>} />
      <Route path="/preview" element={<Protected><Preview /></Protected>} />
    </Routes>
  )
}
