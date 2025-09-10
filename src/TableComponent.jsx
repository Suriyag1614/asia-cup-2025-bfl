import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const TableComponent = ({ rowData }) => {
  const columns = rowData[0] ? Object.keys(rowData[0]).map(key => ({ field: key })) : [];
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%', marginTop: '20px' }}>
      <AgGridReact rowData={rowData} columnDefs={columns} pagination={true} />
    </div>
  );
};

export default TableComponent;
