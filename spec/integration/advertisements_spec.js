const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisements", () => {

  beforeEach((done) => {
     this.advertisement;
     sequelize.sync({force: true}).then((res) => {

      Advertisement.create({
        title: "Buy This Product",
        description: "It is great!"
      })
       .then((advertisement) => {
         this.advertisement = advertisement;
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });

     });

   });

  describe("GET /advertisements", () => {

    it("should return a status code 200 and all advertisements", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Advertisements");
        expect(body).toContain("Buy This Product");
        done();
      });
    });
  });

  describe("GET /advertisements/new", () => {

     it("should render a new advertisement form", (done) => {
       request.get(`${base}new`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("New Advertisement");
         done();
       });
     });

  });

  describe("POST /advertisements/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "Buy This Product",
          description: "It is great!"
        }
      };

      it("should create a new advertisement and redirect", (done) => {

       request.post(options,

        (err, res, body) => {
            Advertisement.findOne({where: {title: "Buy This Product"}})
            .then((advertisement) => {
              expect(res.statusCode).toBe(303);
              expect(advertisement.title).toBe("Buy This Product");
              expect(advertisement.description).toBe("It is great!");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
        }
      );
    });
  });

  describe("GET /advertisements/:id", () => {

     it("should render a view with the selected advertisement", (done) => {
       request.get(`${base}${this.advertisement.id}`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Buy This Product");
         done();
       });
     });
   });

  describe("POST /advertisements/:id/destroy", () => {

     it("should delete the advertisement with the associated ID", (done) => {

       Advertisement.findAll()
       .then((advertisements) => {

         const advertisementCountBeforeDelete = advertisements.length;

         expect(advertisementCountBeforeDelete).toBe(1);

         request.post(`${base}${this.advertisement.id}/destroy`, (err, res, body) => {
           Advertisement.findAll()
           .then((advertisements) => {
             expect(err).toBeNull();
             expect(advertisements.length).toBe(advertisementCountBeforeDelete - 1);
             done();
           })
         });
       });
     });
   });

});
