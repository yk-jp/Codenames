import express from "express";
import nameFormController from '../controllers/routes/nameFormController';
const router = express.Router();

router.post('/', nameFormController);

export default router;