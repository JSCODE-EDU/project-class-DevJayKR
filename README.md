# Dependencies

- 실행하는 환경에 Docker가 설치되어 있어야 합니다.
- 실행하는 환경에 docker-compose가 설치되어 있어야 합니다.

# Run

1. 이 레포지토리를 클론합니다.
2. npm install 커맨드로 의존성 모듈을 설치합니다.
3. 아래 목차중 환경 변수 예시 부분을 참고하여 src/config/env 경로에 development.env 파일을 준비 합니다.

   주의: 프로젝트 실행 시 NODE_ENV 환경 변수에 의하여 env 파일을 찾습니다. 예로 NODE_ENV=development 라면 src/config/env/development.env 파일이 환경 변수로 사용됩니다.

4. npm run start:db 커맨드로 환경 변수를 주입하고 mysql을 도커 환경으로 실행합니다.

주의: 기본적으로 src/config/env/development.env 파일이 환경 변수로 사용됩니다.

5. npm run start:dev 커맨드로 웹 서버를 실행시킵니다.

## 환경 변수 예시

```
# SERVER
SERVER_PORT=8080

# MYSQL
MYSQL_ROOT_USER=rootuser
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_HOST=localhost 또는 컨테이너 명
MYSQL_PORT=3306
MYSQL_USER=dbuser
MYSQL_PASSWORD=dbpassword
MYSQL_DATABASE=dbname

# JWT
ACCESS_SECRET_KEY=accesskey
ACCESS_EXPIRE_TIME=1800000ms
```

## API DOCS

이 프로젝트는 NestJS CLI에 Swagger 플러그인을 사용하여 API 문서를 구성 했습니다.

> 웹 서버를 실행 시킨 뒤에 [http://localhost:8080/docs](http://localhost:8080/docs)로 이동하여 문서를 확인할 수 있습니다.
