import {
  CalendarClock,
  DollarSign,
  FileText,
  UserPlus,
  Users,
  TrendingUp,
} from "lucide-react";

export default function Dashboard({ leads }) {
  const today = new Date().toISOString().slice(0, 10);

  const wonDeals = leads.filter((lead) => lead.status === "Won");
  const quoteSent = leads.filter((lead) => lead.status === "Quote Sent");
  const interested = leads.filter((lead) => lead.status === "Interested");
  const revenue = wonDeals.reduce((sum, lead) => sum + Number(lead.value || 0), 0);
  const todayFollowUps = leads.filter((lead) => lead.followUpDate === today);
  const recentLeads = leads.slice(0, 5);

  const kpis = [
    { label: "Total Leads", value: leads.length, icon: Users },
    { label: "Quotes Sent", value: quoteSent.length, icon: FileText },
    { label: "Won Revenue", value: `$${revenue.toLocaleString()}`, icon: DollarSign },
    { label: "Today Follow Ups", value: todayFollowUps.length, icon: CalendarClock },
  ];

  return (
    <div className="dashboard-page">
      <section className="kpi-grid">
        {kpis.map((item) => (
          <div className="kpi-card" key={item.label}>
            <div className="kpi-icon">
              <item.icon size={22} />
            </div>
            <p>{item.label}</p>
            <h2>{item.value}</h2>
          </div>
        ))}
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <h2>
            <TrendingUp size={22} />
            Sales Pipeline
          </h2>

          <div className="snapshot-list">
            <div><span>New Leads</span><strong>{leads.filter((l) => l.status === "New").length}</strong></div>
            <div><span>Interested</span><strong>{interested.length}</strong></div>
            <div><span>Quote Sent</span><strong>{quoteSent.length}</strong></div>
            <div><span>Won Deals</span><strong>{wonDeals.length}</strong></div>
          </div>
        </div>

        <div className="panel">
          <h2>
            <CalendarClock size={22} />
            Today Follow Ups
          </h2>

          <div className="mini-list">
            {todayFollowUps.length === 0 && <p>No follow-ups due today.</p>}

            {todayFollowUps.map((lead) => (
              <div className="mini-item" key={lead.id}>
                <div>
                  <strong>{lead.name}</strong>
                  <p>{lead.phone || lead.email || "No contact"}</p>
                </div>
                <span>{lead.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <h2>
            <UserPlus size={22} />
            Quick Actions
          </h2>

          <div className="quick-actions">
            <button>+ New Lead</button>
            <button>📄 New Quote</button>
            <button>📷 Scan Bill</button>
            <button>📅 Calendar</button>
          </div>
        </div>

        <div className="panel">
          <h2>Recent Leads</h2>

          <div className="mini-list">
            {recentLeads.length === 0 && <p>No leads yet.</p>}

            {recentLeads.map((lead) => (
              <div className="mini-item" key={lead.id}>
                <div>
                  <strong>{lead.name}</strong>
                  <p>{lead.email || lead.phone || "No contact"}</p>
                </div>
                <span>{lead.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}