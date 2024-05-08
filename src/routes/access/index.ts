import accessController from '@/controllers/access.controller';
import express from 'express'

const accessRouter = express.Router();

//Sign up
accessRouter.post('/shop/signup', accessController.signUp);

export {accessRouter}