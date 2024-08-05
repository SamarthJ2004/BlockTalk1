import React, { useEffect, useState } from 'react';
import './css/MainContent.css';
import Post from './Post';
import Tweet from './Tweet';
import { ethers } from 'ethers';
import Twitter from '../jsonFiles/BlockTalkContract.json';

function MainContent({ personal }) {
  const TwitterContractAddress = "0xB918f0Dd469600a45D2cC12a2B6b7b0745755D22";
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
        'upvote': tweet.upvote._hex,
        'downvote': tweet.downvote._hex,
        'time': tweet.time._hex,
        'reward': tweet.reward,
        'personal': isPersonal
      };

      updatedTweets.push(updatedTweet);
    }
    return updatedTweets;
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

  // const deleteTweet = key => async() => {
  //   console.log(key);

  //   // Now we got the key, let's delete our tweet
  //   try {
  //     const {ethereum} = window

  //     if(ethereum) {
  //       const provider = new ethers.providers.Web3Provider(ethereum);
  //       const signer = provider.getSigner();
  //       const TwitterContract = new ethers.Contract(
  //         TwitterContractAddress,
  //         Twitter.abi,
  //         signer
  //       );

  //       let deleteTweetTx = await TwitterContract.deleteTweet(key, true);
  //       let allTweets = await TwitterContract.getAllTweets();
  //       setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
  //     } else {
  //       console.log("Ethereum object doesn't exist");
  //     }

  //   } catch(error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className="main-content feed">
      <h2>Home</h2>
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