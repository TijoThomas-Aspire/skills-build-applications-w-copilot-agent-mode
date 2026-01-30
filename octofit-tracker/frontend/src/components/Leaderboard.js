import React from 'react';
import ResourceTable from './ResourceTable';

export default function Leaderboard() {
  return <ResourceTable title="Leaderboard" endpoint="-8000.app.github.dev/api/leaderboard/" />;
}
