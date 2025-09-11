// services/dbService.js

const buyers = require("../data/buyers");
const kendras = require("../data/kendras");

module.exports = {
  getBuyers: (crop, location) => {
    // Simple filter by crop substring match
    return buyers.filter(b =>
      crop ? b.crop.toLowerCase().includes(crop.toLowerCase()) : true
    );
  },

  getKendras: () => {
    return kendras;
  },

  saveSoilHealthReport: (report) => {
    // In real app, save to DB
    console.log("Saving soil health report:", report);
    return true;
  },

  saveDiseaseReport: (report) => {
    // In real app, save to DB
    console.log("Saving disease report:", report);
    return true;
  }
};