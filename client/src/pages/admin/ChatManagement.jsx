import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import Table from '../../components/shared/Table'
import { WidthFull } from '@mui/icons-material'
import { Avatar, Stack } from '@mui/material'
import { dashboardData } from '../../constants/SampleData'
import { transformImage } from '../../lib/features'
import AvatarCard from '../../components/shared/AvatarCard'

const columns = [{
  field: 'id',
  headerName: 'ID',
  headerClassName: 'table-header',
  width: 200
}, {
  field: 'avatar',
  headerName: 'Avatar',
  headerClassName: 'table-header',
  width: 200,
  renderCell: (params) => (
    <AvatarCard avatar={params.row.avatar} />
  )
}, {
  field: 'name',
  headerName: 'Name',
  headerClassName: 'table-header',
  width: 200
}, {
  field: 'totalMembers',
  headerName: 'Total Members',
  headerClassName: 'table-header',
  width: 200
}, {
  field: 'members',
  headerName: 'Members',
  headerClassName: 'table-header',
  width: 200,
  renderCell: (params) => (
    <AvatarCard max={100} avatar={params.row.members} />
  )
}, {
  field: 'totalMessages',
  headerName: 'Total Messages',
  headerClassName: 'table-header',
  width: 200
}, {
  field: "creator",
  headerName: "Created By",
  headerClassName: "table-header",
  width: 250,
  renderCell: (params) => (
    <Stack direction="row" alignItems="center" spacing={"1rem"}>
      <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
      <span>{params.row.creator.name}</span>
    </Stack>
  )
}]
const ChatManagement = () => {

  const [rows, setRows] = useState([])

  useEffect(() => {
    setRows(
      dashboardData.chats.map(i => ({
        ...i,
        id : i._id,
        avatar : i.avatar.map(j => transformImage(j, 50)),
        members : i.members.map(j => transformImage(j.avatar, 50))
      }))
    )
  

  }, [])
  

  return(
    <AdminLayout>
        <Table heading={'All Chats'} columns={columns} rows={rows} />
    </AdminLayout >
  )
}

export default ChatManagement