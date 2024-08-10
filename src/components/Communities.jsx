import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Communities = () => {
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3010/communities')
            .then(response => {
                setCommunities(response.data.account);
            })
            .catch(error => {
                console.error('Error fetching communities:', error);
            });
      }, []);


  return (
    <div>
      <h1>Communities</h1>
            {communities.map((community, index) => (
                <div key={index}>
                    <h2>{community.account}</h2>
                    
                </div>
            ))}
    </div>
  )
}

export default Communities
