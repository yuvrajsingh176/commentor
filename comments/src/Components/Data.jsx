import React, { useEffect, useState } from 'react';
import CommentBox from './CommentBox';
import WriteBox from './WriteBox';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Data = () => {
  const [dataa, setData] = useState([]);
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    // Reload the page or navigate to the login page
    window.location.reload();
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          navigate('/');
          return;
        }

        // Make a fetch request to the server with the token in the headers
        const response = await axios.get('/api/v1/comment', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       

        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = response.data;
        // Use response.data instead of response.json()
        // Update the state with the fetched data
        setData(jsonData);
        // console.log(jsonData)
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchData();
  }, []); // Include navigate in the dependencies array to address the React Hook useEffect has a missing dependency warning

  return (
    <>
      <div style={{ display: 'flex', right: '1rem', position: 'absolute' }}>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <WriteBox />
      <p style={{ color: 'black' }}>Comments and their replies</p>
      <div>
        {dataa.map((item, index) => (
          <CommentBox key={index} data={item} />
        ))}
      </div>
    </>
  );
};

export default Data;
