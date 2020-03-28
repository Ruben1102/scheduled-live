const express = require('express');
const fs = require('fs');
const Throttle = require('stream-throttle').Throttle;
const ffmpeg = require('fluent-ffmpeg');

const app = express();


app.use(express.static(__dirname));

var readStream;
ffmpeg.ffprobe('tt.mp4', (err, meta)=> {
    let dur = meta.format.duration;
    let size = fs.statSync('tt.mp4')['size'] ;
    // console.log(fs.statSync('tt.mp4'));
    console.log(Math.floor(Math.floor(size/dur)/1024));
    var thr = Math.floor(Math.floor(size/dur)/1024);
    feed(thr);
});

function feed(sourceThrottleRate) {
    readStream = fs.createReadStream('tt.mp4'); //.pipe(new Throttle({rate: sourceThrottleRate}));
    readStream = readStream.pipe(new Throttle({rate: sourceThrottleRate}));
}

app.get('/live', (req,res) => {
    readStream.pipe(res);
});

app.get('/hls', (req,res) => {
    res.sendFile(__dirname + '/hls.html');
});

app.get('/mpd', (req,res) => {
    res.sendFile(__dirname + '/dash.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname+ '/test.html');
})


app.listen(3000, () => console.log('server running....'));