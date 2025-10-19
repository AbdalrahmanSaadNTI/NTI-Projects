const productModel = require("../models/productModel");
const path = require("path");
const {unlink} = require("fs");

const index = (req, res) => {
    productModel.index()
        .then(products => {
            res.render("pages/products/index", { 
                products, 
                user: req.user,
                pageTitle: "Products"
            });
        });
}

const show = async (req, res) => {
    const id = req.params.id;
    let product = await productModel.show(id);
    product = product[0];

    // Populate category name if needed
    if (product && product.category && product.category.categoryID && !product.category.categoryName) {
        const categories = await categoryModel.show(product.category.categoryID);
        if (categories && categories.length > 0) {
            product.category.categoryName = categories[0].categoryName;
        } else {
            product.category.categoryName = "No category assigned";
        }
    }

    res.render("pages/products/show", {
        oneProduct: [product],
        user: req.user,
        pageTitle: "Product Details"
    });
};

const createForm = (req, res) => {
    res.render("pages/products/createForm", { 
        user: req.user,
        pageTitle: "Add New Product"
    });
}

const store = (req, res) => {
   // validation
    if(req.file != undefined) {
        req.body.photo = req.file.filename;
    }
    else {
        req.body.photo = "";
    }

   //////////////////
   productModel.store(req.body)
        .then(error => {
            //
        });
    res.redirect("/products");
}

const updateForm = (req, res) => {
    const id = req.params['id'];
    productModel.updateForm(id)
        .then(oneProduct => {
            res.render("pages/products/updateForm", { 
                oneProduct, 
                user: req.user,
                pageTitle: "Edit Product"
            });
        });
}

const update = (req, res) => {
    // validation

    const id = req.body.id;
    productModel.updateForm(id)
        .then(oneProduct => {
            if(oneProduct.length != 0){
                if(req.file != undefined){
                    if(oneProduct[0].photo != "") {
                        const publicPath = path.resolve("./", "public/img/uploads");
                        unlink(path.join(publicPath, oneProduct[0].photo), (err) => {
                            if(err) {
                                throw err;
                            }
                        });
                    }
                    req.body.photo = req.file.filename;
                    productModel.update(req.body)
                        .then(error => {
                            //
                        });
                    res.redirect("/products");
                }
                else {
                    req.body.photo = "";
                    productModel.update(req.body)
                        .then(error => {
                            //
                        });
                    res.redirect("/products");
                }
            }
        });
}

const destroy = (req, res) => {
    const id = req.params['id'];
    productModel.updateForm(id)
        .then(oneProduct => {
            if(oneProduct.length != 0){                
                if(oneProduct[0].photo != "") {
                    const publicPath = path.resolve("./", "public/img/uploads");
                    unlink(path.join(publicPath, oneProduct[0].photo), (err) => {
                        if(err) {
                            throw err;
                        }
                    });
                }                    
                productModel.destroy(id)
                    .then(error => {
                        //
                    });
                res.redirect("/products");
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