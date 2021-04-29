// A serverless function that creates a new user on the project on Chat Engine

import axios from 'axios';

const newUser = async (req, res) => {
  const { userId, userName } = req.body;

  axios
    .post('https://api.chatengine.io/users/',
        { username: userName, secret: userId },
        { headers: { 'PRIVATE-KEY': process.env.chat_engine_private_key } },
    )
    .then(apiRes => {
        res.json({
            body: apiRes.data,
            error: null,
        });
    })
    .catch(() => {
        res.json({
            body: null,
            error: 'An error occured while creating the user',
        });
    });
};

export default newUser;