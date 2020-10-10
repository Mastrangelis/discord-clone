import React from 'react'
import '../styles/Message.css';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  }));

function Message({
    message,
    user,
    timestamp
}) {
    const classes = useStyles();
    return (
        <div className="message">
            <Avatar
                src={user?.photo}
                alt={user?.displayName}
                className={classes.large}
            />
            <div className="message__info">
                <h4>
                    {user?.displayName}
                    <span className="message__timestamp">
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                </h4>

                <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
