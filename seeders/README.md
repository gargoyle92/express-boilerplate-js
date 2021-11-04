# sequelize seeders guide

sequelize 의 seeders 기능에 대한 가이드 문서입니다.

seeders 는 데이터베이스 초기화시 샘플 및 초기데이터가 필요할 경우 사용할 수 있습니다.
그리고 별도의 테이블로 기록되어 관리되어집니다.

## 1. seeder 파일 생성

seeder 파일명을 적절히 입력하여 터미널을 통하여 아래명령어로 파일을 생성합니다.

    `npm run seeder-create {filename]`

위와 같이 커맨드를 진행하게 되면 `/seeders/` 아래 파일이 생성되게 됩니다.

## 2. 생성한 seeder 파일 이동

생성한 파일은 `/src/seeders/` 안에 존재해야지만 정상적으로 작동되기 때문에 1번에서 생성한 파일을 이동시켜줍니다.

    `/seeders/* -> /src/seeders/`

파일 이동을 완료하셨다면, 서버 구동시 자동으로 실행되게 됩니다.
