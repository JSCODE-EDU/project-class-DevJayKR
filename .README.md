# Dependencies

- 실행하는 환경에 Docker가 설치되어 있어야 합니다.
- 실행하는 환경에 docker-compose가 설치되어 있어야 합니다.

# Run

1. 이 레포지토리를 클론합니다.
2. npm install 커맨드로 의존성 모듈을 설치합니다.
3. src/config 폴더의 validationSchema를 참고하여 프로젝트 루트 경로에 .env 파일을 세팅합니다.
4. docker-compose up -d 커맨드로 mysql을 도커 컨테이너에 백그라운드로 실행합니다.
5. npm run start:dev 커맨드로 웹 서버를 실행시킵니다.

## API DOCS

이 프로젝트는 NestJS CLI에 Swagger 플러그인을 사용하여 API 문서를 구성 했습니다.

> 웹 서버를 실행 시킨 뒤에 [http://localhost:3000/docs](http://localhost:3000/docs)로 이동하여 문서를 확인할 수 있습니다.
