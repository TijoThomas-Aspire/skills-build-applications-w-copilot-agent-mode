import React from 'react';
import ResourceTable from './ResourceTable';

export default function Teams() {
  return <ResourceTable title="Teams" endpoint="-8000.app.github.dev/api/teams/" />;
}
