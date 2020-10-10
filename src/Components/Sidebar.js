import React, { useEffect, useState } from 'react'
import '../styles/Sidebar.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AddIcon from '@material-ui/icons/Add';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import SidebarChannel from './SidebarChannel';
import { Avatar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db, { auth } from '../firebase';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { selectDrawer, setDrawerActive } from '../features/drawerSlice';

const useStyles = makeStyles({
    drawer: {
        backgroundColor: '#2f3135'
    },
  });
  
  
function Sidebar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const drawer = useSelector(selectDrawer);
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);
    const [isCollapsed, setIsCollaped] = useState(true);

    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => (
            setChannels(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    channel: doc.data()
                }))
            )
        ))
    }, [])

    const handleAddChannel = () => {
        const channelName = prompt('Enter a new channel name');

        if (channelName) {
            db.collection('channels').add({channelName});
        }
    }

    const handleCollapse = () => (
        setIsCollaped(!isCollapsed)
    );

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }

        dispatch(
            setDrawerActive({
                active: !drawer
            })
        )
    };

    const Channels = () => (
        <>
            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        { isCollapsed 
                            ? <ExpandMoreIcon fontSize="large" onClick={handleCollapse}/>
                            : <ExpandLessIcon fontSize="large" onClick={handleCollapse} />
                        }
                        <h4>Channels</h4>
                    </div>

                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
                </div>

                <div className="sidebar__channelsList" style={{display: isCollapsed ? '' : 'none'}}>
                    {channels.map(({ id, channel }) => (
                        <SidebarChannel 
                            key={id} 
                            id={id} 
                            channelName={channel.channelName}
                        />
                    ))}
                </div>
            
            </div>

            <div className="sidebar__voice">
                <SignalCellularAltIcon
                    className="sidebar__voiceIcon"
                    fontSize="large"
                />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
            </div>

            <div className="sidebar__profile">
                <Avatar 
                    onClick={() => auth.signOut()}
                    src={user?.photo}
                    alt={user?.displayName}
                    style={{cursor: 'pointer'}}
                />
                <div className="sidebar__profileInfo">
                    <h3>{user?.displayName}</h3>
                    <p>{user?.uid.substring(0, 10)}</p>
                </div>

                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </>
    )

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>{user?.displayName}</h3>
            </div>
            <SwipeableDrawer
                anchor={'left'}
                open={drawer}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
                onClick={toggleDrawer('left')}
                className={clsx(classes.drawer)}
            >
                <Channels />
            </SwipeableDrawer>
            <Channels />
        </div>
    )
}

export default Sidebar
