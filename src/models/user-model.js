"use strict";
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "super-secret";

const Users = (sequelize, DataTypes) =>
  sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "writer", "editor", "admin"),
      defaultValue: "user",
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ["read"],
          writer: ["read", "create"],
          editor: ["read", "create", "update"],
          admin: ["read", "create", "update", "delete"],
        };
        return acl[this.role];
      },
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        console.log(">>>>>>>>>>>>>>>>>>>", this.capabilities);
        return jwt.sign(
          {
            username: this.username,
            capabilities: this.capabilities, // this is the perfarable way in order to check the permissions
          },
          SECRET
        );
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      },
    },
  });

module.exports = Users;