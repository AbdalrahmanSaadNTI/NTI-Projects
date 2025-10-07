const movieModel = require("../models/movieModel-mongoDb");
const path = require("path");
const {unlink} = require("fs");

const index = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    movieModel.index(page, 20, search)
        .then(({ movies, total }) => {
            const totalPages = Math.ceil(total / 20);
            res.render("pages/movies/index", { movies, page, totalPages, search });
        });
}

const show = (req, res) => {
    const id = req.params['id'];
    movieModel.show(id)
        .then(onemovie => {
            res.render("pages/movies/show", { onemovie });
        });
}

const createForm = (req, res) => {
    res.render("pages/movies/createForm");
}

const store = (req, res) => {
   // validation
    if(req.file != undefined) {
        req.body.thumbnail = req.file.filename;
    }
    else {
        req.body.thumbnail = "";
    }

   //////////////////
   movieModel.store(req.body)
        .then(error => {
            //
        });
    res.redirect("/movies");
}

const updateForm = (req, res) => {
    const id = req.params['id'];
    movieModel.updateForm(id)
        .then(onemovie => {
            res.render("pages/movies/updateForm", { onemovie });
        });
}

const update = (req, res) => {
    // validation

    const id = req.body.id;
    movieModel.updateForm(id)
        .then(onemovie => {
            if(onemovie.length != 0){
                if(req.file != undefined){
                    if(onemovie[0].thumbnail != "") {
                        const publicPath = path.resolve("./", "public/img/uploades");
                        unlink(path.join(publicPath, onemovie[0].thumbnail), (err) => {
                            if(err) {
                                throw err;
                            }
                        });
                    }
                    req.body.thumbnail = req.file.filename;
                    movieModel.update(req.body)
                        .then(error => {
                            //
                        });
                    res.redirect("/movies");
                }
                else {
                    req.body.thumbnail = "";
                    movieModel.update(req.body)
                        .then(error => {
                            //
                        });
                    res.redirect("/movies");
                }
            }
        });
}

const destroy = (req, res) => {
    const id = req.params['id'];
    movieModel.updateForm(id)
        .then(onemovie => {
            if(onemovie.length != 0){                
                if(onemovie[0].thumbnail != "") {
                    const publicPath = path.resolve("./", "public/img/uploades");
                    unlink(path.join(publicPath, onemovie[0].thumbnail), (err) => {
                        if(err) {
                            throw err;
                        }
                    });
                }                    
                movieModel.destroy(id)
                    .then(error => {
                        //
                    });
                res.redirect("/movies");
            }
        });    
}

module.exports = {
    index,
    show,
    createForm,
    store,
    updateForm,
    update,
    destroy
}