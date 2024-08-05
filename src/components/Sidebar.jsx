import React from 'react';
import './css/Sidebar.css';

const Sidebar = ({ account }) => {
  return (
    <div className='sidebar'>
      <div className="sidebar-main">
        <div className="logo">BLOCKTALK</div>
        <div className="sidebar-item"><i className="fas fa-home icon"></i> Home</div>
        <div className="sidebar-item"><i className="fas fa-hashtag icon"></i> Explore</div>
        <div className="sidebar-item"><i className="far fa-bell icon"></i> Updates</div>
        <div className="sidebar-item"><i className="fas fa-users icon"></i> Communities</div>
        <div className="sidebar-item"><i className="far fa-bookmark icon"></i> Bookmarks</div>
        <div className="sidebar-item"><i className="fa-solid fa-heart icon"></i> My Likes</div>
        <div className="sidebar-item"><i className="fas fa-ellipsis-h icon"></i> More</div>
      </div>
      <div className='sidebar-profile'>
        <i className="far fa-user icon" />
        <div className='profile__content'>
          <a href="/profile">My Profile</a>
          {account}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;