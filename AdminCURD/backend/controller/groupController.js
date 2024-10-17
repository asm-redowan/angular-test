const { body } = require('express-validator')
const db = require('../common/common')
const { Op } = require('sequelize')

const Group = db.groups

const groupcheck = async (name) => {
    const data = await Group.findAll({
        where: {
            group_name: name
        }
    })
    console.log(data)
    if (data.length > 0) {
        return true
    } else {
        return false
    }
}

const addGroup = async (req,res)=>{
    try{

        const check = await groupcheck(req.body.group_name)
        if(check){
            return res.status(500).json({
                message: "Group already exist"
            })
        }

        const newgroup = Group.build({
            group_name: req.body.group_name,
            description: req.body.description
        })
        await newgroup.save()
        res.status(200).json(newgroup.toJSON())


    }catch(error){
        res.status(500).json({
            success: false,
            message: "API not Work",
            error: error.message
        });
    }
}


const getAll = async (req, res) => {
    try {
        const data = await Group.findAll();
        res.status(200).json({
            totallength: data.length,
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "API not Work",
            error: error.message
        });
    }
}

const deleteGroup = async (req,res)=> {
    try{
        await Group.destroy({
            where:{
                id: req.body.id
            }
        })

        res.status(200).json({
            success: true,
            message: "Delete Successfully"
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: "API Error"
        })
    }
}


module.exports = {addGroup,getAll,deleteGroup}