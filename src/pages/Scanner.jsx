import { useState } from "react";
import { Camera, Upload, Sparkles } from "lucide-react";
import { addLead } from "../services/leadService";

export default function Scanner({ userId }) {
  const [fileName, setFileName] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [mimeType, setMimeType] = useState("");
  const [loading, setLoading] = useState(false);

  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "New",
    value: "",
    followUpDate: "",
    notes: "",
  });

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      setImageBase64(base64);
    };
    reader.readAsDataURL(file);
  }

  async function scanWithGemini() {
    const apiKey = localStorage.getItem("geminiApiKey");

    if (!apiKey) {
      alert("Please save Gemini API key in Settings first.");
      return;
    }

    if (!imageBase64) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Extract lead details from this image. Return ONLY valid JSON with these fields:
{
  "name": "",
  "email": "",
  "phone": "",
  "address": "",
  "notes": ""
}
If any field is missing, keep it empty string.`,
                  },
                  {
                    inline_data: {
                      mime_type: mimeType || "image/jpeg",
                      data: imageBase64,
                    },
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const cleanText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      if (!response.ok) {
  console.log("Gemini error:", data);
  alert(data?.error?.message || "Gemini request failed.");
  return;
}

if (!cleanText) {
  alert("Gemini returned empty response.");
  return;
}

const extracted = JSON.parse(cleanText);

      setLead({
        name: extracted.name || "",
        email: extracted.email || "",
        phone: extracted.phone || "",
        address: extracted.address || "",
        status: "New",
        value: "",
        followUpDate: "",
        notes: extracted.notes || "Extracted using Gemini AI.",
      });
    } catch (error) {
      console.error(error);
      alert("Gemini scan failed. Check API key or try clearer image.");
    } finally {
      setLoading(false);
    }
  }

  async function saveScannedLead() {
    if (!lead.name.trim()) {
      alert("Please scan or enter customer name first.");
      return;
    }

    await addLead(userId, lead);
    alert("Lead saved successfully!");

    setLead({
      name: "",
      email: "",
      phone: "",
      address: "",
      status: "New",
      value: "",
      followUpDate: "",
      notes: "",
    });

    setFileName("");
    setImageBase64("");
  }

  return (
    <div className="sales-page">
      <section className="sales-header">
        <div>
          <p className="eyebrow">AI Scanner</p>
          <h2>Lead Scanner</h2>
          <p className="muted-text">
            Upload a business card, bill, quote, or screenshot.
          </p>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <h2>
            <Camera size={22} />
            Upload Lead Image
          </h2>

          <label className="upload-box">
            <Upload size={34} />
            <strong>{fileName || "Click to upload image"}</strong>
            <p>JPG / PNG image</p>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFile}
            />
          </label>

          <button
            className="primary-btn"
            style={{ marginTop: 16 }}
            onClick={scanWithGemini}
            disabled={loading}
          >
            <Sparkles size={16} />
            {loading ? "Scanning..." : "Scan with Gemini"}
          </button>
        </div>

        <div className="panel">
          <h2>Extracted Details</h2>

          <div className="lead-form">
            <input placeholder="Name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} />
            <input placeholder="Email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} />
            <input placeholder="Phone" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} />
            <input placeholder="Address" value={lead.address} onChange={(e) => setLead({ ...lead, address: e.target.value })} />
            <textarea placeholder="Notes" value={lead.notes} onChange={(e) => setLead({ ...lead, notes: e.target.value })} />

            <button className="primary-btn" onClick={saveScannedLead}>
              Save Scanned Lead
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}