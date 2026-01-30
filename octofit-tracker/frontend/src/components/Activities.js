import React, { useEffect, useState } from 'react';
import { apiUrl } from '../api';

export default function Activities() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const endpoint = apiUrl('activities');
    console.log('[Activities] fetching', endpoint);
    fetch(endpoint)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.json();
      })
      .then((data) => {
        console.log('[Activities] fetched data', data);
        const results = data && data.results ? data.results : data;
        setItems(Array.isArray(results) ? results : [results]);
      })
      .catch((err) => console.error('[Activities] fetch error', err));
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {items.map((it, idx) => (
          <li key={idx}>{JSON.stringify(it)}</li>
        ))}
      </ul>
    </div>
  );
}
