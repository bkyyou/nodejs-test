const fs = require('fs');
const path = require('path');
const cm = require('compressing');
const zlib = require('zlib');
const { createExtractorFromFile } = require('node-unrar-js')
function empty(filePath) {
  if(fs.existsSync(filePath)) {
    const dirAllFile = fs.readdirSync(filePath);

    dirAllFile.forEach(fileName => {
      const childFilePath = path.join(filePath, fileName);
      const onefileStat = fs.statSync(childFilePath);
      if(onefileStat.isFile()) {
        fs.unlinkSync(childFilePath);
      }

      if (onefileStat.isDirectory()) {
        const chilDirAllFile = fs.readdirSync(childFilePath);
        if (chilDirAllFile.length === 0) {
          fs.rmdirSync(childFilePath)
          return
        }
        chilDirAllFile.forEach(fileName => {
          empty(childFilePath)
        })
      } 
    })
  }
}

// empty('./test');

function myCopyFile(sourceFile, target) {
  if(fs.existsSync(sourceFile)) {

  }
}

// myCopyFile()
// console.log(path.parse('./test/test2/1.js'));
// fs.copyFileSync('./test/2.js', './test2/1.js')
// fs.mkdirSync('./test21')

const myfileopen = () => {
  fs.open('./test/1.txt', 'r', (err, fd) => {
    const bf = new Buffer(3);
    // fd 要读的文件
    // bf 要写入的 buffer
    // 0 要从 buffer的 第几位开始加入
    // 3 要读几位
    // 2 从第几位开始读 
    // readFile 的底层操作
    fs.read(fd, bf, 0, 3, 2, (err, res) => {
      console.log('res', res);
      console.log('bf', bf.toString());

      // 这是 writefile 的底层原理 把 fd 写入 2.txt
      fs.open('./test/2.txt', 'w', (err, fd2) => {
        fs.write(fd2, bf,  0, 3, 0, (err2, res2) => {
          console.log('res2', res2)
        })
      })
    })
  })
}
// myfileopen()

const mystream = () => {
  // 可读流
  const rstream = fs.createReadStream('./test/1.txt', {
    highWaterMark: 1 // 控制每次读多少
  });
  // 可写流 没有文件会创建文件
  const wstream = fs.createWriteStream('./test/3.txt');
  // 监听 data 才开始读取
  rstream.on('data', (buf) => {
    console.log(buf);
    wstream.write(buf);
  })
  rstream.on('error', (buf) => {
    console.log(buf);
  })
  rstream.on('end', (res) => {
    console.log('读end res = ' + res);
    wstream.close();
  })
  wstream.on('finish', (res) => {
    console.log('写入end res = ' + res);
  })

  // 可读流导入到可写流
  rstream.pipe(wstream);
}

// mystream();

const jieya = () => {
  // cm.tgz.uncompress('./1108.rar', './1108').then(res => {
  //   console.log('res', res)
  // })
  // console.log('cm', cm);
  fs.createReadStream('./1108.rar')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('./1108'));
}

// jieya()

async function extractRarArchive(file, destination) {
  try {
    // Create the extractor with the file information (returns a promise)
    const extractor = await createExtractorFromFile({
      filepath: file,
      targetPath: destination
    });
    // Extract the files
    [...extractor.extract().files];
  } catch (err) {
    // May throw UnrarError, see docs
    console.error(err);
  }
}
// Files are put directly into the destination
// The full path of folders are created if they are missing
// extractRarArchive("./1108.rar", "./1108");

module.exports = {
  empty,
}