const db = require("../models");
const { user } = require("../models");
const User = db.user;
const Member = db.member;
const Role = db.role;

const Op = db.Sequelize.Op;

exports.joinUser = (req,res) => {
  Member.create({
    id: req.body.id,
    username: req.body.username,
    email: req.body.email,
    role: req.body.role
  })
    .then(member => {
      User.findAll({
        where: {
          email: req.body.adminEmail
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

exports.getAllNewMembers = (req,res) => {
  User.findAll({
    where: {
      id: req.body.id
    },include: Member
  }).then(user => {
        res.json(user[0].members)
  }) .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.updateMember = (req,res) => {
  Member.update({
    role: req.body.role
   },
   {
    where: {
      id: req.body.id
    }
  }).then(() => {
    User.findOne({
      where: {
        id: req.body.id
      }
    }).then(user => {
        Role.findAll({
          where: {
            name: req.body.role
          }
        }).then(roles => {
          user.setRoles(roles);
      });
    });
    if (num == 1) {
      res.send({
        message: "Member role was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update member role with id=${req.body.id}. Maybe member was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Member role with id=" + req.body.id
    });
  });
}


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