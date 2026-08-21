import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

export default function DataTable({ 
  columns = [], 
  data = [], 
  searchable = true,
  searchPlaceholder = "Search records...",
  searchKey = null,
  emptyMessage = "No records found."
}) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  // Filter
  const filtered = data.filter((item) => {
    if (!query) return true;
    if (searchKey) {
      return String(item[searchKey] || '').toLowerCase().includes(query.toLowerCase());
    }
    return Object.values(item).some(val => 
      String(val).toLowerCase().includes(query.toLowerCase())
    );
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (aVal < bVal) return sortAsc ? -1 : 1;
    if (aVal > bVal) return sortAsc ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="data-table-container">
      {searchable && (
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="search-bar" style={{ maxWidth: '300px' }}>
            <Search size={16} />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <span className="text-xs text-muted">
            Showing {sorted.length} of {data.length} entries
          </span>
        </div>
      )}

      <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th 
                  key={col.key || col.header}
                  onClick={() => col.sortable !== false && col.key && handleSort(col.key)}
                  style={{ cursor: col.sortable !== false && col.key ? 'pointer' : 'default' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>{col.header}</span>
                    {col.sortable !== false && col.key && sortKey === col.key && (
                      sortAsc ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.length > 0 ? (
              sorted.map((row, idx) => (
                <tr key={row.id || idx}>
                  {columns.map((col) => (
                    <td key={col.key || col.header}>
                      {col.render ? col.render(row, idx) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
