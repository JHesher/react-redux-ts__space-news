import React, { useState, useEffect } from 'react';
import { Search } from "../../components/Search";
import { NewsList } from '../../components/NewsList';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getNewsList } from '../../redux/newsSlice';
import { Box } from '@mui/material';


export const NewsListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    searchValue.length > 0 && dispatch(getNewsList(searchValue.split(' ')));
  }, [searchValue]);

  return (
    <Box sx={{ padding: '50px'}}>
      <Search onChange={setSearchValue} />
      <NewsList searchValue={searchValue} />
    </Box>
  );
};