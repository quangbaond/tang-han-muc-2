const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('MongoDB đã kết nối thành công!');
}).catch((err) => {
    console.log('Lỗi kết nối MongoDB: ' + err);
});