const Advertisement = require("./models").Advertisement;

module.exports = {

  getAllAdvertisements(callback){
    return Advertisement.findAll()
    .then((advertisements) => {
      callback(null, advertisements);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getAdvertisement(id, callback){
     return Advertisement.findByPk(id)
     .then((advertisement) => {
       callback(null, advertisement);
     })
     .catch((err) => {
       callback(err);
     })
   },
  addAdvertisement(newAdvertisement, callback){
      return Advertisement.create({
        title: newAdvertisement.title,
        description: newAdvertisement.description
      })
      .then((advertisement) => {
        callback(null, advertisement);
      })
      .catch((err) => {
        callback(err);
      })
    }


}
