import React from 'react';
import '../stylesheets/dataCard.css';
import Profile from './Profile';
import NotificationCard from './NotificationCard';

const DataCard = () => {
    return (
            <div class="container">
            <div class="card">
            <Profile/>
            </div>
            <div class="card">
            <NotificationCard/>
            </div>
          </div>
    );
};

export default (DataCard);