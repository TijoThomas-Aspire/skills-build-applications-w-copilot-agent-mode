import React, { useEffect, useState } from 'react';
import { apiUrl } from '../api';

export default function ResourceTable({ title, endpoint }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalItem, setModalItem] = useState(null);
  const [query, setQuery] = useState('');

  const fetchData = () => {
    setLoading(true);
    setError(null);
    const url = apiUrl(endpoint);
    console.log(`[${title}] fetching`, url);
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.json();
      })
      .then((data) => {
        console.log(`[${title}] fetched data`, data);
        const results = data && data.results ? data.results : data;
        setItems(Array.isArray(results) ? results : [results]);
      })
      .catch((err) => {
        console.error(`[${title}] fetch error`, err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = items.filter((it) => {
    if (!query) return true;
    const text = JSON.stringify(it).toLowerCase();
    return text.includes(query.toLowerCase());
  });

  // compute keys for tabular display
  const keys = [];
  for (let i = 0; i < Math.min(filtered.length, 10); i++) {
    const obj = filtered[i];
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach((k) => { if (!keys.includes(k)) keys.push(k); });
    }
  }

  return (
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{title}</h5>
        <div>
          <button className="btn btn-outline-secondary btn-sm mr-2" onClick={fetchData} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>
      <div className="card-body">
        <form className="form-inline mb-3" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group mr-2">
            <input className="form-control form-control-sm" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </form>

        {error && <div className="alert alert-danger">Error: {error}</div>}

        <div className="table-responsive">
          <table className="table table-striped table-hover table-sm">
            <thead>
              <tr>
                <th style={{width: '3%'}}>#</th>
                {keys.length ? keys.map((k) => <th key={k}>{k}</th>) : <th>Details</th>}
                <th style={{width: '10%'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((it, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  {keys.length ? keys.map((k) => (
                    <td key={k}>{typeof it[k] === 'object' ? JSON.stringify(it[k]) : String(it[k] ?? '')}</td>
                  )) : <td>{JSON.stringify(it)}</td>}
                  <td>
                    <button className="btn btn-sm btn-primary mr-2" onClick={() => setModalItem(it)}>View</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={keys.length ? keys.length + 2 : 3} className="text-center">No items to display</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalItem && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{title} Details</h5>
                  <button type="button" className="close" onClick={() => setModalItem(null)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(modalItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setModalItem(null)}>Close</button>
                </div>
              </div>
            </div>
            <div className="modal-backdrop show"></div>
          </div>
        )}
      </div>
    </div>
  );
}
