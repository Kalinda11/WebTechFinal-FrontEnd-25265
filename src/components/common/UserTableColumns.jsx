import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
export const UserTableColumns = (onEditUser, handleDeleteUser) => [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Username',
    accessor: 'username',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Role',
    accessor: 'role',
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    Cell: ({ row }) => (
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => onEditUser(row.original)}
          className="text-blue-500 hover:text-blue-700"
          title="Edit User"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleDeleteUser(row.original.id)}
          className="text-red-500 hover:text-red-700"
          title="Delete User"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    ),
  },
];