const express = require("express");
const router = express.Router();

const { controllerWrapper } = require("../../helpers");
const ctrl = require("../../controllers/train");
const { schemaJoi } = require("../..//models/Train");
const { validationBody, authenticate } = require("../../middlewares");

router.get("/",
    authenticate,
    controllerWrapper(ctrl.getTrain));

router.post(
  "/",
  authenticate,
  validationBody(schemaJoi.addTimeTrain),
  controllerWrapper(ctrl.addTrain)
);

router.delete("/",
    authenticate,
    controllerWrapper(ctrl.deleteTrain));

router.patch(
  "/statistic",
  authenticate,
  validationBody(schemaJoi.addStatistic),
  controllerWrapper(ctrl.addStatistic)
);

router.patch(
  "/:bookId/status",
  authenticate,
  validationBody(schemaJoi.updateStatusSchema),
  controllerWrapper(ctrl.updateStatusBook)
);

module.exports = router;
