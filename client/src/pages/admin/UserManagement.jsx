import React, {useEffect, useState} from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import Table from '../../components/shared/Table'
import { WidthFull } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { dashboardData } from '../../constants/SampleData'
import { transformImage } from '../../lib/features'

const columns = [{
  field : 'id',
  headerName : 'ID',
  headerClassName : 'table-header',
  width : 200
},{
  field : 'avatar',
  headerName : 'Avatar',
  headerClassName : 'table-header',
  width : 200,
  renderCell : (params) => (
    <Avatar alt={params.row.name} src={params.row.avatar}/>
  )
},{
  field : 'name',
  headerName : 'Name',
  headerClassName : 'table-header',
  width : 200
},{
  field : 'userName',
  headerName : 'User Name',
  headerClassName : 'table-header',
  width : 200
},{
  field : 'friends',
  headerName : 'Friends',
  headerClassName : 'table-header',
  width : 200
},{
  field : 'groups',
  headerName : 'Groups',
  headerClassName : 'table-header',
  width : 200
},]

const UserManagement = () => {

  const [rows, setRows] = useState([])

  useEffect(() => {
    setRows (dashboardData.users.map((i) => ({ ...i, id: i._id, avatar: transformImage(i.avatar) })));
  },[]);

  return (
    <AdminLayout>
      <Table heading={'All Users'} columns={columns} rows={rows}/>
    </AdminLayout>
  )
}

export default UserManagement