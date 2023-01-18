import React from 'react';
import './ArticlePage.scss';
import { Typography, Button, CardMedia, ThemeProvider } from '@mui/material';
import { useAppSelector } from '../../utils/hooks';
import { Box } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import theme from '../../theme';

export const ArticlePage: React.FC = () => {
  const navigate = useNavigate();
  const { news } = useAppSelector(state => state.persistedReducer.news);
  
  return (
    <div className="ArticlePage">
      <CardMedia
        component="img"
        alt="green iguana"
        width="100%"
        height="245"
        image={`${news?.imageUrl}`}
        sx={{ position: 'absolute'}}
      />
      <Box sx={{ 
        padding: '35px 75px',
        margin: '150px 75px 35px',
        backgroundColor: '#fff',
        position: 'relative',
        zIndex: 1,
        border: '1px solid #EAEAEA',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
        borderRadius: '5px'
      }}>
        <ThemeProvider theme={theme}>
          <Typography paddingBottom={5} textAlign="center" variant="h5">{news?.title}</Typography>
          <Typography fontSize={18}>{news?.summary}</Typography>
        </ThemeProvider>
      </Box>
      <Box>
        <Button 
          sx={{ textTransform: 'none', fontWeight: '700', margin: '0 150px' }}
          variant="text" 
          size="small"
          color="inherit"
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            navigate(`/`)
          }}
        >
          Back to homepage
        </Button>
      </Box>
    </div>
  );
};