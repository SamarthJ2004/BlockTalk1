import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const BookmarkButton = ({ postId }) => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserAddress = async () => {
      const address = await getUserAddress();
      setUserId(address);
    };

    fetchUserAddress();
  }, []);

  const handleBookmark = async () => {
    if (!userId || !postId) {
      alert('User ID or Post ID is missing');
      return;
    }

    try {
      await axios.post('http://localhost:3010/api/bookmarks', { userId, postId }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
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
