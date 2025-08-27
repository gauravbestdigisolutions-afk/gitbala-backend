// backend/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = "mongodb+srv://gauravbestdigisolutions:n3Rla1KEqR8qavxZ@cluster0.begcoit.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
