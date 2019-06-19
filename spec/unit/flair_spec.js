/*
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

  beforeEach((done) => {

    this.topic;
    this.post;
    this.flair;

    sequelize.sync({force: true}).then((res) => {


      Topic.create({
        title: "Summer Activities",
        description: "Things to do this summer"
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "Go to the beach",
          body: "This summer I'm going to Ocean Grove, New Jersey.",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
        });

        Flair.create({
          name: "beach related",
          color: "yellow",
          postId: this.post.id
        })
        .then((flair) => {
          this.flair = flair;
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

       it("should create a flair object with a name, color, and assigned post", (done) => {
  //#1
         Flair.create({
           name: "beach related",
           color: "yellow",
           postId: this.post.id
         })
         .then((flair) => {

  //#2
           expect(flair.name).toBe("beach related");
           expect(flair.color).toBe("yellow");
           done();

         })
         .catch((err) => {
           console.log(err);
           done();
         });
       });

       it("should not create a flair with missing name, color, or assigned post", (done) => {
          Flair.create({
            title: "beach related"
          })
          .then((flair) => {

           // the code in this block will not be evaluated since the validation error
           // will skip it. Instead, we'll catch the error in the catch block below
           // and set the expectations there

            done();

          })
          .catch((err) => {

            expect(err.message).toContain("Flair.color cannot be null");
            expect(err.message).toContain("Flair.postId cannot be null");
            done();

          })
        });

     });

});

*/
