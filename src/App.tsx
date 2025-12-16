import { useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"


const isLoggedIn = () => localStorage.getItem("auth") === "true"
const getUser = () => localStorage.getItem("currentUser")


function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = () => {
    if (!email || !password) return
    localStorage.setItem("auth", "true")
    localStorage.setItem("currentUser", email)
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="bg-white/10 p-8 rounded-xl w-80">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <input
          className="w-full p-3 mb-3 bg-black/40 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 bg-black/40 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-indigo-600 py-2 rounded"
        >
          Login
        </button>

        <p
          className="text-sm text-indigo-400 text-center mt-4 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          New user? Sign up
        </p>
      </div>
    </div>
  )
}


function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signup = () => {
    if (!email || !password) return
    localStorage.setItem("auth", "true")
    localStorage.setItem("currentUser", email)
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="bg-white/10 p-8 rounded-xl w-80">
        <h1 className="text-2xl font-bold mb-4">Signup</h1>

        <input
          className="w-full p-3 mb-3 bg-black/40 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 bg-black/40 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={signup}
          className="w-full bg-indigo-600 py-2 rounded"
        >
          Create Account
        </button>
      </div>
    </div>
  )
}


function Home() {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  
  const [user, setUser] = useState<string | null>(getUser())

  const logout = () => {
    localStorage.removeItem("auth")
    localStorage.removeItem("currentUser")
    setUser(null)           
    navigate("/")
  }

  const generate = () => {
    if (!isLoggedIn()) {
      navigate("/login")
      return
    }

    if (!file) return

    localStorage.setItem("videoUrl", URL.createObjectURL(file))
    setLoading(true)

    setTimeout(() => navigate("/preview"), 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex justify-between px-10 py-6">
        <h1 className="text-xl font-bold">GuideCraft</h1>

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <span className="text-sm text-white/60">{user}</span>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-indigo-600 px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      </header>

      <main className="flex flex-col items-center mt-32 text-center">
        <h2 className="text-5xl font-bold">
          Turn recordings into <br />
          <span className="text-indigo-400">step-by-step guides</span>
        </h2>

        <div className="mt-12 bg-white/10 p-8 rounded-xl w-96">
          {!loading ? (
            <>
              <label className="block border-2 border-dashed p-8 rounded cursor-pointer">
                {file ? file.name : "Upload screen recording"}
                <input
                  type="file"
                  accept="video/*"
                  hidden
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>

              <button
                onClick={generate}
                className="mt-6 w-full bg-indigo-600 py-3 rounded"
              >
                Generate Guide
              </button>
            </>
          ) : (
            <div className="py-10">
              <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="mt-4">Processing…</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}


function Preview() {
  const navigate = useNavigate()
  const video = localStorage.getItem("videoUrl")

  if (!isLoggedIn()) {
    navigate("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <button
        onClick={() => navigate("/")}
        className="text-indigo-400 mb-6"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-8">Generated Guide</h1>

      <video
        src={video || ""}
        controls
        className="w-full h-72 rounded-xl mb-10 bg-black"
      />

      {["Open app", "Click settings", "Save changes"].map((s, i) => (
        <div key={i} className="mb-8 bg-white/10 p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-3">
            Step {i + 1}: {s}
          </h2>

          <video
            src={video || ""}
            muted
            className="h-40 w-full rounded bg-black"
          />
        </div>
      ))}
    </div>
  )
}


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/preview" element={<Preview />} />
    </Routes>
  )
}
