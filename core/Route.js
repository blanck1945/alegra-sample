const express = require("express");
class Route {
  static async execute(req, res, cb) {
    try {
      await cb(req, res);
    } catch (err) {
      res.send({ status: "error", message: err });
    }
  }
}

module.exports = Route;
