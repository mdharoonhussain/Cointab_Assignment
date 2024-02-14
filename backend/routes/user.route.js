const express = require('express');
const UserModel = require('../models/user.model');
const axios = require("axios");
const router = express.Router();

router.post('/add', async (req, res) => {
    try {
      const newUser = new UserModel(req.body);
      console.log(newUser);
      await newUser.save();
      res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ error: error.message });
      } else {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  });
  


router.get('/', async (req, res) => {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
  router.get('/posts/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const data = response.data;
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
