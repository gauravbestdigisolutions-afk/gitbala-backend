import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import router from './routes/user.js';
import connectDB from './config/mongodb.js';
import productrouter from './routes/product.js';
import connectCloudinary from './config/cloudinary.js';
import Searchrouter from './routes/productRoutes.js';
import adminRoutes from './routes/adminRoutes.js';



const app = express(); // ✅ Ye missing tha
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

app.use(express.json());
app.use(cors());

//api fecth
app.use('/api/auth',router);
app.use("/api/products",productrouter);
app.use("/api/products", Searchrouter);
app.use("/api/adminlogin", adminRoutes);







app.get('/', (req, res) => {
    res.send('API WORKING');
});

app.listen(port, () => console.log('Server Started on port', port));
