const userSchema = require('../modal/userSchema')
const express = require('express')
const route = express.Router()

// route.use(express.json())

const register = async (req, res) => {
    const { username, email, password } = req.body
    console.log("Username : ", username)
    try {
        const existingUser = await userSchema.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: "User Already Exists" });
        }

        const newUser = new userSchema({ username, email, password })
        await newUser.save()
        res.status(201).json(newUser)
        console.log(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password)
    const existingUser = await userSchema.findOne({ email })
    try {
        if (!existingUser) {
            res.status(404).json({ message: "No Such User" })
        }

        if (existingUser.password == password) {
            return res.status(200).json(existingUser)
        } else {
            return res.status(401).json({ message: "Incorrect Password Couldn't Login" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
}

const getUser = async (req, res) => {
    try {
        const userData = await userSchema.find();
        res.status(200).json(userData)
        console.log(userData)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = { register, login, getUser }