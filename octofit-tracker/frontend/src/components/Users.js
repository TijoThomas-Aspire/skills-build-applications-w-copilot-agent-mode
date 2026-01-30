import React from 'react';
import ResourceTable from './ResourceTable';

export default function Users() {
  return <ResourceTable title="Users" endpoint="-8000.app.github.dev/api/users/" />;
}
