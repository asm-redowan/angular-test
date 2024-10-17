const db = require('../common/common')
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');


const User = db.users;

const emailcheck = async (email) => {
    const data = await User.findAll({
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


const isEmail = async (req, res) => {
    try {
        console.log(req.body.email)
        const data = await User.findAll({
            where: {
                email: req.body.email
            }
        })
        if (data.length > 0) {
            res.status(200).send({
                message: true
            })
        } else {
            res.status(404).send({
                message: false
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "API problem",
            // error: error.message
        });
    }
}


const addUser = async (req, res) => {
    // Check if the data exists and is a string
    // if (typeof encodedData !== 'string') {
    //     return res.status(400).json({ error: 'Invalid data: Base64 string expected.' });
    // }

    try {

        // console.log(req.body.encodedData)
        // const { encodedData } = req.body;
        // const decodedString = Buffer.from(encodedData, 'base64').toString('utf-8');
        // const decodedObject = JSON.parse(decodedString);

        // console.log(decodedObject)

        // decodedObject = req.body.encodedData
        // console.log(decodedObject)


        const check = await emailcheck(req.body.email)
        if (check) {
            return res.status(500).json({
                message: "Email already exist"
            })
        }

        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).send({
                    message: "Hash error"
                })
            }

            const newuser = User.build({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                company_id: req.body.company_id,
                group_id: req.body.group_id
            })
            await newuser.save()

            res.status(200).send({
                success: true,
                message: "created done!",
                data: {
                    user_name: req.body.name,
                    email: req.body.email,

                }
            })

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "API problem",
            // error: error.message
        });
    }
}


const getAll = async (req, res) => {
    try {
        // console.log("data")
        const data = await db.users.findAll({
            attributes: ['id', 'name', 'email'],
            include: [{
                model: db.companys,
                attributes: ['name', 'id']
            }, {
                model: db.groups,
                attributes: ['group_name', 'id']
            }],


        });

        // const formattedData = data.map(user => {
        //     return {
        //         name: user.name,
        //         email: user.email,
        //         company_name: user.Company ? user.Company.name : null, 
        //         company_id: user.Company ? user.Company.id : null,
        //         group_name: user.Group ? user.Group.group_name : null, 
        //         group_id: user.Group ? user.Group.id : null
        //     };
        // });

        // console.log(data)

        const formattedData = data.map(user => {
            return {
                // id: user.id,
                // name: user.name,
                // email: user.email,
                // companyName: user.Company.name ,
                // company_id: user.Company.id ,
                // groupName: user.Group.group_name,
                // group_id: user.Group.id
                id: user.id,
                name: user.name,
                email: user.email,
                companyName: user.Company?.name || null,
                company_id: user.Company?.id || null,
                groupName: user.Group?.group_name || null,
                group_id: user.Group?.id || null
            };
        });

        // console.log("data2")

        res.status(200).json({
            data: formattedData,
            // fulldata: data
        })


    } catch (error) {

    }
}

const updateUser = async (req, res) => {
    // console.log(req.body)

    try {
        await User.update(
            {
                name: req.body.name,
                company_id: req.body.company_id,
                group_id: req.body.group_id

            },
            {
                where: {
                    id: req.body.id
                },
            },
        );
        res.status(200).send({
            success: true,
            message: "update successfuly",

        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in API",
            error
        });
    }
}


const deleteUser = async (req, res) => {
    try {
        console.log(req.body)
        await User.destroy({
            where: {
                id: req.body.id,
            },
        });
        res.status(200).send({
            success: true,
            message: "Delete successfuly",

        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in API",
            error
        });
    }
}



module.exports = { addUser, getAll, updateUser, deleteUser, isEmail }


