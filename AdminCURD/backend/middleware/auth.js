const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const db = require('../common/common')

//configure dotenv
dotenv.config();

const checkAuth = async (req, res, next) => {
    //req.headers.authorization
    try {
        // console.log(req.headers.authorization)
        // const otp = await getOtp(req.headers.email)
        const encodedData = req.headers.tailer;
        const email = Buffer.from(encodedData, 'base64').toString('utf-8');
        // console.log(email)

        const data = await db.sessions.findAll({
            where: {
                email: email
            }
        })
        
        const format = data.map(session => {
            return {
                email: session.email,
                otp : session.otp
            }
        })

        // console.log(format[0].otp)
        otp = format[0].otp;

        const token = req.headers.authorization.split(" ")[1]
        const verify = jwt.verify(token, otp)
        // console.log(verify)
        if (verify) {
            next()
        }
    } catch (err) {
        return res.status(401).send({
            message: "Invalid Token"
        })

    }
}


module.exports = { checkAuth }