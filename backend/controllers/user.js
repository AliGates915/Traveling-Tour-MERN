import User from '../models/User.js'; 
  // Update
  export const updateUser = async (req, res, next) => {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      next(error);
    }
  };
  // Delete
  export const deleteUser = async (req, res, next) => {
      try {
          await User.findByIdAndDelete(
              req.params.id
          )
          res.status(200).json('Successful delete');
      }  catch (error) {
        next(error);
      }
    };
    
    
  // GET
  export const getUser = async (req, res, next) => {
      try {
          const getUser = await User.findById(
              req.params.id
              // "1234"
          )
          res.status(200).json(getUser);
      }   catch (error) {
        next(error);
      }
    };
    
  // GET ALL
  export const getAllUser = async (req, res, next) => {
      try {
          const getAll = await User.find()
          res.status(200).json(getAll);
      }  catch (error) {
        next(error);
      }
    };
    
  