

export const getOtherMember = (userId, members) => {
    return members.find(member => member._id.toString() !== userId.toString())
}