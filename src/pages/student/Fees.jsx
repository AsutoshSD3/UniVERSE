import { useState } from 'react';
import { feeDetails } from '../../data/mockStudentData';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { CreditCard, Download, CheckCircle2, AlertTriangle, ShieldCheck, FileText, Smartphone } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Modal from '../../components/common/Modal';
import DataTable from '../../components/common/DataTable';

export default function StudentFees() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('UPI');

  const handlePayment = (e) => {
    e.preventDefault();
    alert(`✅ Payment of ${formatCurrency(feeDetails.pending)} via ${selectedMethod} successful! Digital GST receipt generated.`);
    setIsPaymentModalOpen(false);
  };

  const columns = [
    { header: 'Fee Component', key: 'item' },
    { 
      header: 'Amount', 
      key: 'amount',
      render: (row) => <strong style={{ color: 'var(--text-primary)' }}>{formatCurrency(row.amount)}</strong>
    },
    { 
      header: 'Status', 
      key: 'status',
      render: (row) => (
        <span className={`badge ${row.status === 'Paid' ? 'badge-green' : 'badge-orange'}`}>
          {row.status}
        </span>
      )
    }
  ];

  const paymentColumns = [
    { header: 'Transaction ID', key: 'id', render: (row) => <span className="text-xs font-bold">{row.id}</span> },
    { header: 'Date', key: 'date', render: (row) => formatDate(row.date) },
    { header: 'Amount', key: 'amount', render: (row) => <strong>{formatCurrency(row.amount)}</strong> },
    { header: 'Method', key: 'method' },
    { 
      header: 'Status', 
      key: 'status',
      render: (row) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)' }}>
          <CheckCircle2 size={14} /> {row.status}
        </span>
      )
    },
    { 
      header: 'Receipt', 
      key: 'receipt',
      sortable: false,
      render: (row) => (
        <button className="btn-icon sm btn-ghost" onClick={() => alert(`📥 Downloading official receipt ${row.receipt}.pdf`)}>
          <Download size={14} />
        </button>
      )
    }
  ];

  return (
    <div className="student-fees-page animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1>1-Click Fee Payment & Digital Ledger</h1>
          <p>Transparent fee breakdowns, instant payments & official GST receipt vault</p>
        </div>
        {feeDetails.pending > 0 && (
          <button 
            className="btn btn-primary"
            onClick={() => setIsPaymentModalOpen(true)}
          >
            <CreditCard size={18} />
            <span>Pay Outstanding Dues</span>
          </button>
        )}
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard
          title="Total Academic Fee"
          value={formatCurrency(feeDetails.totalFee)}
          subtitle="Semester 5 (Includes Hostel & Transport)"
          icon={FileText}
          color="#3b82f6"
        />
        <StatCard
          title="Total Paid"
          value={formatCurrency(feeDetails.paid)}
          subtitle="Cleared up to current date"
          icon={CheckCircle2}
          color="#10b981"
          badge="VERIFIED"
        />
        <StatCard
          title="Outstanding Balance"
          value={formatCurrency(feeDetails.pending)}
          subtitle={`Due date: ${formatDate(feeDetails.nextDueDate)}`}
          icon={AlertTriangle}
          color="#ef4444"
          badge="ACTION REQUIRED"
        />
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>
            Itemized Fee Breakdown
          </h3>
          <DataTable
            columns={columns}
            data={feeDetails.breakdown}
            searchable={false}
          />
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>
            Payment History & Receipt Vault
          </h3>
          <DataTable
            columns={paymentColumns}
            data={feeDetails.payments}
            searchable={false}
          />
        </div>
      </div>

      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title="Complete Digital Payment"
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="text-xs text-muted">Amount to Pay</div>
          <div style={{ fontSize: 'var(--font-3xl)', fontWeight: 800, color: 'var(--text-primary)', margin: '8px 0' }}>
            {formatCurrency(feeDetails.pending)}
          </div>
          <div className="badge badge-orange">DUE: {formatDate(feeDetails.nextDueDate)}</div>
        </div>

        <form onSubmit={handlePayment}>
          <div className="input-group" style={{ marginBottom: '16px' }}>
            <label>Select Payment Method</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
              <button
                type="button"
                className={`btn ${selectedMethod === 'UPI' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setSelectedMethod('UPI')}
              >
                <Smartphone size={16} /> UPI (GPay, PhonePe)
              </button>
              <button
                type="button"
                className={`btn ${selectedMethod === 'Net Banking' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setSelectedMethod('Net Banking')}
              >
                <CreditCard size={16} /> Credit / Debit / Net Banking
              </button>
            </div>
          </div>

          {selectedMethod === 'UPI' && (
            <div style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'center', marginBottom: '24px' }}>
              <p className="text-sm font-bold text-blue mb-2">Scan with any UPI App</p>
              <div style={{ width: '120px', height: '120px', background: 'white', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <QrCode size={100} color="#000" />
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setIsPaymentModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              <ShieldCheck size={16} />
              <span>Confirm & Pay Securely</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

// Ensure QrCode is imported at the top, adding it here if missed
import { QrCode } from 'lucide-react';
