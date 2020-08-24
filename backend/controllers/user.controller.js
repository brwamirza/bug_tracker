const db = require("../models");
const User = db.user;
const Member = db.member;

exports.joinUser = (req,res) => {
  Member.create({
    id: req.body.id,
    username: req.body.name,
    email: req.body.email
  })
    .then(member => {
      User.findAll({
        where: {
          email: req.body.resEmail
        }
      }).then(users => {
        member.setUsers(users).then(()=> {
          res.json(member)
        });
      });
    }) 
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.submitter = (req, res) => {
    res.status(200).send("submitter Content.");
  };
  
  exports.developerBoard = (req, res) => {
    res.status(200).send("developer Content.");
  };
  
  exports.projectManagerBoard = (req, res) => {
    res.status(200).send("project manager Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("admin Content.");
  };