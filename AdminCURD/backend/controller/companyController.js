const { body, validationResult } = require('express-validator')
const db = require('../common/common')
const { Op } = require('sequelize')

const Company = db.companys


const companycheck = async (name, email) => {
    const data = await Company.findAll({
        where: {
            [Op.or]: {
                name: name,
                email: email
            }
        }
    })
    if (data.length > 0) {
        return true
    } else {
        return false
    }
}

const addCompany = async (req, res) => {
    const check = await companycheck(req.body.name, req.body.email)
    if (check) {
        return res.status(500).json({
            message: "Email or Company name already exist"
        })
    }

    try {
        const newcompany = Company.build({
            name: req.body.name,
            email: req.body.email,
            package: req.body.package,
            description: req.body.description
        })
        await newcompany.save()
        res.status(200).json(newcompany.toJSON())

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "API not Work",
            error: error.message
        });
    }

}

const getAll = async (req, res) => {
    try {
        const data = await Company.findAll({});
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

const deleteCompany = async (req,res) => {
    try{
        await Company.destroy({
            where:{
                id: req.body.id
            }
        });

        res.status(200).json({
            success: true,
            message: "Delete Successfully"
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: "API Error"
        })
    }
}



module.exports = {
    addCompany,
    getAll,
    deleteCompany
}