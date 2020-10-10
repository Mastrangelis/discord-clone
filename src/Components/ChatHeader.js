import React, { useState } from 'react'
import '../styles/ChatHeader.css';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EditLocalRoundedIcon from '@material-ui/icons/EditLocationRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import { Spin } from 'react-burgers'
import { useDispatch, useSelector } from 'react-redux';
import { setDrawerActive, selectDrawer } from '../features/drawerSlice';

function ChatHeader({
    channelName
}) {
    const dispatch = useDispatch();
    const drawer = useSelector(selectDrawer);

    const handleDrawer = (e) => {
        e.preventDefault();

        dispatch(
            setDrawerActive({
                active: !drawer
            })
        )
    }

    return (
        <div className="chatHeader">
            <div className="chatHeader__left">
                {channelName && (
                    <h3>
                        <span className="chatHeader__hash">
                            #
                        </span>
                        {channelName}
                    </h3>
                )}
            </div>
            <div className="chatHeader__right">
                <NotificationsIcon />
                <EditLocalRoundedIcon />
                <PeopleAltRoundedIcon />
            
                <div className="chatHeader__search">
                    <input placeholder="Search" />
                    <SearchRoundedIcon />
                </div>
                
                <SendRoundedIcon />
                <HelpRoundedIcon />

                <div className="chatHeader__burger">
                    <Spin
                        active={false}
                        onClick={(e) => handleDrawer(e)}
                        color='gray'
                        width={25}
                        lineHeight={2}
                    />
                </div>
            </div>
            
        </div>
    )
}

export default ChatHeader
