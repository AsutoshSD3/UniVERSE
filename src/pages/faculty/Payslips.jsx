import { useState } from 'react';
import { facultyPayslips } from '../../data/mockFacultyData';
import { formatDate, formatCurrency } from '../../utils/helpers';
import { DollarSign, Download, FileText, CheckCircle2 } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import DataTable from '../../components/common/DataTable';

export default function FacultyPayslips() {
  const [selectedYear, setSelectedYear] = useState('2023-2024');

  const columns = [
    { header: 'Month', key: 'month', render: (row) => <span className="font-bold">{row.month}</span> },
    { header: 'Basic Pay', key: 'basic', render: (row) => formatCurrency(row.basic) },
    { header: 'Allowances', key: 'allowances', render: (row) => formatCurrency(row.allowances) },
    { header: 'Deductions (Tax/PF)', key: 'deductions', render: (row) => <span className="text-red">{formatCurrency(row.deductions)}</span> },
    { header: 'Net Salary', key: 'net', render: (row) => <strong className="text-green">{formatCurrency(row.net)}</strong> },
    { 
      header: 'Action', 
      key: 'action',
      sortable: false,
      render: (row) => (
        <button className="btn-icon sm btn-ghost" onClick={() => alert(`📥 Downloading certified payslip PDF for ${row.month}`)}>
          <Download size={14} />
        </button>
      )
    }
  ];

  return (
    <div className="faculty-payslips-page animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1>Salary & Tax Documentation</h1>
          <p>Access monthly payslips, Form 16, and reimbursement tracking</p>
        </div>
        <button className="btn btn-primary" onClick={() => alert('📥 Form 16 (Part A & B) for FY 2023-24 downloaded securely!')}>
          <FileText size={18} /> Download Form 16
        </button>
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard
          title="YTD Earnings"
          value={formatCurrency(1250000)}
          subtitle="Financial Year 2023-24"
          icon={DollarSign}
          color="#3b82f6"
        />
        <StatCard
          title="YTD Tax Deducted (TDS)"
          value={formatCurrency(185000)}
          subtitle="As per old tax regime"
          icon={FileText}
          color="#ef4444"
        />
        <StatCard
          title="Reimbursements"
          value={formatCurrency(24500)}
          subtitle="Pending claims (Conference)"
          icon={CheckCircle2}
          color="#10b981"
          badge="PROCESSING"
        />
      </div>

      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700 }}>
            Monthly Payslip Archive
          </h3>
          <div className="input-group" style={{ width: '150px' }}>
            <select className="input-field" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <option>2023-2024</option>
              <option>2022-2023</option>
              <option>2021-2022</option>
            </select>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={facultyPayslips}
          searchable={false}
        />
      </div>
    </div>
  );
}
