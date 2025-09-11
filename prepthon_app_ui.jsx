import React, { useState } from "react";

// Prepthon - Single File React UI (Tailwind-ready)
// Usage: paste into a React app (e.g., Create React App / Vite) and ensure Tailwind CSS is installed.
// This file contains lightweight wireframe components for:
// - Login
// - Dashboard (Daily Challenge, Quiz of the Day, Progress, Leaderboard)
// - Quiz Page
// - AI Buddy (chat-like interface)
// - Profile Page
// Navigation is handled by a simple `route` state for clarity and portability.

export default function PrepthonApp() {
  const [route, setRoute] = useState("login");
  const [user, setUser] = useState({ name: "Rinki Sharma", xp: 420, streak: 5 });
  const [chat, setChat] = useState([
    { from: "bot", text: "Hi! I'm your Prepthon AI Buddy — how can I help today?" }
  ]);

  function login() {
    // placeholder login
    setRoute("dashboard");
  }

  function logout() {
    setRoute("login");
  }

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800">
      {route === "login" && <Login onLogin={login} />}
      {route !== "login" && (
        <div className="flex">
          <Sidebar user={user} onNavigate={setRoute} onLogout={logout} />
          <main className="flex-1 p-6">
            <Header onNavigate={setRoute} user={user} />
            <div className="mt-6">
              {route === "dashboard" && <Dashboard onNavigate={setRoute} user={user} />}
              {route === "quiz" && <QuizPage onBack={() => setRoute("dashboard")} />}
              {route === "ai" && <AIBuddy chat={chat} setChat={setChat} />}
              {route === "profile" && <ProfilePage user={user} setUser={setUser} />}
              {route === "leaderboard" && <Leaderboard onBack={() => setRoute("dashboard")} />}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

function Header({ onNavigate, user }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-slate-700">Prepthon</h1>
      <div className="flex items-center gap-4">
        <button
          className="px-3 py-2 bg-slate-100 rounded-md hover:bg-slate-200"
          onClick={() => onNavigate("ai")}
        >
          🤖 AI Buddy
        </button>
        <div className="text-right">
          <div className="text-sm">{user.name}</div>
          <div className="text-xs text-slate-500">XP {user.xp} • 🔥 {user.streak}-day streak</div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ user, onNavigate, onLogout }) {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <div className="mb-6">
        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">P</div>
        <div className="mt-3">
          <div className="font-medium">{user.name}</div>
          <div className="text-xs text-slate-500">{user.xp} XP • 🔥{user.streak}</div>
        </div>
      </div>
      <nav className="flex flex-col gap-2">
        <NavButton label="Home" onClick={() => onNavigate("dashboard")} />
        <NavButton label="Quizzes" onClick={() => onNavigate("quiz")} />
        <NavButton label="Daily Challenge" onClick={() => onNavigate("dashboard")} />
        <NavButton label="AI Buddy" onClick={() => onNavigate("ai")} />
        <NavButton label="Progress" onClick={() => onNavigate("dashboard")} />
        <NavButton label="Leaderboard" onClick={() => onNavigate("leaderboard")} />
        <NavButton label="Forum" onClick={() => alert("Forum page placeholder") } />
        <NavButton label="Profile" onClick={() => onNavigate("profile")} />
        <button className="mt-4 px-3 py-2 text-sm text-left text-red-600" onClick={onLogout}>Logout</button>
      </nav>
    </aside>
  );
}

function NavButton({ label, onClick }) {
  return (
    <button
      className="px-3 py-2 rounded-md text-left hover:bg-slate-50"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function Dashboard({ onNavigate, user }) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg">🔥 Daily Challenge</h3>
              <p className="text-sm text-slate-500">Solve today's quick question to keep your streak.</p>
            </div>
            <div className="text-xl">⏱️</div>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="px-3 py-2 bg-indigo-600 text-white rounded-md" onClick={() => onNavigate("quiz")}>Start</button>
            <button className="px-3 py-2 border rounded-md" onClick={() => alert("Skip placeholder")} >Skip</button>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-lg">📝 Quiz of the Day</h3>
          <p className="text-sm text-slate-500">Test your knowledge on Python & DSA.</p>
          <div className="mt-4">
            <button className="px-3 py-2 bg-emerald-500 text-white rounded-md" onClick={() => onNavigate("quiz")}>Take Quiz</button>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-lg">🎯 Focus Goal</h3>
          <p className="text-sm text-slate-500">Complete 3 challenges this week.</p>
          <div className="mt-4 flex items-center gap-3">
            <ProgressRing value={65} />
            <div>
              <div className="text-sm font-medium">65% completed</div>
              <div className="text-xs text-slate-500">2/3 challenges</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <Card className="col-span-1">
          <h3 className="font-semibold">📊 Progress Tracker</h3>
          <div className="mt-3">
            <SkillProgress name="Python" value={80} />
            <SkillProgress name="DSA" value={55} />
            <SkillProgress name="Aptitude" value={70} />
          </div>
        </Card>

        <Card className="col-span-1">
          <h3 className="font-semibold">🏆 Leaderboard</h3>
          <ol className="mt-3 space-y-2 text-sm">
            <li>1. Ankita — 1240 XP</li>
            <li>2. Rohit — 980 XP</li>
            <li>3. You — {user.xp} XP</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm border ${className}`}>
      {children}
    </div>
  );
}

function ProgressRing({ value = 50 }) {
  const stroke = 8;
  const size = 64;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="inline-block">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e6e9ee" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#10B981"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        fill="none"
      />
      <text x="50%" y="50%" dy="6" textAnchor="middle" fontSize="12" fill="#111827">{value}%</text>
    </svg>
  );
}

function SkillProgress({ name, value }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm">
        <div>{name}</div>
        <div>{value}%</div>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
        <div className="h-2 rounded-full" style={{ width: `${value}%`, background: "linear-gradient(90deg,#6366F1,#06B6D4)" }} />
      </div>
    </div>
  );
}

function QuizPage({ onBack }) {
  // simple quiz mock
  const [qIndex, setQIndex] = useState(0);
  const questions = [
    { q: "What is the output of len([1,2,3])?", options: ["2", "3", "Error", "None"], a: 1 },
    { q: "Which data type is immutable?", options: ["List", "Dict", "Tuple", "Set"], a: 2 }
  ];
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function submit() {
    if (selected === null) return alert("Select an option");
    if (selected === questions[qIndex].a) setScore(s => s + 1);
    if (qIndex === questions.length - 1) setDone(true);
    else {
      setQIndex(qIndex + 1);
      setSelected(null);
    }
  }

  return (
    <div>
      <button className="px-3 py-1 text-sm mb-4" onClick={onBack}>← Back</button>
      <Card>
        {!done ? (
          <div>
            <div className="font-semibold">Question {qIndex + 1}</div>
            <div className="mt-3 text-lg">{questions[qIndex].q}</div>
            <div className="mt-4 flex flex-col gap-2">
              {questions[qIndex].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`text-left px-3 py-2 rounded-md border ${selected === i ? "border-indigo-600 bg-indigo-50" : "border-transparent"}`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={submit} className="px-3 py-2 bg-indigo-600 text-white rounded-md">Submit</button>
              <button onClick={() => { setQIndex(q => Math.max(0, q-1)); setSelected(null); }} className="px-3 py-2 border rounded-md">Prev</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-2xl font-bold">Quiz Completed</div>
            <div className="mt-2">Your score: {score}/{questions.length}</div>
            <div className="mt-4">
              <button className="px-3 py-2 bg-emerald-500 text-white rounded-md" onClick={() => window.location.reload()}>Retry</button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function AIBuddy({ chat, setChat }) {
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setChat(c => [...c, userMsg, { from: "bot", text: "(Simulated response) — I would explain this concept and give examples." }]);
    setInput("");
  }

  return (
    <div className="max-w-2xl">
      <Card>
        <h3 className="font-semibold">AI Buddy</h3>
        <div className="mt-4 h-64 overflow-auto border rounded p-3 bg-slate-50">
          {chat.map((m, i) => (
            <div key={i} className={`mb-3 ${m.from === "bot" ? "text-left" : "text-right"}`}>
              <div className={`inline-block px-3 py-2 rounded-md ${m.from === "bot" ? "bg-white" : "bg-indigo-600 text-white"}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 px-3 py-2 rounded-md border" placeholder="Ask anything (e.g., explain BFS)" />
          <button onClick={send} className="px-4 py-2 bg-indigo-600 text-white rounded-md">Send</button>
        </div>
      </Card>
    </div>
  );
}

function ProfilePage({ user, setUser }) {
  const [name, setName] = useState(user.name);

  function save() {
    setUser(u => ({ ...u, name }));
    alert("Saved (placeholder)");
  }

  return (
    <Card>
      <h3 className="font-semibold">Profile</h3>
      <div className="mt-3 grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Full name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-md" />
        </div>
        <div>
          <label className="text-sm">Email</label>
          <input value={`rinki@example.com`} disabled className="w-full mt-1 px-3 py-2 border rounded-md bg-slate-50" />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="px-3 py-2 bg-indigo-600 text-white rounded-md" onClick={save}>Save</button>
        <button className="px-3 py-2 border rounded-md">Change Password</button>
      </div>
    </Card>
  );
}

function Leaderboard({ onBack }) {
  return (
    <div>
      <button className="px-3 py-1 text-sm mb-4" onClick={onBack}>← Back</button>
      <Card>
        <h3 className="font-semibold">Global Leaderboard</h3>
        <ol className="mt-3 space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <li key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">{i+1}</div>
                <div>
                  <div className="text-sm font-medium">User {i+1}</div>
                  <div className="text-xs text-slate-500">{800 - i*30} XP</div>
                </div>
              </div>
              <div className="text-sm font-semibold">#{i+1}</div>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}

function Login({ onLogin }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow">
        <div className="text-center mb-6">
          <div className="h-12 w-12 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white font-bold">P</div>
          <h2 className="mt-3 text-2xl font-semibold">Welcome to Prepthon</h2>
          <p className="text-sm text-slate-500">Prepare, Practice & Prevail</p>
        </div>
        <div className="space-y-3">
          <input className="w-full px-3 py-2 border rounded-md" placeholder="Email" />
          <input className="w-full px-3 py-2 border rounded-md" placeholder="Password" type="password" />
          <button className="w-full px-3 py-2 bg-indigo-600 text-white rounded-md" onClick={onLogin}>Login</button>
          <div className="text-center text-sm text-slate-500">or continue with</div>
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 border rounded-md">Google</button>
            <button className="flex-1 px-3 py-2 border rounded-md">GitHub</button>
          </div>
        </div>
      </div>
    </div>
  );
}
