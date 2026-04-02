import jsPDF from "jspdf";

interface ReceiptProps {
  plan: { name: string; total: number };
  onClose: () => void;
}

const Receipt = ({ plan, onClose }: ReceiptProps) => {
  const now = new Date();
  const ts = now.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const ref = "PG" + Math.floor(Math.random() * 9e6 + 1e6);

  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "mm", format: [80, 160] });
    const w = 80;
    let y = 14;

    doc.setFillColor(34, 197, 94);
    doc.circle(w / 2, y, 6, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text("✓", w / 2, y + 1, { align: "center" });

    y += 14;
    doc.setTextColor(17, 24, 39);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Success!", w / 2, y, { align: "center" });

    y += 6;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 114, 128);
    doc.text("Your payment has been successfully done.", w / 2, y, { align: "center" });

    y += 8;
    doc.setDrawColor(229, 231, 235);
    doc.line(10, y, w - 10, y);

    y += 8;
    doc.setTextColor(107, 114, 128);
    doc.setFontSize(7);
    doc.text("Total Payment", w / 2, y, { align: "center" });

    y += 7;
    doc.setTextColor(17, 24, 39);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(`$${plan.total} AUD`, w / 2, y, { align: "center" });

    y += 10;
    doc.setDrawColor(229, 231, 235);
    doc.line(10, y, w - 10, y);

    const details = [
      ["Ref Number", ref],
      ["Payment Time", ts],
      ["Payment Method", "Card"],
      ["Plan", plan.name],
    ];

    y += 6;
    doc.setFontSize(7);
    for (const [label, value] of details) {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(107, 114, 128);
      doc.text(label, 12, y);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(17, 24, 39);
      doc.text(value, w - 12, y, { align: "right" });
      y += 7;
    }

    y += 4;
    doc.setDrawColor(229, 231, 235);
    doc.setLineDashPattern([1, 1], 0);
    doc.line(10, y, w - 10, y);

    y += 8;
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(156, 163, 175);
    doc.text("Thank you for your purchase!", w / 2, y, { align: "center" });

    doc.save(`Playground_Receipt_${ref}.pdf`);
  };

  return (
    <div className="receipt-overlay" onClick={(e) => { if ((e.target as HTMLElement).className === "receipt-overlay") onClose(); }}>
      <div className="receipt-wrap">
        <div className="receipt-check">✓</div>
        <div className="receipt-card">
          <button className="receipt-close" onClick={onClose}>✕</button>
          <div className="receipt-body">
            <div className="receipt-title">Payment Success!</div>
            <div className="receipt-sub">Your payment has been successfully done.</div>
            <div className="receipt-hr" />
            <div className="receipt-amt-label">Total Payment</div>
            <div className="receipt-amt">${plan.total} AUD</div>
            <div className="receipt-grid">
              <div className="receipt-cell"><div className="receipt-cell-lbl">Ref Number</div><div className="receipt-cell-val">{ref}</div></div>
              <div className="receipt-cell"><div className="receipt-cell-lbl">Payment Time</div><div className="receipt-cell-val">{ts}</div></div>
              <div className="receipt-cell"><div className="receipt-cell-lbl">Payment Method</div><div className="receipt-cell-val">Card</div></div>
              <div className="receipt-cell"><div className="receipt-cell-lbl">Plan</div><div className="receipt-cell-val">{plan.name}</div></div>
            </div>
            <button className="receipt-pdf" onClick={downloadPDF}>⬇ Get PDF Receipt</button>
          </div>
          <div className="receipt-tear" />
        </div>
      </div>
    </div>
  );
};

export default Receipt;
