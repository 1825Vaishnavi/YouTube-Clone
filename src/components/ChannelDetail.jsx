import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from './';
import { fetchFromAPI } from "../utils/fetchFormAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Fetch channel details
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => {
        if (data?.items) {
          setChannelDetail(data.items[0]);
        } else {
          console.error('Channel details not found');
        }
      })
      .catch((error) => console.error('Error fetching channel details:', error));

    // Fetch videos from channel
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => {
        if (data?.items) {
          setVideos(data.items);
        } else {
          console.error('Videos not found');
        }
      })
      .catch((error) => console.error('Error fetching videos:', error));
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
            zIndex: 10,
            height: "300px"
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: '100px' } }}/>
          <Videos videos={videos} />
        </Box>
      </Box>
  
  );
};

export default ChannelDetail;
