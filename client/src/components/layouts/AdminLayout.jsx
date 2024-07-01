import {
    Close as CloseIcon,
    Menu as MenuIcon,
    ManageAccounts as ManageAccountsIcon,
    Dashboard as DashboardIcon,
    Groups as GroupsIcon,
    Message as MessageIcon,
    ExitToApp as ExitToAppIcon,
} from '@mui/icons-material'
import { Box, Drawer, Grid, IconButton, Stack, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, Link as LinkComponent, Navigate } from 'react-router-dom'

const Link = styled(LinkComponent)`
text-decoration: none;
border-radius: 2rem;
padding: 1rem 2rem;
color: black;
&:hover {
color: rgba(0, 0, 0, 0.54);
}
`;

const adminTabs = [{
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: <DashboardIcon />
}, {
    name: 'Users',
    path: '/admin/users',
    icon: <ManageAccountsIcon />
}, {
    name: 'Chats',
    path: '/admin/chats',
    icon: <GroupsIcon />
}, {
    name: 'Messages',
    path: '/admin/messages',
    icon: <MessageIcon />
},]

const Sidebar = ({ w = '100%' }) => {

    const location = useLocation();

    const logoutHandler = ()=>{}

    return (
        <Stack width={w} direction={'column'} p='3rem' spacing={'3rem'}>
            <Typography variant='h5' textTransform={'uppercase'}>
                Chat Fusion
            </Typography>

            <Stack direction={'column'}>
                {
                    adminTabs.map(tab => (
                        <Link key={tab.path} to={tab.path} sx={{ color: 'black' }}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            sx={
                                location.pathname === tab.path && {
                                    bgcolor: 'black',
                                    color: 'white',
                                    ":hover": { color: 'white' }
                                }
                            }>
                            <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                                {tab.icon}
                                <Typography>{tab.name}</Typography>
                            </Stack>
                        </Link>
                    ))
                }
                <Link onClick={logoutHandler}>
                    <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                        <ExitToAppIcon />
                        <Typography>Logout</Typography>
                    </Stack>
                </Link>
            </Stack>
        </Stack>
    )
}

const isAdmin = true;
const AdminLayout = ({ children }) => {

    const [isMobile, setIsMobile] = useState(false)

    const handleMobile = () => { setIsMobile(prev => !prev) }
    const handleClose = () => { setIsMobile(false) }

    if(!isAdmin) return <Navigate to={'/admin'}></Navigate>

    return (
        <Grid container minHeight={'100vh'}>

            <Box
                sx={{
                    display: { xs: 'block', md: 'none' },
                    position: 'fixed',
                    top: '1rem',
                    right: '1rem'
                }}>
                <IconButton onClick={handleMobile}>
                    {
                        isMobile ? <CloseIcon /> : <MenuIcon />
                    }

                </IconButton>
            </Box>

            <Grid
                item
                md={4}
                lg={3}
                sx={{
                    display: {
                        xs: 'none',
                        md: 'block'
                    }
                }}>
                <Sidebar></Sidebar>
            </Grid>
            <Grid item
                xs={12}
                md={8}
                lg={9}
                sx={{
                    bgcolor: '#f5f5f5'
                }}
            >
                {children}
            </Grid>

            <Drawer open={isMobile} onClose={handleClose}>
                <Sidebar w='50vw' />
            </Drawer>
        </Grid>
    )
}

export default AdminLayout