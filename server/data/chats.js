const chats = [
  {
    _id: "60a3de1ff381d830b884998d",
    chatname: "1 and 2",
    type: "private",
    members: [
      {
        name: "user 1",
        _id: "1",
        email: "user1@gm.co",
      },
      {
        name: "user 2",
        _id: "2",
        email: "user2@gm.co",
      },
    ],
    latestMsg: {
      _id: "60a3f2ed0c8dcc43bc3cfff2",
      sender: {
        _id: "1",
        name: "user 1",
      },
      content: "Yea boiii..",
    },
  },

  {
    _id: "60a3de1ff381d830b884558a",
    chatname: "2 and 3",
    type: "private",
    members: [
      {
        name: "user 2",
        _id: "2",
        email: "user2@gm.co",
      },
      {
        name: "user 3",
        _id: "3",
        email: "user3@gm.co",
      },
    ],
    latestMsg: {
      _id: "60a3f2ed0c8dcc43bc3cfff4",
      sender: {
        _id: "3",
        name: "user 3",
      },
      content: "temp last msg",
    },
  },

  {
    _id: "60a3de1ff381d830b884998e",
    chatname: "testing group",
    type: "group",
    members: [
      {
        name: "user 1",
        _id: "1",
        email: "user1@gm.co",
      },
      {
        name: "user 2",
        _id: "2",
        email: "user2@gm.co",
      },
      {
        name: "user 3",
        _id: "3",
        email: "user3@gm.co",
      },
    ],
    latestMsg: {
      _id: "60a3f2ed0c8dcc43bc3cfff3",
      sender: {
        _id: "2",
        name: "user 2",
      },
      content: "dummy messagee",
    },
  },
];

module.exports = chats;
