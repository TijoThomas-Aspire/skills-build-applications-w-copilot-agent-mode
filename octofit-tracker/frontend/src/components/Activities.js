import React from 'react';
import ResourceTable from './ResourceTable';

export default function Activities() {
  return <ResourceTable title="Activities" endpoint="http://localhost:8000/api/activities/" />;
}
