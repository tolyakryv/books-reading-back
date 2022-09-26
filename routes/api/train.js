const express = require('express');
const router = express.Router();

const { controllerWrapper } = require('../../helpers');
const ctrl = require('../../controllers/train');
const { schemaJoi } = require('../..//models/Train');
const {validationBody, authenticate}=require('../../middlewares')

router.get('/',
    authenticate,
    controllerWrapper(ctrl.getTrain));

router.patch('/statistic',
    authenticate,
    controllerWrapper(ctrl.addStatistic));

router.patch('/:bookId',
    authenticate,
    controllerWrapper(ctrl.addBookInTrain));

router.patch('/:bookId/status',
    authenticate,
    validationBody(schemaJoi.updateStatusSchema),
    controllerWrapper(ctrl.updateStatusBook));

module.exports = router;
