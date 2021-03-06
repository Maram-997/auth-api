"use strict";

module.exports = (capability) => {
  return (req, res, next) => {
    if (req.user.capabilities.includes(capability)) {
      console.log("ACL: User has capability: ", req.user.capabilities);
      next();
    } else {
      next("Access Denied");
    }
  };
};