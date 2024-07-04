import React, { useState, useEffect } from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import Table from '../../components/shared/Table'
import { dashboardData } from '../../constants/SampleData'
import { Avatar, Box, Stack } from '@mui/material'
import { fileFormat, transformImage } from '../../lib/features'
import moment from 'moment'
import RenderAttachment from '../../components/shared/RenderAttachment'

const columns = [{
    field: 'id',
    headerName: 'ID',
    headerClassName: 'table-header',
    width: 200
}, {
    field: 'attachments',
    headerName: 'Attachments',
    headerClassName: 'table-header',
    width: 200,
    renderCell: (params) => {
        const { attachments } = params.row;
        return attachments?.length > 0
            ? attachments.map(i => {
                const url = i.url;
                const file = fileFormat(url);
                return (
                    <Box>
                        <a href={url} download target='_blank' style={{ color: black }}>
                            {RenderAttachment(file, url)}
                        </a>

                    </Box>
                )
            })  : "No attachments"
    }
}, {
    field: 'content',
    headerName: 'Content',
    headerClassName: 'table-header',
    width: 200
}, {
    field: 'sender',
    headerName: 'Sent By',
    headerClassName: 'table-header',
    width: 200,
    renderCell: (params) => (
        <Stack>
            <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
            <span>{params.row.sender.name}</span>
        </Stack>
    )
}, {
    field: 'chat',
    headerName: 'Chat',
    headerClassName: 'table-header',
    width: 200
}, {
    field: 'groupChat',
    headerName: 'Groups Chat',
    headerClassName: 'table-header',
    width: 200
},
{
    field: 'createdAt',
    headerName: 'Time',
    headerClassName: 'table-header',
    width: 200
},]

const MessageManagement = () => {
    const [rows, setRows] = useState([])

    useEffect(() => {
        setRows(dashboardData.messages.map(i => ({
            ...i,
            id: i._id,
            sender: {
                name: i.sender.name,
                avatar: transformImage(i.sender.avatar, 50)
            },
            createdAt: moment(i.createdAt).format('DD MMM YYYY')
        })))
    }, [])


    return (
        <AdminLayout>
            <Table heading={'All Messages'} rows={rows} columns={columns} />
        </AdminLayout>
    )
}

export default MessageManagement