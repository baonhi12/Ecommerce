const { default: mongoose } = require("mongoose")

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB connected successfully`);
    }
    catch (error) {
        console.log(`Database error`);
        //throw new Error(error);
    }
};
module.exports = dbConnect;