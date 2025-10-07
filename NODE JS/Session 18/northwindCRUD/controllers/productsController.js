const productsModel = require('../models/productsModel');
const path = require('path');
const {unlink} =require('fs');

const index = async (req, res) => {
    try {
        const data = await productsModel.getAll();
        res.render('pages/products/index', { products: data });
    } catch (err) {
        res.json({ message: err.message });
    }
};

const show = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await productsModel.getById(id);
        res.render('pages/products/show', { product: data });
    } catch (err) {
        res.json({ message: err.message });
    }
};

const createForm = (req, res) => {
    res.render('pages/products/createForm');
};

const store = async (req, res) => {
    try {
        await productsModel.store(req.body);
        res.redirect('/products');
    } catch (err) {
        res.json({ message: err.message });
    }
};

const updateForm = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await productsModel.getById(id);
        res.render('pages/products/updateForm', { product: data });
    } catch (err) {
        res.json({ message: err.message });
    }
};

const update = async (req, res) => {
    try {
        await productsModel.update(req.body);
        res.redirect('/products');
    } catch (err) {
        res.json({ message: err.message });
    }
};

const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        await productsModel.destroy(id);
        res.redirect('/products');
    } catch (err) {
        res.json({ message: err.message });
    }
};

module.exports = {
    index,
    show,
    createForm,
    store,
    updateForm,
    update,
    destroy
};