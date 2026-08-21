import { useState } from 'react';
import { studentMarks } from '../../data/mockStudentData';
import { parentWard } from '../../data/mockParentData';
import { BookOpen, Award, Download, TrendingUp } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import DataTable from '../../components/common/DataTable';
import ChartCard from '../../components/common/ChartCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

export default function ParentAcademics() {
  const internalsBarData = studentMarks.currentSubjects.map(s => ({
    name: s.code,
    total: s.totalInternal
  }));

  const columns = [
    { header: 'Subject Code & Name', key: 'name', render: (row) => <div><div className="font-bold">{row.name}</div><div className="text-xs text-muted">{row.code}</div></div> },
    { header: 'Internal 1', key: 'internal1', render: (row) => `${row.internal1} / 25` },
    { header: 'Internal 2', key: 'internal2', render: (row) => row.internal2 ? `${row.internal2} / 25` : '-' },
    { header: 'Total Internal', key: 'totalInternal', render: (row) => <strong className="text-blue">{row.totalInternal} / {row.maxTotalInternal}</strong> },
  ];

  return (
    <div className="parent-academics-page animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1>Academic Gradebook & Progress Report</h1>
          <p>Track {parentWard.name}'s performance, internal marks, and download transcripts</p>
        </div>
        <button className="btn btn-primary" onClick={() => alert('📥 Downloading latest official transcript (PDF) for ' + parentWard.name)}>
          <Download size={18} /> Official Transcript PDF
        </button>
      </div>

      <div className="grid-3" style={{ marginBottom: 'var(--space-xl)' }}>
        <StatCard
          title="Cumulative CGPA"
          value={studentMarks.cgpa}
          subtitle="Top 15% of Batch"
          icon={Award}
          color="#3b82f6"
          badge="EXCELLENT"
        />
        <StatCard
          title="Current Sem 5 SGPA"
          value="8.60"
          subtitle="Estimated based on Internals"
          icon={TrendingUp}
          color="#10b981"
        />
        <StatCard
          title="Active Backlogs"
          value="0"
          subtitle="Clear Academic Standing"
          icon={BookOpen}
          color="#8b5cf6"
          badge="CLEAN"
        />
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
        <ChartCard
          title="Current Semester Internal Performance"
          subtitle="Marks out of 70 across all registered subjects"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={internalsBarData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis domain={[0, 70]} stroke="#94a3b8" fontSize={12} />
              <RechartsTooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
              <Bar dataKey="total" fill="var(--accent-blue)" radius={[4, 4, 0, 0]} name="Marks Scored" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="glass-card">
          <h3 style={{ fontSize: 'var(--font-md)', fontWeight: 700, marginBottom: '16px' }}>
            Internal Assessment Breakdown
          </h3>
          <DataTable
            columns={columns}
            data={studentMarks.currentSubjects}
            searchable={false}
          />
        </div>
      </div>
    </div>
  );
}
