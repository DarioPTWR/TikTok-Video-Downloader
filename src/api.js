import axios from 'axios';

// Fetch API Key and Details
const fetchTikTokData = async (url) => {
  const options = {
    method: 'GET',
    url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/',
    params: {
      url: url,
      hd: '1'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    // Handle specific error types
    throw error;
  }
};

export default fetchTikTokData;