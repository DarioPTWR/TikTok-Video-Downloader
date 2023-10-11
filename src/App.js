import React, { useState, useEffect } from 'react';
import fetchTikTokData from './api';
import './index.css';

// Define the App Function
function App() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handling empty URL
    if (!url) {
      setError('Please enter a TikTok URL to proceed.');
      return; // Prevent further execution
    }

    try {
      const responseData = await fetchTikTokData(url);
      setData(responseData);
      setError(null);
    } catch (error) {
      setError('Something went wrong. Please try again.');
      setData(null);
    }
  };

  // Use useEffect to watch for any changes in the 'url' state
  useEffect(() => {
    if (url) {
      // Trigger a new API request when 'url' changes
      fetchTikTokData(url)
        .then((response) => {
          setData(response.data);
          setError(null);
        })
        .catch((error) => {
          setError('Please provide a valid TikTok URL!');
          setData(null);
        });
    }
  }, [url]); // This effect will run whenever 'url' changes

  return (
    <div className="app-container">
      <div className="content">
        <h1 className='px-4' style={{ fontWeight: 600 }}>Download TikTok Videos By Link!</h1>
        <h6 className='mt-3 px-3'><i class="fas fa-check-circle"></i>&nbsp;&nbsp;Without WaterMark&emsp;<i class="fas fa-check-circle"></i>&nbsp;&nbsp;Unlimited Downloads</h6>
        <form onSubmit={handleSubmit} className="centered-form">
          <div className="group pt-4">
            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter TikTok URL Here"
              type="text"
              className="input"
            />
          </div>
          <button type="submit" className="button mt-3">
            <span style={{fontWeight: 900}}>Download Now</span>
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {data && data.data && data.data.play ? (
          <div className="video-container mt-5">
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <video controls style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <source src={data.data.play} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;

