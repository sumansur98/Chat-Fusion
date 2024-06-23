import { Box, Typography } from '@mui/material';
import React, { memo } from 'react';
import moment from "moment";

const MessageComponent = ({ message, user }) => {

    const { sender, content, attachments = [], createdAt } = message;

    const sameSender = sender?._id === user?._id;

    const timeAgo = moment(createdAt).fromNow();

    return (
        <div
            style={{
                alignSelf: sameSender ? 'flex-end' : 'flex-start',
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '5px',
                padding: '0.5rem',
                width: 'fit-content'
            }}>
            {
                !sameSender && (
                    <Typography
                        color={'blue'}
                        fontWeight={600}
                        variant='caption'>
                        {sender.name}
                    </Typography>
                )
            }

            {
                content && <Typography>{content}</Typography>
            }

            {/* attachments here */}


            <Typography
                variant='caption'
                color={'text.secondary'}>
                {timeAgo}
            </Typography>

            {
                attachments.length>0 && (
                    attachments.map((i, index) => {
                        const url = i.url;
                        const file = 'asd';
                        return (
                            <Box key={index}>
                                <a 
                                href=""
                                target='_blank'
                                download
                                style={{
                                    color:'black'
                                }}>
                                    
                                </a>
                            </Box>
                        )
                    })
                )
            }

        </div>
    )
}

export default memo(MessageComponent);