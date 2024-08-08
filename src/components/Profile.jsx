import React, { useEffect, useState } from 'react';
import Post from './Post';
import Tweet from './Tweet';
import GetTweets from '../getTweets';

const Profile = () => {

	const [post, setPost] = useState([]);

	const setTweets = async () => {
		const tweets = await GetTweets();
		const personalTweets = tweets.filter(tweet => tweet.personal);
		setPost(personalTweets);
	}

	useEffect(() => {
		setTweets();
	}, []);

	return (
		<div className="main-content feed">
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
	);
}

export default Profile
