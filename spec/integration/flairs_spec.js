const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/posts";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("routes : posts", () => {

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
          //console.log('Setting post')


          //console.log('Creating flair')
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
    });

    describe("GET /posts/:postId/flairs/new", () => {

       it("should render a new flair form", (done) => {
         request.get(`${base}/${this.post.id}/flairs/new`, (err, res, body) => {
           expect(err).toBeNull();
           expect(body).toContain("New Flair");
           done();
         });
       });

     });

    describe("POST /topics/:topicId/posts/create", () => {

        it("should create a new flair and redirect", (done) => {
           const options = {
             url: `${base}/${this.post.id}/flairs/create`,
             form: {
               name: "Ice cream",
               color: "white"
             }
           };
           request.post(options,
             (err, res, body) => {

               Flair.findOne({where: {name: "Ice cream"}})
               .then((flair) => {
                 expect(flair).not.toBeNull();
                 expect(flair.name).toBe("Ice cream");
                 expect(flair.color).toBe("white");
                 expect(flair.postId).not.toBeNull();
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

});
