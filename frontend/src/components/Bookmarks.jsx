import React, { useEffect, useState } from 'react';
import Tweet from './Tweet';
import GetTweets from '../getTweets';
import './css/Profile.css';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import "../App.css";

const Bookmarks = () => {
  const [post, setPost] = useState([]);
  const [currentAccount, setCurrentAccount] = useState('');

  const getAccount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    setCurrentAccount(accounts[0]);
  }

  getAccount();

  const profileDetails = {
    username: currentAccount,
    tweetsCount: post.length,
    tokenCount: 46,
    nftCount: 78
  };

  const setTweets = async () => {
    try {
      const tweets = await GetTweets();
      let account = currentAccount.toUpperCase();
      console.log(account);

      const response = await fetch(`http://localhost:3011/bookmarks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Bookmarks:', data);
      const bookmarkIds = data.map(item => item.tweetId);

      const reqTweets = tweets.filter(tweet => bookmarkIds.includes(tweet.id));
      console.log('Filtered Tweets:', reqTweets);

      setPost(reqTweets);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  }

  useEffect(() => {
    if (currentAccount) setTweets();
  }, [currentAccount]);

  return (
    <div className="app">
      <Sidebar />
      <div className="profile-page">
        <div className="profile-banner">
          <img src="https://via.placeholder.com/150" alt="Profile" className='profile-pic' />
        </div>
        <div className="profile-info">
          <div className="profile-details">
            <p>{profileDetails.username}</p>
            <div className="profile-stats">
              <span><strong>{profileDetails.tweetsCount}</strong> Tweets</span>
              <span><strong>{profileDetails.tokenCount}</strong> Tokens</span>
              <span><strong>{profileDetails.nftCount}</strong> NFTs</span>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-tab">Your Bookmarks</div>

          <div className="profile-tweets">
            {post.length === 0 ? (
              <p>Loading tweets...</p>
            ) : (
              post.map((post) => (
                <Tweet
                  key={post.id}
                  id={post.id}
                  displayName={post.username}
                  title={post.tweetTitle}
                  text={post.tweetText}
                  time={post.time}
                  personal={post.personal}
                  upvote={post.upvote}
                  downvote={post.downvote}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
}

export default Bookmarks;