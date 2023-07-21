const UserTwo = require('../models/userModel.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

const createToken = (_id) =>{
	return jwt.sign({_id}, process.env.SECRET, {expiresIn:'3d'})
}





const   loginUser =  async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await UserTwo.login(email, password, { userId: user._id });
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }catch(error){
        res.json({error: error.message})
    }
}

const   signupUser = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await UserTwo.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }catch(error){
        res.json({error: error.message})
    }
}




module.exports = {loginUser, signupUser}
