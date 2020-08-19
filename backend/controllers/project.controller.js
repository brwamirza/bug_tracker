const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Project = db.project;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.addProject = (req, res) => {
  // Save Project to Database
  Project.create({
    name: req.body.name,
    description: req.body.description,
    email: req.body.email
  })
    .then(project => {
        if (req.body.email) {
        User.findAll({
            where: {
                email: {
                    [Op.or]: req.body.email
                }
            }
        }).then(users => {
            project.setUsers(users).then(() => {
            res.send({ message: "Project was added successfully!" });
            });
        });
        }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAllProject = (req,res) => {
 Project.findAll({
   where: {
     email: req.body.email
   }
  }).then(project => {
    res.json(project)
   });
};