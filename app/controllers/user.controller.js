const { randomUUID } = require("crypto");
const fs = require("fs");

const filePath = "./users.json";

const getUser = (req, res) => {
  const userId = req.params.id;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading data file");
      return;
    }

    const users = JSON.parse(data);
    const userIndex = users.findIndex((user) => user.id == userId);
    const user = users[userIndex];

    res.status(200).send(user);
  });
};

const getUserList = (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading data file");
      return;
    }

    const users = JSON.parse(data);
    res.status(200).send(users);
  });
};

const createUser = (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading data file");
      return;
    }

    const id = randomUUID();
    const users = JSON.parse(data);
    const newUser = {
      id,
      ...req.body
    };
    users.push(newUser);

    fs.writeFile(filePath, JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error writing data file");
        return;
      }

      res.status(200).send(users);
    });
  });
};

const updateUser = (req, res) => {
  const userId = parseInt(req.params.id);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading data file");
      return;
    }

    const users = JSON.parse(data);
    const updatedUser = req.body;
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      res.status(404).send("User not found");
      return;
    }

    users[userIndex] = {
      ...users[userIndex],
      ...updatedUser,
      id: userId,
    };

    fs.writeFile(filePath, JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error writing data file");
        return;
      }

      res.status(200).send(users);
    });
  });
};

const removeUser = (req, res) => {
  const userId = req.params.id;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading data file");
      return;
    }

    const users = JSON.parse(data);
    const userIndex = users.findIndex((user) => user.id == userId);

    if (userIndex == -1) {
      res.status(404).send("User not found");
      return;
    }

    users.splice(userIndex, 1);

    fs.writeFile(filePath, JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error writing data file");
        return;
      }

      res.status(200).send(users);
    });
  });
};

module.exports = {
  getUser,
  getUserList,
  createUser,
  updateUser,
  removeUser,
};
