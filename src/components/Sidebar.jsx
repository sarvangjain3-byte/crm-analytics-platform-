import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import {
  BarChart3,
  ReceiptText,
  Users,
  Building2,
  Camera,
  FileText,
  Settings,
  LogOut,
  CalendarDays,
  GitBranch,
  PieChart,
} from "lucide-react";

export default function Sidebar({ activePage, setActivePage }) {
  const menu = [
  { icon: BarChart3, label: "Dashboard" },
  { icon: Users, label: "Leads" },
  { icon: ReceiptText, label: "Quotes" },
  { icon: PieChart, label: "Analytics" },
  { icon: Building2, label: "Customers" },
  { icon: CalendarDays, label: "Calendar" },
  { icon: GitBranch, label: "Pipeline" },
  { icon: Camera, label: "AI Scanner" },
  { icon: FileText, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">S</div>
        <div>
          <h2>SGE SalesOS</h2>
          <p>Sales Operating System</p>
        </div>
      </div>

      <nav className="nav-menu">
        {menu.map((item) => (
          <button
            key={item.label}
            className={`nav-item ${activePage === item.label ? "active" : ""}`}
            onClick={() => setActivePage(item.label)}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>

      <button className="logout" onClick={() => signOut(auth)}>
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

