const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("POST", () => {

  beforeEach((done) => {
//#1
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

//#2
      Topic.create({
        title: "Ice Cream Flavors",
        description: "A place to discuss which ice cream flavor is best."
      })
      .then((topic) => {
        this.topic = topic;
//#3
        Post.create({
          title: "Chocolate Peanut Butter",
          body: "Chocolate Peanut Butter is the GOAT!",
//#4
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#create()", () => {

     it("should create a topic object with a title and description", (done) => {
       Topic.create({
         title: "Ice Cream Flavors",
         description: "A place to discuss which ice cream flavor is best."
       })
         .then(topic => {
           expect(topic.title).toBe("Ice Cream Flavors");
           expect(topic.description).toBe("A place to discuss which ice cream flavor is best.");
           done();
         });
       });

     it("should create a topic with a nested title post", (done) => {
//#1
       Post.create({
         title: "Chocolate Moose Tracks",
         body: "Chocolate Moose Tracks is the best ice cream ever!",
         topicId: this.topic.id
       })
       .then((post) => {

//#2
         expect(post.title).toBe("Chocolate Moose Tracks");
         expect(this.topic.title).toBe("Ice Cream Flavors");
         done();

       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });
   });

   describe("#getPosts()", () => {

     it("should return the associated posts", (done) => {
         expect(this.post.title).toBe("Chocolate Peanut Butter");
         done();
       });

     });

});
