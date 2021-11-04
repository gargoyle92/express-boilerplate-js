# sequelize migrations guide

sequelize 의 migrations 기능에 대한 가이드 문서입니다.

migrations 는 데이터베이스 스키마의 생성/수정/삭제등을 코드로 진행할 수 있는 기능으로,
별도의 테이블을 통하여 그 기록이 관리됩니다.

## 1. migration 파일 생성

migration 파일명을 적절히 입력하여 터미널을 통하여 아래명령어로 파일을 생성합니다.

    `npm run migration-create {filename]`

위와 같이 커맨드를 진행하게 되면 `/migrations/` 아래 파일이 생성되게 됩니다.

## 2. 생성한 migration 파일 이동

생성한 파일은 `/src/migrations/` 안에 존재해야지만 정상적으로 작동되기 때문에 1번에서 생성한 파일을 이동시켜줍니다.

    `/migrations/* -> /src/migrations/`

파일 이동을 완료하셨다면, 서버 구동시 자동으로 실행되게 됩니다.
