import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom'; // Import useParams to capture the search term
import { fetchFromAPI } from '../utils/fetchFormAPI';
import { Videos } from './';

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams(); // Capture the search term from the URL

  useEffect(() => {
    if (searchTerm) { // Ensure the searchTerm is not empty
      fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
        .then((data) => setVideos(data.items))
        .catch((error) => console.error('Error fetching videos:', error));
    }
  }, [searchTerm]); // Re-run effect when searchTerm changes

  return (
    <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={2}
        sx={{ color: 'white' }}
      >
        Search Results for: <span style={{ color: '#F31503' }}>{searchTerm}</span>
      </Typography>
      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
