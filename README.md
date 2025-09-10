# Board Game API

게임 통계를 관리하는 REST API 서버입니다. League of Legends, 던전앤파이터, 사이퍼즈 등 다양한 게임의 통계 데이터를 제공합니다.

## 🚀 프로젝트 개요

- **프로젝트명**: Board Game API
- **버전**: 1.0.0
- **프레임워크**: Express.js
- **데이터베이스**: MySQL
- **API 문서**: Swagger UI

## 📋 주요 기능

- 사용자 인증 및 관리 (JWT)
- 게임 통계 데이터 조회
- API 문서화 (Swagger)
- CORS 지원
- 요청 타임아웃 관리 (120초)

## 🛠️ 기술 스택

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.0.0
- **Database**: MySQL 2
- **Authentication**: JWT (jsonwebtoken)
- **Password Encryption**: bcryptjs

### Dependencies
- `axios` - HTTP 클라이언트
- `cors` - CORS 미들웨어
- `dotenv` - 환경변수 관리
- `lodash` - 유틸리티 라이브러리
- `morgan` - HTTP 요청 로거
- `swagger-jsdoc` & `swagger-ui-express` - API 문서화

## 📁 프로젝트 구조

```
boardjs-api/
├── app.js                 # Express 애플리케이션 설정
├── db.js                  # MySQL 데이터베이스 연결 설정
├── package.json           # 프로젝트 의존성 및 스크립트
├── bin/
│   └── www               # 서버 시작점
├── routes/               # API 라우트
│   ├── users.js         # 사용자 관련 API
│   └── game.js          # 게임 관련 API
└── docs/
    └── swagger/         # Swagger API 문서
        ├── user.js      # 사용자 API 문서
        └── game.js      # 게임 API 문서
```

## ⚙️ 환경 설정

### 1. 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경변수를 설정하세요:

```bash
# 데이터베이스 설정
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# 서버 설정
PORT=3000
NODE_ENV=development

# JWT 설정 (필요한 경우)
JWT_SECRET=your_jwt_secret_key
```

### 2. 데이터베이스 설정

MySQL 데이터베이스를 설정하고 필요한 테이블을 생성하세요.

## 🚀 로컬 개발 환경 설정

### 1. 저장소 클론

```bash
git clone <repository-url>
cd boardjs-api
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경변수 설정

`.env` 파일을 생성하고 위의 환경변수를 설정하세요.

### 4. 데이터베이스 연결 확인

MySQL 서버가 실행 중인지 확인하고, 설정한 데이터베이스에 접근 가능한지 확인하세요.

### 5. 서버 실행

```bash
npm start
```

서버가 성공적으로 실행되면 다음 URL에서 접근할 수 있습니다:
- **API 서버**: http://localhost:3000
- **API 문서**: http://localhost:3000/api-docs

## 📖 API 문서

### Swagger UI
API 문서는 Swagger UI를 통해 제공됩니다:
- **URL**: http://localhost:3000/api-docs
- **인증**: Bearer Token (JWT) 사용

### 주요 엔드포인트

#### 사용자 관리
- `GET /api/user/info` - 사용자 정보 조회 (인증 필요)
- `GET /api/user/id/check` - 사용자 ID 중복 체크
- `POST /api/user/join` - 사용자 회원가입

#### 게임 관련
- `GET /api/game/*` - 게임 통계 관련 API (상세 내용은 Swagger 참조)

## 🔧 개발 도구

### 디버깅
- **로깅**: Morgan 미들웨어로 HTTP 요청 로깅
- **SQL 로깅**: 개발 환경에서 SQL 쿼리 자동 로깅
- **디버그**: debug 모듈 사용

### 보안
- **CORS**: 교차 출처 리소스 공유 활성화
- **JWT**: JSON Web Token 기반 인증
- **비밀번호 암호화**: bcryptjs 사용

## 🚢 CI/CD 배포 환경 설정

이 프로젝트는 **GitHub Actions**를 통한 자동 배포 시스템을 사용합니다. 코드 변경사항이 main 브랜치에 푸시되면 자동으로 Docker 이미지를 빌드하여 GitHub Container Registry에 저장하고, Portainer API를 통해 프로덕션 서버에서 컨테이너를 재시작합니다.

### 1. 배포 아키텍처

```
GitHub Repository → GitHub Actions → GitHub Container Registry → Portainer API → Production Server
```

### 2. 배포 파일 구성

#### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# 애플리케이션 코드 복사
COPY . .

# 포트 노출
EXPOSE 3000

# 프로덕션 환경으로 실행
CMD ["npm", "start"]
```

#### GitHub Actions 워크플로우 (.github/workflows/deploy.yml)
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3

    - name: Login to GitHub Container Registry
      uses: docker/login-action@v3
      with:
        registry: ghcr.io
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}

    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: |
          ghcr.io/${{ github.repository }}/boardjs-api:latest
          ghcr.io/${{ github.repository }}/boardjs-api:${{ github.sha }}
        cache-from: type=gha
        cache-to: type=gha,mode=max

    - name: Deploy to Portainer
      run: |
        curl -X POST "${{ secrets.PORTAINER_WEBHOOK_URL }}" \
          -H "Content-Type: application/json" \
          -d '{
            "repository": "ghcr.io/${{ github.repository }}/boardjs-api:latest"
          }'
```

### 3. GitHub Secrets 설정

GitHub 리포지토리의 Settings > Secrets and variables > Actions에서 다음 시크릿을 설정하세요:

```bash
# Portainer 웹훅 URL (컨테이너 재시작용)
PORTAINER_WEBHOOK_URL=https://your-portainer-domain/api/webhooks/your-webhook-id

# 추가적인 환경변수가 필요한 경우
# PRODUCTION_DB_HOST=your_db_host
# PRODUCTION_JWT_SECRET=your_jwt_secret
```

### 4. Portainer 설정

#### 4.1 Stack 구성 (docker-compose.yml)
```yaml
version: '3.8'

services:
  boardjs-api:
    image: ghcr.io/your-username/boardjs-api:latest
    container_name: boardjs-api
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DB_HOST=${DB_HOST}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - DB_NAME=${DB_NAME}
      - JWT_SECRET=${JWT_SECRET}
    restart: unless-stopped
    networks:
      - boardjs-network
    depends_on:
      - mysql

  mysql:
    image: mysql:8.0
    container_name: boardjs-mysql
    environment:
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
      - MYSQL_DATABASE=${DB_NAME}
      - MYSQL_USER=${DB_USER}
      - MYSQL_PASSWORD=${DB_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql
    restart: unless-stopped
    networks:
      - boardjs-network

volumes:
  mysql_data:

networks:
  boardjs-network:
    driver: bridge
```

#### 4.2 환경변수 설정
Portainer의 Stack 환경변수에서 다음을 설정:
```bash
DB_HOST=mysql
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=boardgame
JWT_SECRET=your_strong_jwt_secret
MYSQL_ROOT_PASSWORD=your_mysql_root_password
```

#### 4.3 웹훅 설정
1. Portainer에서 해당 Stack 선택
2. "Webhooks" 탭에서 새 웹훅 생성
3. 생성된 웹훅 URL을 GitHub Secrets에 등록

### 5. 배포 프로세스

#### 자동 배포
1. `main` 브랜치에 코드 푸시
2. GitHub Actions가 자동으로 트리거됨
3. Docker 이미지 빌드 및 GHCR에 푸시
4. Portainer 웹훅 호출로 컨테이너 재시작

#### 수동 배포
GitHub Actions 탭에서 "Deploy to Production" 워크플로우를 수동으로 실행 가능

### 6. 모니터링 및 로그

#### Portainer를 통한 모니터링
- **컨테이너 상태**: Portainer 대시보드에서 실시간 확인
- **로그 확인**: Portainer의 컨테이너 로그 뷰어 사용
- **리소스 모니터링**: CPU, 메모리 사용량 실시간 확인

#### 로그 수집
```bash
# 컨테이너 로그 확인
docker logs boardjs-api -f

# 특정 시간 범위의 로그
docker logs boardjs-api --since="2024-01-01T00:00:00" --until="2024-01-01T23:59:59"
```



