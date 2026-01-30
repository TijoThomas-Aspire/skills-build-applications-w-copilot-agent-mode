import React from 'react';
import ResourceTable from './ResourceTable';

export default function Workouts() {
  return <ResourceTable title="Workouts" endpoint="-8000.app.github.dev/api/workouts/" />;
}
