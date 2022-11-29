import React from 'react';
import './Sidebar.scss';
import { SearchResultList } from '../SearchResultList';
import { Search } from '../Search';

export const Sidebar: React.FC = () => {
  return (
    <div className="Sidebar">
      <h2 className="Sidebar__title">
        Add new city
      </h2>
      <Search />
      <SearchResultList />
    </div>
  );
};
