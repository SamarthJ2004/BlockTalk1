import React, { useEffect, useState } from 'react';
import Tweet from './Tweet';
import GetTweets from '../getTweets';
import './css/Profile.css';

const Profile = () => {
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
		const tweets = await GetTweets();
		const personalTweets = tweets.filter(tweet => tweet.personal);
		setPost(personalTweets);
	}

	useEffect(() => {
		setTweets();
	}, []);

	return (
		<div className="profile-page">
			<div className="profile-banner">
				<img src="https://via.placeholder.com/150" alt="Profile" className='profile-pic'/>
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
				<div className="profile-tabs">
					<button className="active">Tweets</button>
					<button>Liked/Bookmarked</button>
				</div>

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
	);
}

export default Profile;