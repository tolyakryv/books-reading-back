const express = require('express');
const router = express.Router();

const { controllerWrapper } = require('../../helpers');
const ctrl = require('../../controllers/book');
const { schemaJoi } = require('../..//models/Book');
const {validationBody, authenticate}=require('../../middlewares')

router.get('/',
    authenticate,
    controllerWrapper(ctrl.getAllBooks));

router.post('/',
    
    validationBody(schemaJoi.addSchema),
    controllerWrapper(ctrl.addBook));

router.patch('/:bookId',
    authenticate,
    validationBody(schemaJoi.updateSchema),
    controllerWrapper(ctrl.updateBook));

router.patch('/:bookId/status',
    authenticate,
    validationBody(schemaJoi.updateStatusSchema),
    controllerWrapper(ctrl.updateStatusBook))

module.exports = router;
