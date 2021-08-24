"use strict";

 const POSTGRES_URI = process.env.POSTGRES_URI || 'postgres://localhost/postgres/lab08';

const { Sequelize, DataTypes } = require("sequelize");
const Users = require("./user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = 'SUPER-SECRET';
let sequelize = new Sequelize(POSTGRES_URI, {});

const usersModel = Users(sequelize, DataTypes);
usersModel.beforeCreate(async (user) => {
  let hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
});

usersModel.authenticateBasic = async function (username, password) {
  const user = await this.findOne({ where: { username } });
  // we need to check if null.

  const isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    return user;
  }

  throw new Error("Invalid user");
};

usersModel.authenticateBearer = async function (token) {
  console.log(token);
  console.log(jwt.decode(token));

  const verifiedToken = jwt.verify(token, SECRET);
  const user = await this.findOne({
    where: { username: verifiedToken.username },
  });

  if (user) {
    return user;
  }
  throw new Error("Invalid user");
};
module.exports = {
  db: sequelize,
  Users: usersModel,
};