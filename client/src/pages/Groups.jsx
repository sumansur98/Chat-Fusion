import { Box, Drawer, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import React, { useState } from 'react'
import { KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats } from '../constants/SampleData';

const Groups = () => {

	const chatId = 'afdasdfaf';

	const navigate = useNavigate()
	const navigateBack = () => {
		navigate('/')
	}

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const handleMobile = () => {
		setIsMobileMenuOpen(prev => !prev)
	}

	const handleMobileClose = () => setIsMobileMenuOpen(false)

	return (
		<Grid container height={'100vh'}>
			<Grid
				item
				sx={{
					display: {
						xs: 'none',
						sm: 'block'
					},
					backgroundColor: 'orange'
				}}
				sm={4}
			>
				<GroupList myGroups={sampleChats} chatId={chatId} />
			</Grid>

			<Grid
				item
				xs={12}
				sm={8}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					position: 'relative',
					padding: '1rem 3rem'
				}}>

				<Box
					sx={{
						display: {
							xs: 'block',
							sm: 'none',
							position: 'fixed',
							right: '1rem',
							top: '1rem'
						}
					}}>
					<IconButton onClick={handleMobile}>
						<MenuIcon />
					</IconButton>
				</Box>

				<Tooltip title='back'>
					<IconButton
						sx={{
							position: 'absolute',
							top: '2rem',
							left: '2rem',
							bgcolor: 'rgba(0,0,0,0.8)',
							color: 'white'
						}}
						onClick={navigateBack}>
						<KeyboardBackspaceIcon />
					</IconButton>
				</Tooltip>
			</Grid>

			<Drawer sx={{
				xs: 'block',
				sm: 'none'
			}} open={isMobileMenuOpen} onClose={handleMobileClose}>
				<GroupList w='50vw' myGroups={sampleChats} chatId={chatId}/>
			</Drawer>

		</Grid>
	)
}

const GroupList = ({ w = '100%', myGroups = [], chatId }) => {
	return (
		<Stack width={w}>
			{
				myGroups.length > 0 ? (
					myGroups.map(group => <GroupListItem key={group._id} group={group} chatId={chatId} />)
				) : (
					<Typography textAlign={'center'} padding={'1rem'}>No Groups Found</Typography>
				)
			}
		</Stack>
	)
}

const GroupListItem = ({ group }) => {
	const { name, avatar, _id, chatId } = group;
	return (
		<Link to={`?group=${_id}`}>
			<Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
				<AvatarCard avatar={avatar} />
				<Typography>{name}</Typography>

			</Stack>
		</Link>
	)
}

export default Groups