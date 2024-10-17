const db = require('../common/common')
const { Op } = require('sequelize')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

//configure dotenv
dotenv.config();


const generatePassword = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    return password;
}


const emailcheck = async (email) => {
    const data = await db.sessions.findAll({
        where: {
            email: email
        }
    })
    if (data.length > 0) {
        return true
    } else {
        return false
    }
}


const newsessionkey = async (email,otp,ip_address) => {
    // console.log(ip_address)
    if(await emailcheck(email)){
        await db.sessions.update(
            {
                ip_address: ip_address,
                otp: otp,
            },
            {
                where: {
                    email: email,
                },
            },
        );
    }else{
        const data = db.sessions.build({
            email: email,
            ip_address: ip_address,
            otp: otp
        })
        await data.save()
    }
}

const login = async (req, res) => {
    // console.log(req.body)
    try {
        const data = await db.users.findAll({
            where: {
                email: req.body.email
            }
        });

        if (data.length <= 0) {
            return res.status(404).json({
                success: false,
                message: "Email not found"
            });
        }

        const user = data[0];
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        const otp = generatePassword(12)
        await newsessionkey(user.email,otp,req.body.ip_address)

        const token = jwt.sign({
            name: user.name,
            email: user.email,
        }, otp, { expiresIn: "5h" });

        res.status(200).json({
            success: true,
            message: "Login successful",
            name: user.name,
            email: user.email,
            user_id: user.user_id,
            token: token
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in login",
            error: error.message
        });
    }
};


module.exports = { login }