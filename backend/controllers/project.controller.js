const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Project = db.project;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


// adding a project to db
exports.addProject = (req, res) => {
  // Save Project to Database
  Project.create({
    name: req.body.name,
    description: req.body.description,
    email: req.body.email
  })
    .then(project => {
        if (req.body.email) {
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            user.setProjects(project).then(() => {
            res.send({ message: "Project was added successfully!" });
            });
        });
        }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// getting all project
exports.getAllProject = (req,res) => {
 Project.findAll({
   where: {
     email: req.body.email
   }
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

  Project.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Project with id=" + id
      });
    });
};

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