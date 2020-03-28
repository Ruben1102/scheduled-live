const fs = require('fs');


var txt = fs.readFileSync('mu8/output.m3u8', 'utf-8').split(/\r?\n/);

var index = 7;

var logger = fs.createWriteStream('mu8/index.m3u8', {
    flags: 'a', // 'a' means appending (old data will be preserved)
    encoding: 'utf-8'
});

function startWrite(){
    for(let i=0; i<=6;i++) {
        logger.write(`\n${txt[i]}`);
    }
    write(index);
}

function write(idx) {
    if(idx < txt.length) {
        if(idx%2) {
            logger.write(`\n${txt[idx]}`);
            index = index + 1;
            write(index);
        } else {
            setTimeout(() => {
                logger.write(`\n${txt[idx]}`);
                index = index + 1;
                write(index);
            }, 10000);
        }
    } else {
        fs.truncate('mu8/index.m3u8', ()=> {
            index = 7;
            startWrite();
        });
    }
}

startWrite();
