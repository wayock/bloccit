const flairQueries = require("../db/queries.flairs.js");


module.exports = {
  new(req, res, next){
     res.render("flairs/new", {postId: req.params.postId});
   },

  create(req, res, next){
      let newFlair= {
        name: req.body.name,
        color: req.body.color,
        postId: req.params.postId,
      };
      flairQueries.addFlair(newFlair, (err, flair) => {
        if(err){
          console.log(err);
          res.redirect(500, `/flairs/new`);
        } else {
          res.redirect(303, `/posts/${newFlair.postId}/flairs/${flair.id}`);
        }
      });
    },

  show(req, res, next){
       flairQueries.getFlair(req.params.id, (err, flair) => {
         if(err || flair == null){
           res.redirect(404, "/");
         } else {
           console.log("showing flair");
           res.render("flairs/show", {flair});
         }
       });
     },

   destroy(req, res, next){
        flairQueries.deleteFlair(req.params.id, (err, deletedRecordsCount) => {
          if(err){
            res.redirect(500, `/posts/${req.params.postId}/flairs/${req.params.id}`)
          } else {
            res.redirect(303, `/topics/${req.params.topicId}/posts/${req.params.postId}`)
          }
        });
      },

   edit(req, res, next){
       flairQueries.getFlair(req.params.id, (err, flair) => {
         if(err || flair == null){
           res.redirect(404, "/");
         } else {
           res.render("flairs/edit", {flair});
         }
       });
   }

}
