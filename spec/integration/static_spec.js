const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";


describe("routes : static", () => {

//#1
  describe("GET /", () => {

//#2
    it("should return status code 200", (done) => {

//#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);

//#4
        done();
      });
    });

  });

  describe("GET /marco", () => {

    it("should return status code 200", (done) => {
      request.get(`${base}marco`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        console.log(res.statusCode);
        done();
      });
    });

    it("should return string 'polo'", done => {
      request.get(`${base}marco`, (err, res, body) => {
        expect(body).toContain('polo');
        console.log(body);
        done();
    });

  });

  });
});
