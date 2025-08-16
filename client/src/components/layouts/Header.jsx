import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, {Suspense, lazy, useState} from 'react';
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Add as AddIcon,
    Group as GroupIcon,
    Logout as LogoutIcon,
    Notifications as NotificationIcon
} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../constants/config';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../../redux/reducers/auth';
import toast from 'react-hot-toast';
import { setIsMobile, setIsNotification, setIsSearch } from '../../redux/reducers/misc';

const SearchDialog = lazy(()=>import('../specifics/Search'))
const NotificationsDialog = lazy(()=>import('../specifics/Notifications'))
const NewGroupDialog = lazy(()=>import('../specifics/NewGroup'))

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isNewGroup, setIsNewGroup] = useState(false);
    const {isSearch} = useSelector((state) => state.misc);
    const {isNotification} = useSelector((state) => state.misc);
    

    const handleMobile = () => {
        console.log('mobile');
        dispatch(setIsMobile(true));
    }

    const openSearchDialog = () => {
        console.log('openSearchDialog');
        dispatch(setIsSearch(true))
    }

    const openNewGroup = () => {
        console.log('openNewGroup');
        setIsNewGroup(prev => !prev);
    }

    const navigateToGroup = () => {
        console.log('navigateToGroup');
        navigate("/groups")
    }

    const openNotification = () => {
        // setIsNotification(prev => !prev);
        dispatch(setIsNotification(true))
    }

    const logoutHandler = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.get(`${server}/api/v1/user/logout`,{withCredentials:true});
            dispatch(userNotExists());
            toast.success(data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message ||  'Something went wrong'+error);
        }
    }

    return (
        <div>
            <Box
                flexGrow={1}
                height={'4rem'}>
                <AppBar
                    position='static'
                    sx={{ bgcolor: 'orange' }}>
                    <Toolbar>
                        <Typography
                            variant='h6'
                            sx={{ display: { xs: 'none', sm: 'block' } }}>
                            Chat Fusion
                        </Typography>
                        <Box
                            sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <IconButton color='inherit' onClick={handleMobile}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box>

                            <IconBtn
                                title='Search'
                                onClick={openSearchDialog}
                                icon={<SearchIcon />} />

                            <IconBtn
                                title='New Group'
                                onClick={openNewGroup}
                                icon={<AddIcon />} />

                            <IconBtn
                                title='Manage Groups'
                                onClick={navigateToGroup}
                                icon={<GroupIcon />} />

                            <IconBtn
                                title='Notifications'
                                onClick={openNotification}
                                icon={<NotificationIcon />} />

                            <IconBtn
                                title='Logout'
                                onClick={logoutHandler}
                                icon={<LogoutIcon />} />
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            {
                isSearch && (
                    <Suspense fallback={<Backdrop open/>}>
                        <SearchDialog/>
                    </Suspense>
                )
            }
            {
                isNewGroup && (
                    <Suspense fallback={<Backdrop open/>}>
                        <NewGroupDialog/>
                    </Suspense>
                )
            }
            {
                isNotification && (
                    <Suspense fallback={<Backdrop open/>}>
                        <NotificationsDialog/>
                    </Suspense>
                )
            }
        </div>
    )
}

const IconBtn = ({ title, onClick, icon }) => {
    return (
        <Tooltip title={title}>
            <IconButton color='inherit' size='large' onClick={onClick}>
                {icon}
            </IconButton>
        </Tooltip>
    )
}

export default Header