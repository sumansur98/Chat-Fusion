import {
	Backdrop,
	Box,
	Button,
	Drawer,
	Grid,
	IconButton,
	Stack,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import React, { useState, useEffect, lazy, Suspense } from "react";
import {
	KeyboardBackspace as KeyboardBackspaceIcon,
	Menu as MenuIcon,
	Edit as EditIcon,
	Done as DoneIcon,
	Add as AddIcon,
	Delete as DeleteIcon
} from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats, sampleUsers } from "../constants/SampleData";
import UserItem from "../components/shared/UserItem";

const ConfirmDeleteDialog = lazy(() => import('../components/dialogs/ConfirmDeleteDialog'));
const AddMemberDialog = lazy(() => import('../components/dialogs/AddMemberDialog'));

const isAddMember = false;

const Groups = () => {
	const chatId = useSearchParams()[0].get("group");
	console.log("chat id", chatId);

	const navigate = useNavigate();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [groupName, setGroupName] = useState("");
	const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
	const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)

	const navigateBack = () => {
		navigate("/");
	};

	const handleMobile = () => {
		setIsMobileMenuOpen((prev) => !prev);
	};

	const handleMobileClose = () => setIsMobileMenuOpen(false);

	const updateGroupName = () => {
		setIsEdit(false);
	};

	const openConfirmDeleteHandler = () => {
		setConfirmDeleteDialog(true);
		console.log('delete');
	}

	const closeConfirmDeleteHandler = () => {
		setConfirmDeleteDialog(false);
		console.log('delete');
	}

	const openAddMemberHandler = () => {
		setConfirmDeleteDialog(false);
		console.log('add');
	}

	const deleteHandler = () => {
		console.log('delete handler')
	}

	const removeMemberHandler = (id) => {
		console.log('remove', id)
	}

	useEffect(() => {
		if (chatId) {
			setGroupName("Group Name");
			setGroupNameUpdatedValue("Group Name");
		}

		return () => {
			setGroupName("");
			setGroupNameUpdatedValue("");
			setIsEdit(false);
		};
	}, [chatId]);

	const GroupName = (
		<Stack
			direction={"row"}
			alignItems={"center"}
			padding={"3rem"}
			spacing={"1rem"}
		>
			{isEdit ? (
				<>
					<TextField
						value={groupNameUpdatedValue}
						onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
					/>
					<IconButton onClick={updateGroupName}>
						<DoneIcon />
					</IconButton>
				</>
			) : (
				<>
					<Typography variant="h4">{groupName}</Typography>
					<IconButton onClick={() => setIsEdit(true)}>
						<EditIcon />
					</IconButton>
				</>
			)}
		</Stack>
	);

	const ButtonGroup = (
		<Stack
			direction={{
				xs: 'column-reverse',
				sm: 'row'
			}}
			spacing={'1rem'}
			p={{
				xs: '0',
				sm: '1rem',
				md: '1rem 4rem'
			}}>
			<Button size='large' color="error" startIcon={<DeleteIcon />} onClick={openConfirmDeleteHandler}>Delete Group</Button>
			<Button size='large' variant="contained" startIcon={<AddIcon />} onClick={openAddMemberHandler}>Add Member</Button>
		</Stack>
	)

	return (
		<Grid container height={"100vh"}>
			<Grid
				item
				sx={{
					display: {
						xs: "none",
						sm: "block",
					},
					backgroundColor: "orange",
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
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					position: "relative",
					padding: "1rem 3rem",
				}}
			>
				<Box
					sx={{
						display: {
							xs: "block",
							sm: "none",
							position: "fixed",
							right: "1rem",
							top: "1rem",
						},
					}}
				>
					<IconButton onClick={handleMobile}>
						<MenuIcon />
					</IconButton>
				</Box>

				<Tooltip title="back">
					<IconButton
						sx={{
							position: "absolute",
							top: "2rem",
							left: "2rem",
							bgcolor: "rgba(0,0,0,0.8)",
							color: "white",
						}}
						onClick={navigateBack}
					>
						<KeyboardBackspaceIcon />
					</IconButton>
				</Tooltip>

				{groupName && (
					<>
						{GroupName}
						<Typography
							margin={"2rem"}
							alignSelf={"flex-start"}
							variant="body1"
						>
							Members
						</Typography>

						<Stack
							maxwidth={"45rem"}
							width={"100%"}
							boxSizing={"border-box"}
							padding={{
								sm: "1rem",
								xs: "0",
								md: "1rem 4rem",
							}}
							spacing={"2rem"}

							height={"50vh"}
							overflow={"auto"}
						>
							{
								sampleUsers.map(i => (
									<UserItem key={i._id} user={i} isAdded={true} styling={{
										boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
										padding: '1rem 2rem',
										borderRadius: '1rem'
									}}
										handler={removeMemberHandler} />
								))
							}
						</Stack>

						{ButtonGroup}
					</>
				)}
			</Grid>

			{
				isAddMember && (
					<Suspense fallback={<Backdrop open />}>
						<AddMemberDialog />
					</Suspense>
				)
			}

			{confirmDeleteDialog && (
				<Suspense fallback={<Backdrop open />}>
					<ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler} />
				</Suspense>
			)}

			<Drawer
				sx={{
					xs: "block",
					sm: "none",
				}}
				open={isMobileMenuOpen}
				onClose={handleMobileClose}
			>
				<GroupList w="50vw" myGroups={sampleChats} chatId={chatId} />
			</Drawer>
		</Grid>
	);
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
	return (
		<Stack width={w}>
			{myGroups.length > 0 ? (
				myGroups.map((group) => (
					<GroupListItem key={group._id} group={group} chatId={chatId} />
				))
			) : (
				<Typography textAlign={"center"} padding={"1rem"}>
					No Groups Found
				</Typography>
			)}
		</Stack>
	);
};

const GroupListItem = ({ group, chatId }) => {
	const { name, avatar, _id } = group;
	return (
		<Link
			to={`?group=${_id}`}
			onClick={(e) => {
				if (chatId === _id) e.preventDefault();
			}}
		>
			<Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
				<AvatarCard avatar={avatar} />
				<Typography>{name}</Typography>
			</Stack>
		</Link>
	);
};

export default Groups;
