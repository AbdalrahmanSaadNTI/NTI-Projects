const customersModel = require('../models/customersModel');

const index = async (req, res) => {
    try {
        const data = await customersModel.getAll();
        res.render('pages/customers/index', { customers: data });
    } catch (err) {
        res.json({ message: err.message });
    }
};

const show = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await customersModel.getById(id);
        res.render('pages/customers/show', { customer: data });
    } catch (err) {
        res.json({ message: err.message });
    }
};

const createForm = (req, res) => {
    res.render('pages/customers/createForm');
};

const store = async (req, res) => {
    try {
        await customersModel.store(req.body);
        if (req.file) {
            const imagePath = '/img/customers/uploads/' + req.file.filename;
            req.body.photo = imagePath;
        }
        else {
            req.body.photo = "";
        }
        await customersModel.store(req.body);
        res.redirect('/customers');
    } catch (err) {
        res.json({ message: err.message });
    }
};

const updateForm = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await customersModel.getById(id);
        res.render('pages/customers/updateForm', { customer: data });
    } catch (err) {
        res.json({ message: err.message });
    }
};

const update = async (req, res) => {
    try {
        await customersModel.update(req.body);
        res.redirect('/customers');
    } catch (err) {
        res.json({ message: err.message });
    }
};

const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        await customersModel.destroy(id);
        res.redirect('/customers');
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