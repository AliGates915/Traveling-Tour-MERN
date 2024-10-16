import Hotel from '../models/Hotels.js'; 
import mongoose from "mongoose";

// Create
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

// Update
export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};
// Delete
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(
            req.params.id
        )
        res.status(200).json(`Successful delete ${req.params.id}`);
    }  catch (error) {
      next(error);
    }
  };
  
  export const getHotel = async (req, res, next) => {
    try {
      const hotelId = req.params.id;
  
      // Validate if the id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(hotelId)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
  
      const hotel = await Hotel.findById(hotelId);
      if (hotel) {
        console.log("Fetched hotel:", hotel);
      }
  
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
  
      res.status(200).json(hotel);
    } catch (err) {
      next(err);
    }
  };


  export const getAllHotel = async (req, res, next) => {
    const { min = 0, max = 999, city } = req.query;
  
    try {
      const hotels = await Hotel.find({
        city: { $regex: new RegExp(city, "i") },  // Case-insensitive search
        cheapestPrice: { $gte: Number(min), $lte: Number(max) }
      });
  
      if (hotels.length === 0) {
        res.status(200).json({ message: "No hotels found for the given criteria" });
      } else {
        res.status(200).json(hotels);
      }
    } catch (err) {
      next(err);
    }
  };
  
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};