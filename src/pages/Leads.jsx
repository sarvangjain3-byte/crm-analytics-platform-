import { useState } from "react";
import { Trash2, Pencil, Save, X, Search, DollarSign } from "lucide-react";
import { addLead, deleteLead, updateLead } from "../services/leadService";

export default function Leads({ leads, userId }) {
  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "New",
    value: "",
    followUpDate: "",
    notes: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredLeads = leads.filter((lead) => {
    const text = `${lead.name || ""} ${lead.email || ""} ${lead.phone || ""} ${lead.address || ""} ${lead.notes || ""}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalValue = filteredLeads.reduce((sum, lead) => sum + Number(lead.value || 0), 0);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return alert("Lead name is required");
    await addLead(userId, form);
    setForm(emptyForm);
  }

  function startEdit(lead) {
    setEditId(lead.id);
    setEditForm({
      name: lead.name || "",
      email: lead.email || "",
      phone: lead.phone || "",
      address: lead.address || "",
      status: lead.status || "New",
      value: lead.value || "",
      followUpDate: lead.followUpDate || "",
      notes: lead.notes || "",
    });
  }

  async function saveEdit() {
    if (!editForm.name.trim()) return alert("Lead name is required");
    await updateLead(userId, editId, editForm);
    setEditId(null);
    setEditForm(emptyForm);
  }

  function cancelEdit() {
    setEditId(null);
    setEditForm(emptyForm);
  }

  return (
    <div className="sales-page">
      <section className="sales-header">
        <div>
          <p className="eyebrow">CRM</p>
          <h2>Lead Management</h2>
          <p className="muted-text">Manage customers, quotes, follow-ups and sales pipeline.</p>
        </div>

        <div className="sales-summary">
          <div>
            <span>Total Leads</span>
            <strong>{filteredLeads.length}</strong>
          </div>
          <div>
            <span>Pipeline Value</span>
            <strong>${totalValue.toLocaleString()}</strong>
          </div>
        </div>
      </section>

      <div className="leads-grid">
        <section className="panel">
          <h2>Add New Lead</h2>

          <form onSubmit={handleSubmit} className="lead-form">
            <input placeholder="Customer name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />

            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option>New</option>
              <option>Contacted</option>
              <option>Interested</option>
              <option>Quote Sent</option>
              <option>Won</option>
              <option>Lost</option>
            </select>

            <input placeholder="Quote value $" type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
            <input type="date" value={form.followUpDate} onChange={(e) => setForm({ ...form, followUpDate: e.target.value })} />
            <textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />

            <button className="primary-btn">Save Lead</button>
          </form>
        </section>

        <section className="panel">
          <div className="section-header">
            <div>
              <h2>All Leads</h2>
              <p className="muted-text">{filteredLeads.length} matching leads</p>
            </div>

            <div className="filters">
              <div className="search-box">
                <Search size={16} />
                <input placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>

              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option>All</option>
                <option>New</option>
                <option>Contacted</option>
                <option>Interested</option>
                <option>Quote Sent</option>
                <option>Won</option>
                <option>Lost</option>
              </select>
            </div>
          </div>

          <div className="table-wrap">
            {filteredLeads.length === 0 ? (
              <p>No matching leads found.</p>
            ) : (
              <table className="crm-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Value</th>
                    <th>Follow Up</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id}>
                      {editId === lead.id ? (
                        <td colSpan="6">
                          <div className="edit-form wide">
                            <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                            <input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                            <input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
                            <input value={editForm.address} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} />

                            <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
                              <option>New</option>
                              <option>Contacted</option>
                              <option>Interested</option>
                              <option>Quote Sent</option>
                              <option>Won</option>
                              <option>Lost</option>
                            </select>

                            <input type="number" value={editForm.value} onChange={(e) => setEditForm({ ...editForm, value: e.target.value })} />
                            <input type="date" value={editForm.followUpDate} onChange={(e) => setEditForm({ ...editForm, followUpDate: e.target.value })} />
                            <textarea value={editForm.notes} onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })} />

                            <div className="edit-actions">
                              <button className="save-btn" type="button" onClick={saveEdit}><Save size={16} /> Save</button>
                              <button className="cancel-btn" type="button" onClick={cancelEdit}><X size={16} /> Cancel</button>
                            </div>
                          </div>
                        </td>
                      ) : (
                        <>
                          <td>
                            <strong>{lead.name}</strong>
                            <p>{lead.address || "No address"}</p>
                          </td>
                          <td>
                            <p>{lead.email || "No email"}</p>
                            <p>{lead.phone || "No phone"}</p>
                          </td>
                          <td>
                            <span className={`status-badge ${lead.status?.replaceAll(" ", "-").toLowerCase()}`}>
                              {lead.status}
                            </span>
                          </td>
                          <td>
                            <strong className="value-text">
                              <DollarSign size={14} /> {Number(lead.value || 0).toLocaleString()}
                            </strong>
                          </td>
                          <td>{lead.followUpDate || "-"}</td>
                          <td>
                            <div className="lead-actions">
                              <button className="edit-btn" onClick={() => startEdit(lead)}><Pencil size={18} /></button>
                              <button className="delete-btn" onClick={() => deleteLead(userId, lead.id)}><Trash2 size={18} /></button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}