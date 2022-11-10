import express from 'express';
import { currentUser } from '@ih_tickets/common';

const router = express.Router();

router.get("/api/users/currentuser", 
    currentUser,
    (req, res) => {
        console.log("/api/users/currentuser");
        return res.send({ currentUser: req.currentUser || null });
    }
);

export { router as currentUserRouter };