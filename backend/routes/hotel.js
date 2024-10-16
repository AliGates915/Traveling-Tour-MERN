import express from 'express';
import Hotel from '../models/Hotels.js'

import{ 
    createHotel,updateHotel,deleteHotel, getHotel, getAllHotel, 
    countByCity,countByType, getHotelRooms
} from '../controllers/hotel.js'
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();
// CREATE
router.post('/',verifyAdmin, createHotel)
// UPDATE
router.put('/:id',verifyAdmin, updateHotel)
// DELETE
router.delete('/find/:id' ,verifyAdmin,deleteHotel)

router.get('/countByCity', countByCity);   // First, to handle "countByCity" 
router.get("/countByType", countByType);
router.get('/:id', getHotel);              // Then, this for hotel by ID
router.get('/', getAllHotel);              // Lastly, get all hotels


router.get("/room/:id", getHotelRooms);


export default router;