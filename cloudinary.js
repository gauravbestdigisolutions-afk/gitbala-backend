import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;



//username  gauravbestdigisolutions

//password sYfS3wkkU5fozF95



//   mongodb+srv://<db_username>:<db_password>@cluster0.8kuu5gk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0