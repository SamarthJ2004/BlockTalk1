import React, { useEffect, useState } from 'react';
import './css/MainContent.css';
import Post from './Post';
import Tweet from './Tweet';
import { ethers } from 'ethers';
import Twitter from '../jsonFiles/BlockTalkContract.json';
import { BLOCKTALK_CONTRACT } from '../config';

function MainContent() {
  const TwitterContractAddress = BLOCKTALK_CONTRACT;
  const [post, setPost] = useState([]);

  const getUpdatedTweets = (allTweets, address) => {
    let updatedTweets = [];

    for (let i = 0; i < allTweets.length; i++) {
      const tweet = allTweets[i];
      const isPersonal = tweet.username.toLowerCase() === address.toLowerCase();
      const updatedTweet = {
        'id': tweet.id._hex,
        'tweetTitle': tweet.title,
        'tweetText': tweet.tweetText,
        'isDeleted': tweet.isDeleted,
        'username': tweet.username,
        'upvote': parseInt(tweet.upvote._hex, 16),
        'downvote': parseInt(tweet.downvote._hex, 16),
        'time': parseInt(tweet.time._hex, 16),
        'reward': tweet.reward,
        'personal': isPersonal
      };

      updatedTweets.push(updatedTweet);
    }
    return updatedTweets.reverse();
  }

  const getTweets = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        )

        let allTweets = await TwitterContract.getAllTweets();
        let updatedTweets = getUpdatedTweets(allTweets, ethereum.selectedAddress);
        setPost(updatedTweets);
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <div className="main-content feed">
      <Post />
      {post.map((post) => (
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
      ))}
    </div>
  );
}

export default MainContent;