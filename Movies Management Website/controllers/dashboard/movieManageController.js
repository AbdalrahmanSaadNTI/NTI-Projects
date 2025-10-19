const movieManageModel = require("../../models/dashboard/movieManageModel");

const userAddNewMovie = (req, res) => {
    const userId = req.session.userID;
    const userFullName = req.session.fullname;
    movieManageModel.userAddNewMovie(userId, userFullName, req.body)
        .then(result => {
            const msg = "New Movie Added, Now under Review";
            res.redirect("/dashboard/index" + "?msg=" + msg);
        });
}


const suggestedMovies = (req, res) => {
    const msg = req.query.msg;
    movieManageModel.suggestedMovies(req)
        .then(movies => {
            res.render("../views/dashboard/pages/suggestedMovies", { movies, msg });
        });
}

const viewMovieDetails = (req, res) => {
    movieManageModel.viewMovieDetails(req)
        .then(movie => {
            res.render("../views/dashboard/pages/movieDetails", { movie });
        });
}

const reviewMovieDecision = (req, res) => {
    movieManageModel.reviewMovieDecision(req)
        .then(movie => {            
            let msg = "Movie decision updated.";
            if(movie.status == "approved") {
                msg = "Movie Approved.";
            }
            else {
                msg = "Movie Rejected.";
            }
            res.redirect("/dashboard/suggestedMovies" + "?msg=" + msg);
        });
}

const userEditMovie = (req, res) => {
    const userId = req.session.userID;
    const msg = req.query.msg;
    movieManageModel.getUserRejectedMovies(userId)
        .then(movies => {
            res.render("../views/dashboard/pages/userEditMovie", { movies, msg });
        })
        .catch(err => {
            res.redirect("/dashboard/index?msg=Error loading rejected movies");
        });
}

const editMovieForm = (req, res) => {
    const movieId = req.query.movieId;
    const msg = req.query.msg;
    movieManageModel.getMovieById(movieId)
        .then(movie => {
            if (!movie) {
                res.redirect("/dashboard/userEditMovie?msg=Movie not found");
                return;
            }
            res.render("../views/dashboard/pages/editMovieForm", { movie, msg });
        })
        .catch(err => {
            res.redirect("/dashboard/userEditMovie?msg=Error loading movie");
        });
}

const updateMovie = (req, res) => {
    const movieId = req.body.movieId;
    const userId = req.session.userID;
    
    // Verify the movie belongs to the current user
    movieManageModel.getMovieById(movieId)
        .then(movie => {
            if (!movie || movie.createdBy.userId.toString() !== userId) {
                res.redirect("/dashboard/userEditMovie?msg=Unauthorized access");
                return;
            }
            
            return movieManageModel.updateMovie(movieId, req.body);
        })
        .then(result => {
            res.redirect("/dashboard/userEditMovie?msg=Movie updated successfully and sent for review");
        })
        .catch(err => {
            res.redirect("/dashboard/userEditMovie?msg=Error updating movie");
        });
}

module.exports = {
    userAddNewMovie,
    suggestedMovies,
    viewMovieDetails,
    reviewMovieDecision,
    userEditMovie,
    editMovieForm,
    updateMovie,
}