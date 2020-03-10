const express = require('express');
const router = express.Router();

// @route    GET api/contacts
// @desc     Get all user's art piece
// @access   Private
router.get('/',(req,res)=>{
    res.send('Get all contacts')
});

// @route    POST api/user
// @desc     Add new art item
// @access   Private
router.post('/',(req,res)=>{
    res.send('Add new item')
});

// @route    PUT api/user
// @desc     Update art item
// @access   Private
router.put('/:id',(req,res)=>{
    res.send('Update item')
});

// @route    Delete api/user
// @desc     Delete art item
// @access   Private
router.delete('/:id',(req,res)=>{
    res.send('Delete item')
});

module.exports = router;