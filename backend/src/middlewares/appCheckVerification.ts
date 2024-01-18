import { Request, Response, NextFunction } from 'express';

const appCheckVerification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Log the appCheckToken
        const appCheckToken = req.header("X-Firebase-AppCheck");
        console.log('AppCheck Token:', appCheckToken);

        // Check if appCheckToken exists
        if (!appCheckToken) {
            res.status(401);
            return next("Unauthorized");
        }

        next();
    } catch (error) {
        console.error('Error during appCheckVerification:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default appCheckVerification;
