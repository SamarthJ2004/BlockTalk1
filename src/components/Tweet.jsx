import React from 'react';
import './css/Tweet.css'
import { forwardRef } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { ethers } from 'ethers';
import Twitter from '../jsonFiles/BlockTalkContract.json';

const Tweet = forwardRef(
  ({ id, displayName, title, text, time, personal, upvote, downvote }, ref) => {
    const TwitterContractAddress = "0xB918f0Dd469600a45D2cC12a2B6b7b0745755D22";

    const increaseVotes = async () => {
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

          await TwitterContract.upvote(id);
          console.log("The vote was increased");
        } else {
          console.log("Ethereum object doesn't exist");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const decreaseVotes = async () => {
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

          await TwitterContract.downvote(id);
          console.log("The vote was decreased");
        } else {
          console.log("Ethereum object doesn't exist");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const deleteTweet = async () => {
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

          await TwitterContract.deleteTweet(id, true);
          console.log("The tweet was deleted");
        } else {
          console.log("Ethereum object doesn't exist");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getTimeDifference = (blockTimestamp) => {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const differenceInSeconds = currentTime - blockTimestamp; // Difference in seconds

      // Constants for time calculations
      const secondsInDay = 60 * 60 * 24; // Total seconds in a day
      const secondsInHour = 60 * 60; // Total seconds in an hour

      // Calculate total days and remaining hours
      const days = Math.floor(differenceInSeconds / secondsInDay);
      const hours = Math.floor((differenceInSeconds % secondsInDay) / secondsInHour);

      return { days, hours };
    }

    const { days, hours } = getTimeDifference(time);

    return (
      <div className="post" ref={ref} key={id}>

        <div className="post__body">
          <h2 className="post__title">{title}</h2>

          <div className="post__headerText">
            <h3 className="post__displayName">{displayName}</h3>
            <span className="post__time">{days > 0 && `${days} day(s), `}
              {hours > 0 && `${hours} hours`} 
              {(days === 0 && hours === 0)?'Just now':' ago'}</span>
          </div>

          <div className="post__headerDescription">{text}</div>

          <div className="post__footer">
            < BookmarkIcon fontSize="small" />
            <DeleteIcon fontSize='small' onClick={deleteTweet} />
            <div>
              <ThumbUpIcon fontSize="small" onClick={increaseVotes} /> {upvote}
            </div>
            <div>
              <ThumbDownIcon fontSize="small" onClick={decreaseVotes} /> {downvote}
            </div>
            {/* {personal ? (
              <DeleteIcon fontSize="small" onClick={onClick}/>
            ) : null} */}
          </div>

        </div>
      </div>
    );
  }
);

export default Tweet;