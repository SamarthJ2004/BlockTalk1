import React from 'react';
import axios from 'axios';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState } from 'react';

const BookmarkButton = ({ title, text, displayName }) => {

  const [currentAccount, setCurrentAccount] = useState('');
  const getAccount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    setCurrentAccount(accounts[0]);
  }

  getAccount();


  const handleBookmark = async () => {
    try {
      await axios.post('http://localhost:3011/api/bookmarks',
        { 
          title: title, 
          body: text, 
          acc: displayName
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Bookmarked successfully!');
    } catch (error) {
      console.error('Error bookmarking:', error);
      alert('Failed to bookmark.');
    }
  };

  return (
    <BookmarkIcon
      fontSize="small"
      onClick={handleBookmark}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default BookmarkButton;
