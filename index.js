const express = require('express');
const fmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const app = express();

app.use(express.static(__dirname)); 

app.get('/live', (req, res) => {
  console.log('jvjv');
  res.sendFile('index.html', {root: __dirname });
});

app.get('/', function(req, res) {
  res.sendfile('index.html', {root: __dirname });
});


/* fmpeg('output.mp4')
.on('end', function () {
    console.log('vnsjvsd')
})
.on('error', function(err) {
    console.log('jnfj'+err.message);
})
.on('data', function(d) {
    console.log('jbvjk'+d.length);
})
.output('res.mp4') */ // sending video to the client

/* 
console.log(new Date().toLocaleTimeString());
fmpeg('output.mp4', { timeout: 432000 }).addOptions([
    '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
    '-level 3.0', 
    '-s 640x360',          // 640px width, 360px height output video dimensions
    '-start_number 0',     // start the first .ts segment at index 0
    '-hls_time 10',        // 10 second segment duration
    '-hls_list_size 0',    // Maxmimum number of playlist entries (0 means all entries/infinite)
    '-f hls'               // HLS format
  ]).output('mu8/output.m3u8')
  .on('end', ()=> {
    console.log(new Date().toLocaleTimeString());
  }).on('data', ()=>{
    //   console.log('jbj');
  }).on('error', (err)=> {
    console.log(err);
  })
  .run()
 */

/* fmpeg('output.mp4', { timeout: 420000 })
.outputOptions('-r 24')
.output('res.mp4',{end:true})
.on('end', function () {
    console.log('vnsjvsd');
})
.on('error', function(err) {
    console.log('jnfj'+err.message);
})
.on('data', function(d) {
    console.log('jbvjk'+d.length);
})
.run() */

app.listen(3000, ()=> {
  console.log('running at 3000');
});