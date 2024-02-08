import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL , {
    dbName: 'backendApi'
    }).then(() => {
        console.log('databse connected');
    })
    .catch((error) => {
        console.log('error:' , error);
    })
}
