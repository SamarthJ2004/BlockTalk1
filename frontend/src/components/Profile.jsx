import React, { useEffect, useState } from 'react';
import Tweet from './Tweet';
import GetTweets from '../getTweets';
import './css/Profile.css';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import EtherFunc from '../logic';
import "../App.css";

const Profile = () => {
  const [post, setPost] = useState([]);
  const [currentAccount, setCurrentAccount] = useState('');
  const [profile, setProfile] = useState({});

  const getAccount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    setCurrentAccount(accounts[0]);
  }

  getAccount();

  const getUser = async () => {
    const userDetails = await EtherFunc({ func: 'getUser', message: "We got the user", id: currentAccount });

    const profileDetails = {
      username: currentAccount,
      tweetsCount: post.length,
      tokenCount: parseInt(userDetails[1]._hex, 16),
      nftCount: userDetails[2].length
    };
    setProfile(profileDetails);
  }

  const setTweets = async () => {
    const tweets = await GetTweets();
    const personalTweets = tweets.filter(tweet => tweet.personal);
    setPost(personalTweets);
  }

  useEffect(() => {
    setTweets();
    getUser();
  }, [profile]);

  return (
    <div className="app">
      <Sidebar />
      <div className="profile-page">
        <div className="profile-banner">
          <img src="https://via.placeholder.com/150" alt="Profile" className='profile-pic' />
        </div>
        <div className="profile-info">
          <div className="profile-details">
            <p>{profile.username}</p>
            <div className="profile-stats">
              <span><strong>{profile.tweetsCount}</strong> Tweets</span>
              <span><strong>{profile.tokenCount}</strong> Tokens</span>
              <span><strong>{profile.nftCount}</strong> NFTs</span>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-tab">Your Tweets</div>

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

export default Profile;