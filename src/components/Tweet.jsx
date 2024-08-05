import React from 'react';
import './css/Tweet.css'
import { forwardRef } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';
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

    return (
      <div className="post" ref={ref} key={id}>
        <div className="post__body">
          <h2 className="post__title">{title}</h2>
          <div className="post__header">
            <div className="post__headerText">
              <h3 className="post__displayName">{displayName}</h3>
              <span className="post__time">{time}</span> {/* Optional time display */}
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          <div className="post__footer">
            <ChatBubbleOutlineIcon fontSize="small" />
            <DeleteIcon fontSize='small' onClick={deleteTweet} />
            <FavoriteBorderIcon fontSize="small" onClick={increaseVotes} /> {upvote}
            <PublishIcon fontSize="small" onClick={decreaseVotes} /> {downvote}
            {/* Uncomment for delete icon functionality */}
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