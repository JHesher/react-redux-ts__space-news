import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getNewsById } from '../../redux/newsSlice';
import { Box, Grid, Card, CardContent, CardMedia, Typography, CardActions, Button, FormLabel, FormLabelProps, Divider, ThemeProvider } from '@mui/material';
import { useAppSelector } from '../../utils/hooks';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { INewsList } from '../../api/api';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styled from '@emotion/styled';
import { getHighlightedText } from '../../utils/functions';
import theme from '../../theme';

const CustomFormLabel = styled(FormLabel)<FormLabelProps>(() => ({
  color: '#363636',
    fontWeight: 600,
    marginBottom: '5px'
  })
);

interface IProps {
  searchValue: string
}

export const NewsList: React.FC<IProps> = ({ searchValue }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { newsList } = useAppSelector(state => state.persistedReducer.news);

  return (
    <div className="NewsList">
      <ThemeProvider theme={theme}>
        <CustomFormLabel>{`Results: ${newsList.length}`}</CustomFormLabel>
        <Divider />
        <Box sx={{ flexGrow: 1, textDecoration: 'none', marginTop: '45px' }}>
          <Grid 
            container 
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 8, md: 12 }}
          >
            {newsList?.map((news: INewsList) => (
              <Grid item xs={2} sm={4} md={4} key={news.id}>
                <Card sx={{ height: '100%', position: 'relative' }}>
                  <CardMedia
                    sx={{ height: 217 }}
                    image={`${news.imageUrl}`}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {moment(news.publishedAt).format('MMMM Do, YYYY')}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {getHighlightedText(news.title, searchValue.split(' '))}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {getHighlightedText(news.summary, searchValue.split(' '))}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      sx={{ textTransform: 'none', fontWeight: '700' }}
                      variant="text" 
                      size="small"
                      color="inherit"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => {
                        dispatch(getNewsById(news.id))
                        navigate(`/article-page/${news.id}`)
                      }}
                    >
                      Read more
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  );
};


