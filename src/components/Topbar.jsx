export default function Topbar({ activePage, user }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">SGE SalesOS</p>
        <h1>{activePage}</h1>
      </div>

      <div className="topbar-right">
        <div className="user-chip">
          <div className="avatar">{user.email?.charAt(0).toUpperCase()}</div>
          <div>
            <strong>{user.email}</strong>
            <p>Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}