import React from 'react';
import ResourceTable from './ResourceTable';

export default function Activities() {
  return <ResourceTable title="Activities" endpoint="-8000.app.github.dev/api/activities/" />;
}
