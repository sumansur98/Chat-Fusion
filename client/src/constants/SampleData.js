export const sampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Suman Sur",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Sanjib Dolai",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png", "https://www.w3schools.com/howto/img_avatar.png", "https://www.w3schools.com/howto/img_avatar.png", "https://www.w3schools.com/howto/img_avatar.png"],
    name: "Atom",
    _id: "3",
    groupChat: true,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Suman Sur",
    _id: "1",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Sanjib Dolai",
    _id: "2",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Atom",
    _id: "3",
  },
];


export const sampleNotifications = [
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Sanjib Dolai",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Suman Sur",
    },
    _id: "2",
  },
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Ankita Saha",
    },
    _id: "3",
  },
];

export const sampleMsgs = [{
  attachments: [
    {
      public_id: "asdsad",
      url: "https://www.w3schools.com/howto/img_avatar.png",
    },
  ],
  content: "L*uda ka Message hai",
  _id: "sfnsdjkfsdnfkjsbnd",
  sender: {
    _id: "user._id",
    name: "Chaman"
  },
  chat: "chatId",
  createdAt: "2024-02-12T10:41:30.630Z",
}, {
  attachments: [
    {
      public_id: "asdsad",
      url: "https://www.w3schools.com/howto/img_avatar.png",
    },
  ],
  content: "L*uda ka Message hai",
  _id: "sfnsdjkfsdnfkjsbndasdf",
  sender: {
    _id: "asdfasdfsadf",
    name: "Chaman"
  },
  chat: "chatId",
  createdAt: "2024-02-12T10:41:30.630Z",
},]


export const dashboardData = {
  users: [{
    name: "John Doe",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    _id: "1",
    username: "john_doe",
    friends: 20,
    groups: 5,
  }, {
    name: "John Boi",
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    _id: "2",
    username: "john_boi",
    friends: 20,
    groups: 5,
  }
  ],

  chats: [{
    name: "LabadBass Group",
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    _id: "1",
    groupChat: false,
    members: [{ _id: '1', avatar: "https://www.w3schools.com/howto/img_avatar.png" },
    { _id: '2', avatar: "https://www.w3schools.com/howto/img_avatar.png" },
    ],
    totalMembers: 2,
    totalMessages: 20,
    creator: {
      name: "John Doe",
      avatar: "https://www.w3schools.com/howto/img_avatar.png"
    },
  }, {
    name: "LabadBass Group",
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    _id: "2",
    groupChat: false,
    members: [{ _id: '1', avatar: "https://www.w3schools.com/howto/img_avatar.png" },
    { _id: '2', avatar: "https://www.w3schools.com/howto/img_avatar.png" },
    ],
    totalMembers: 2,
    totalMessages: 20,
    creator: {
      name: "John Doe",
      avatar: "https://www.w3schools.com/howto/img_avatar.png"
    },
  }],

  messages: [
    {
      attachments: [],
      content: "L *uda ka Message hai",
      _id: "sfnsdjkfsdnfkjsbnd",
      sender: {
        id : "user._id",
        name: "Chaman"
      },
      chat: "chatld",
      createdAt: "2024-02-12T10:41:30.630Z"
    },{
      attachments: [],
      content: "L *uda ka Message hai",
      _id: "sfnsdjkfsdndsfsdsdfkjsbnd",
      sender: {
        id : "user._id",
        name: "Chaman"
      },
      chat: "chatld",
      createdAt: "2024-02-12T10:41:30.630Z"
    }
  ]
}