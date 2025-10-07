const categoryModel = require("../models/categoryModel");

const index = (req, res) => {
    categoryModel.index()
        .then(categories => {
            res.json(categories);
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to fetch categories" });
        });
}

const show = (req, res) => {
    const id = req.params['id'];
    categoryModel.show(id)
        .then(category => {
            if (category.length === 0) {
                return res.status(404).json({ error: "Category not found" });
            }
            res.json(category[0]);
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to fetch category" });
        });
}

const store = (req, res) => {
    // Validation
    if (!req.body.categoryName) {
        return res.status(400).json({ error: "Category name is required" });
    }

    categoryModel.store(req.body)
        .then(() => {
            res.status(201).json({ message: "Category created successfully" });
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to create category" });
        });
}

const update = (req, res) => {
    const id = req.params['id'];
    
    // Validation
    if (!req.body.categoryName) {
        return res.status(400).json({ error: "Category name is required" });
    }

    req.body.id = id;
    categoryModel.update(req.body)
        .then(() => {
            res.status(200).json({ message: "Category updated successfully" });
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to update category" });
        });
}

const destroy = (req, res) => {
    const id = req.params['id'];
    categoryModel.destroy(id)
        .then(() => {
            res.status(200).json({ message: "Category deleted successfully" });
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to delete category" });
        });
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
};
