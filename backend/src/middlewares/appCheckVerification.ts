import { Request, Response, NextFunction } from 'express';
import { verifyFirebaseToken } from '../utils/firebase';

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

        // const decodedToken = await verifyFirebaseToken(appCheckToken);
        // const uid = decodedToken.uid;

        // // Add UID to the request body
        // req.body.uid = uid;

        next();
    } catch (error) {
        console.error('Error during appCheckVerification:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default appCheckVerification;
