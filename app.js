const fs = require('fs'); // 파일 시스템 모듈을 불러옵니다.
const path = require('path'); // 경로 관련 작업을 위한 모듈을 불러옵니다.

const directories = ['./video', './capture', './중복', './image']; // 필요한 디렉토리 목록을 설정합니다.
const srcDir = './'; // 원본 파일이 위치하는 디렉토리를 설정합니다.

directories.forEach((dir) => {
  // 각 디렉토리에 대해 다음의 작업을 수행합니다.
  if (!fs.existsSync(dir)) {
    // 디렉토리가 존재하지 않으면
    fs.mkdirSync(dir); // 해당 디렉토리를 생성합니다.
    console.log(`${dir} 디렉토리를 생성하였습니다.`); // 생성 완료 메시지를 출력합니다.
  } else {
    console.log(`${dir} 디렉토리는 이미 존재합니다.`); // 이미 존재할 경우 메시지를 출력합니다.
  }
});

fs.readdir(srcDir, (err, files) => {
  // 원본 디렉토리의 파일 목록을 읽어옵니다.
  if (err) throw err; // 에러가 발생하면 에러를 던집니다.

  files.forEach((file) => {
    // 각 파일에 대해 다음의 작업을 수행합니다.
    let ext = path.extname(file).toLowerCase(); // 파일의 확장자를 가져옵니다.
    let base = path.basename(file, ext); // 파일의 기본 이름을 가져옵니다.
    let destDir; // 목적지 디렉토리를 저장할 변수를 선언합니다.

    if (ext === '.jpg') {
      // 확장자가 .jpg인 경우
      if (base.includes('E')) {
        // 파일 이름에 'E'가 포함되어 있다면
        destDir = './중복'; // 목적지 디렉토리를 '중복'으로 설정합니다.
      } else {
        destDir = './image'; // 그렇지 않다면 목적지 디렉토리를 'image'로 설정합니다.
      }
    } else if (ext === '.png' || ext === '.aae') {
      // 확장자가 .png 혹은 .aae인 경우
      destDir = './capture'; // 목적지 디렉토리를 'capture'로 설정합니다.
    } else if (ext === '.mp4' || ext === '.mov') {
      // 확장자가 .mp4 혹은 .mov인 경우
      destDir = './video'; // 목적지 디렉토리를 'video'로 설정합니다.
    }

    if (destDir) {
      // 목적지 디렉토리가 설정되면
      fs.rename(path.join(srcDir, file), path.join(destDir, file), (err) => {
        // 파일을 목적지 디렉토리로 이동합니다.
        if (err) throw err; // 에러가 발생하면 에러를 던집니다.
      });
    }
  });
});
