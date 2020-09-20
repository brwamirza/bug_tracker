const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Project = db.project;
const Ticket = db.ticket;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { project } = require("../models");


// adding a ticket to db
exports.addTicket = (req, res) => {
  // Save ticket to Database
  Ticket.create({
    title: req.body.title,
    description: req.body.description,
    project: req.body.project,
    developer: req.body.developer,
    priority: req.body.priority,
    status: req.body.status,
    type: req.body.type,
    submitter: req.body.submitter
  })
    .then(ticket => {
        Project.findOne({
            where: {
                name: req.body.project
            }
        }).then(project => {
            project.addTickets(ticket).then(() => {
              User.findAll({
                where: {
                  username : {
                    [Op.or]: [req.body.submitter,req.body.developer,project.manager]
                  }
                }
              }).then(users => {
                  ticket.addUsers(users).then(() => {
                    User.findOne({
                      where: {
                        email: project.email
                      }
                    }).then(user => {
                      ticket.addUsers(user).then(() => {
                        res.send({ message: "ticket was added successfully!" });
                      });
                    });
                  });
              }).catch(err => {
                res.status(500).send({ message: err.message });
              });
            });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// getting all project
exports.getAllTickets = (req,res) => {
 User.findOne({
   where: {
     email: req.body.email
   }
  }).then(user => {
    user.getTickets().then(tickets => {
      res.json(tickets);
    })
   }).catch(err => {
      res.status(500).send({ message: err.message });
  });
};

// getting all project with users
exports.getAllProjectsWithUsers = (req,res) => {
  Project.findAll({
    where: {
      email: req.body.email
    },include: User
   }).then(project => {
     res.json(project)
    })
 
    .catch(err => {
     res.status(500).send({ message: err.message });
   });
 };

// getting one project
exports.findOne = (req, res) => {
  const id = req.params.id;

  Project.findOne({
    where: {
      id:id
    },include: User
  }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Project with id=" + id
      });
    });
};

//assining new users to project
exports.assignUsers = (req,res) => {
  project.findOne({
    where:{
      id: req.body.projectId
    }
  }).then( project => {
      User.findAll({
        where: {
          id : {
            [Op.or]: req.body.oldUsers
          }
        }
      }).then( oldUsers => {
        project.removeUsers(oldUsers)
      }).then( () => {
          User.findAll({
            where: {
              id : {
                [Op.or]: req.body.newUsers
              }
            }
          }).then( newUsers => {
            project.addUsers(newUsers);
          }).then( () => {
            res.send({
              message: "users assigned successfully."
            });
          });
      });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
}

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Project.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Project was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Project with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Project with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Project.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Project was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Project with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Project with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};