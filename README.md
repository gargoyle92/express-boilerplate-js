# API Back-end 필수 설치 가이드

## `Nodejs 12.21.0 LTS` 필수 설치

## `Redis` 필수 설치

## `GM (graphicsmagick)` 필수 설치

이미지 리사이즈 및 관련 툴인 gm 의존성이 있는 상태이므로 꼭 해당 OS에 설치를 하고 서버를 기동해야 합니다.  
`미설치시 이미지 리사이즈 불가능`

    $  sudo apt install imagemagick
    $  sudo apt install graphicsmagick
    $  npm i gm

`gm` 에 의존성 옵션으로 인하여 설치가 불가할 경우 방법

    $ npm install --no-optional --save gm

# MSSQL Sequelize 관련 필수 설정

`Sequelize MSSQL` 에선 `Date` 타입의 `String` 및 별도 포맷 리턴 옵션 값을 지원하지 않습니다.  
그러므로 수동으로 라이브러리 수정이 필요합니다.

1. `../node_modules/sequelize/lib/dialects/mssql/data-types.js` 이동
2. 아래 코드를 찾습니다.

```
  class DATE extends BaseTypes.DATE {
    toSql() {
      return 'DATETIMEOFFSET';
      }
    }
```

3. 그 후 아래 코드를 추가 합니다.

```
  class DATE extends BaseTypes.DATE {
    toSql() {
      return 'DATETIMEOFFSET';
      }
    static parse(value, options) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss.SSS');
      }
    }
```

# 배포/개발 환경 선언

배포 : `npm run build` 를 통하여 dist 디렉토리를 생성 후 배포 환경시 구동가능.

개발 : `/src` 하위 폴더를 기준으로 구동가능.

    $  export NODE_ENV=production
    $  export NODE_ENV=development
