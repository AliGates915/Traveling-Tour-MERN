import express from 'express';
import{ updateUser,deleteUser, getUser,getAllUser } from '../controllers/user.js'
import { verifyToken,verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// router.get("/checkauth", verifyToken, (req, res) => {
//     res.send("Hello, user you are logged in")
// })
// router.get("/checkuser/:id",verifyUser, (req, res) => {
//     res.send("Hello, user you are logged in and you can delete our account.")
// })
// router.get("/checkadmin/:id",verifyAdmin, (req, res) => {
//     res.send("Hello, Admin you are logged in and you can delete all accounts.")
// })

// UPDATE
router.put('/:id',verifyUser ,updateUser)
// DELETE
router.delete('/:id',verifyUser ,deleteUser)
// GET
router.get('/:id', verifyUser ,getUser)
// GET ALL
router.get('/',verifyAdmin ,getAllUser)

export default router;