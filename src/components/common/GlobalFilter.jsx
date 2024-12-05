import React from 'react';

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="flex items-center mb-4">
      <label className="mr-2">Search:</label>
      <input
        value={filter || ''}
        onChange={e => setFilter(e.target.value)}
        placeholder="Search users..."
        className="border px-3 py-2 rounded-md w-full max-w-md"
      />
    </div>
  );
};