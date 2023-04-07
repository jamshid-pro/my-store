import mongoose from "mongoose";

const connectDB = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true
  }, console.log("MongoDB connected"));
};

export default connectDB
