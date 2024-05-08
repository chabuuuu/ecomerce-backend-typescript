import AccessService from '@/services/access.service';
import express from 'express'
class AccessController {

    // POST /access/shop/signup
    async signUp(req: any, res: express.Response, next: express.NextFunction) {
        try {            
            const result = await AccessService.signUp({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            return res.json({
                code: '201',
                metadata: result,
                status: 'success'
            })
        } catch (error) {
            next(error);
        }
    }
}

export default new AccessController();