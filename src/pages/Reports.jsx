import { useState } from "react";

export default function Reports({ leads }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filtered = leads.filter((lead) => {
    if (!fromDate && !toDate) return true;

    const date =
      lead.followUpDate ||
      lead.createdAt?.toDate?.().toISOString().slice(0, 10) ||
      "";

    if (fromDate && date < fromDate) return false;
    if (toDate && date > toDate) return false;

    return true;
  });

  const wonLeads = filtered.filter((lead) => lead.status === "Won");
  const quoteLeads = filtered.filter((lead) => lead.status === "Quote Sent");
  const revenue = wonLeads.reduce((sum, lead) => sum + Number(lead.value || 0), 0);

  function exportCSV() {
    const rows = [
      ["Name", "Email", "Phone", "Address", "Status", "Value", "Follow Up", "Notes"],
      ...filtered.map((lead) => [
        lead.name || "",
        lead.email || "",
        lead.phone || "",
        lead.address || "",
        lead.status || "",
        lead.value || "",
        lead.followUpDate || "",
        lead.notes || "",
      ]),
    ];

    const csv = rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sge-salesos-report.csv";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="sales-page">
      <section className="sales-header">
        <div>
          <p className="eyebrow">Reports</p>
          <h2>Sales Reports</h2>
          <p className="muted-text">Filter by date and export CRM data.</p>
        </div>

        <button className="primary-btn" onClick={exportCSV}>
          Export CSV
        </button>
      </section>

      <section className="panel">
        <h2>Date Range</h2>

        <div className="filters">
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          <button className="primary-btn" onClick={() => { setFromDate(""); setToDate(""); }}>
            Clear
          </button>
        </div>
      </section>

      <section className="kpi-grid">
        <div className="kpi-card"><p>Filtered Leads</p><h2>{filtered.length}</h2></div>
        <div className="kpi-card"><p>Quotes Sent</p><h2>{quoteLeads.length}</h2></div>
        <div className="kpi-card"><p>Won Deals</p><h2>{wonLeads.length}</h2></div>
        <div className="kpi-card"><p>Revenue</p><h2>${revenue.toLocaleString()}</h2></div>
      </section>
    </div>
  );
}