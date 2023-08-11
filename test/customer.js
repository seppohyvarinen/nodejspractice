const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../index");
const query = require("../db/customers");

chai.use(chaihttp);
const should = chai.should();

const testCust = {
  firstname: "Dana",
  lastname: "Scully",
  email: "xfiles@gmail.com",
  phone: "555777222",
};

describe("/POST api/customers", () => {
  beforeEach((done) => {
    query.deleteAllCust();
    done();
  });

  it("Add new customer", (done) => {
    chai
      .request(app)
      .post("/api/customers")
      .set("Content-Type", "application/json")
      .send(JSON.stringify(testCust))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("firstname");
        res.body.should.have.property("lastname");
        res.body.should.have.property("email");
        res.body.should.have.property("phone");
        done();
      });
  });
});

describe("/GET customers", () => {
  it("Fetch customers", (done) => {
    chai
      .request(app)
      .get("/api/customers")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
        done();
      });
  });
});
