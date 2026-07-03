import Quotes from "../pages/Quotes";
import Analytics from "../pages/Analytics";
import Pipeline from "../pages/Pipeline";
import Calendar from "../pages/Calendar";
import Customers from "../pages/Customers";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Dashboard from "../pages/Dashboard";
import Leads from "../pages/Leads";
import Reports from "../pages/Reports";
import Scanner from "../pages/Scanner";
import Settings from "../pages/Settings";
import { listenToLeads } from "../services/leadService";

export default function Layout({ user }) {
  const [activePage, setActivePage] = useState("Dashboard");
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToLeads(user.uid, setLeads);
    return () => unsubscribe();
  }, [user.uid]);

  return (
    <div className="app">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="main">
        <Topbar activePage={activePage} user={user} />

        {activePage === "Dashboard" && <Dashboard leads={leads} />}
        {activePage === "Leads" && <Leads leads={leads} userId={user.uid} />}
        {activePage === "Customers" && <Customers />}
        {activePage === "Calendar" && <Calendar leads={leads} />}
        {activePage === "Pipeline" && <Pipeline leads={leads} />}
        {activePage === "AI Scanner" && <Scanner userId={user.uid} />}
        {activePage === "Analytics" && <Analytics leads={leads} />}
        {activePage === "Quotes" && <Quotes leads={leads} />}
        {activePage === "Reports" && <Reports leads={leads} />}
        {activePage === "Settings" && <Settings user={user} />}
      </main>
    </div>
  );
}