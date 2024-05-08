import { accessRouter } from '@/routes/access';
import express from 'express'

const router = express.Router();

// router.get('', (req, res, next)=>{
//     const testCompression = "Hello world";
//     return res.status(500).json({
//     message: "hello world",
//     testdata: testCompression.repeat(100000)
//     });
// })

router.use('/v1/api', accessRouter);

export default router;