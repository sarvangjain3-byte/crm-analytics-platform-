import { useState } from "react";

export default function Settings({ user }) {
  const [geminiKey, setGeminiKey] = useState(
    localStorage.getItem("geminiApiKey") || ""
  );

  function saveKey() {
    localStorage.setItem("geminiApiKey", geminiKey);
    alert("Gemini API key saved.");
  }

  return (
    <div className="sales-page">
      <section className="sales-header">
        <div>
          <p className="eyebrow">Settings</p>
          <h2>Business Settings</h2>
          <p className="muted-text">Manage your account and AI setup.</p>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <h2>Account</h2>

          <div className="snapshot-list">
            <div><span>Email</span><strong>{user.email}</strong></div>
            <div><span>Role</span><strong>Admin</strong></div>
            <div><span>App</span><strong>SGE SalesOS</strong></div>
          </div>
        </div>

        <div className="panel">
          <h2>Gemini AI</h2>

          <div className="lead-form">
            <input
              placeholder="Paste Gemini API key"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
            />

            <button className="primary-btn" onClick={saveKey}>
              Save Gemini Key
            </button>

            <p className="muted-text">
              This key is saved only in your browser for now.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}