import React, { useEffect, useState } from 'react';
import { apiUrl } from '../api';

export default function Users() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const endpoint = apiUrl('users');
    console.log('[Users] fetching', endpoint);
    fetch(endpoint)
      .then((r) => { if (!r.ok) throw new Error(`${r.status} ${r.statusText}`); return r.json(); })
      .then((data) => {
        console.log('[Users] fetched data', data);
        const results = data && data.results ? data.results : data;
        setItems(Array.isArray(results) ? results : [results]);
      })
      .catch((err) => console.error('[Users] fetch error', err));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {items.map((it, idx) => <li key={idx}>{JSON.stringify(it)}</li>)}
      </ul>
    </div>
  );
}
