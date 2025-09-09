/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     GameData:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           description: 게임 데이터
 *         status:
 *           type: integer
 *           description: 응답 상태 코드
 *         favorite:
 *           type: boolean
 *           description: 즐겨찾기 여부 (로그인된 사용자만)
 *     DNFCharacterList:
 *       type: object
 *       properties:
 *         rows:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               characterId:
 *                 type: string
 *                 description: 캐릭터 ID
 *               characterName:
 *                 type: string
 *                 description: 캐릭터명
 *               level:
 *                 type: integer
 *                 description: 레벨
 *               jobId:
 *                 type: string
 *                 description: 직업 ID
 *               jobGrowId:
 *                 type: string
 *                 description: 전직 ID
 *               jobName:
 *                 type: string
 *                 description: 직업명
 *               jobGrowName:
 *                 type: string
 *                 description: 전직명
 *               fame:
 *                 type: integer
 *                 description: 명성
 *               favorite:
 *                 type: boolean
 *                 description: 즐겨찾기 여부 (로그인된 사용자만)
 *           description: 캐릭터 목록
 *     MatchData:
 *       type: object
 *       properties:
 *         matches:
 *           type: array
 *           items:
 *             type: object
 *           description: 매치 리스트
 *     FavoriteRequest:
 *       type: object
 *       required:
 *         - params
 *       properties:
 *         params:
 *           type: object
 *           required:
 *             - game
 *             - nickname
 *           properties:
 *             game:
 *               type: string
 *               description: 게임 종류
 *             nickname:
 *               type: string
 *               description: 닉네임
 *             player_id:
 *               type: string
 *               description: 플레이어 ID
 */

/**
 * @swagger
 * /api/game/cyphers:
 *   get:
 *     summary: 사이퍼즈 유저 정보 조회
 *     tags: [Game - Cyphers]
 *     security:
 *       - bearerAuth: []
 *       - {}
 *     parameters:
 *       - in: query
 *         name: nickname
 *         required: true
 *         schema:
 *           type: string
 *         description: 사이퍼즈 닉네임
 *     responses:
 *       200:
 *         description: 사이퍼즈 유저 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DNFCharacterList'
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/game/cyphers/match:
 *   get:
 *     summary: 사이퍼즈 매치 리스트 조회
 *     tags: [Game - Cyphers]
 *     parameters:
 *       - in: query
 *         name: playerId
 *         required: true
 *         schema:
 *           type: string
 *         description: 플레이어 ID
 *     responses:
 *       200:
 *         description: 사이퍼즈 매치 리스트
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MatchData'
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/game/cyphers/match/{matchId}:
 *   get:
 *     summary: 사이퍼즈 매치 상세 조회
 *     tags: [Game - Cyphers]
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: string
 *         description: 매치 ID
 *     responses:
 *       200:
 *         description: 사이퍼즈 매치 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/game/dnf:
 *   get:
 *     summary: 던전앤파이터 캐릭터 정보 조회
 *     tags: [Game - DNF]
 *     security:
 *       - bearerAuth: []
 *       - {}
 *     parameters:
 *       - in: query
 *         name: characterName
 *         required: true
 *         schema:
 *           type: string
 *         description: 캐릭터명
 *       - in: query
 *         name: serverId
 *         required: true
 *         schema:
 *           type: string
 *         description: 서버 ID
 *     responses:
 *       200:
 *         description: DNF 캐릭터 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameData'
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/game/dnf/timeline:
 *   get:
 *     summary: DNF 캐릭터 타임라인 조회
 *     tags: [Game - DNF]
 *     parameters:
 *       - in: query
 *         name: characterId
 *         required: true
 *         schema:
 *           type: string
 *         description: 캐릭터 ID
 *       - in: query
 *         name: serverId
 *         required: true
 *         schema:
 *           type: string
 *         description: 서버 ID
 *     responses:
 *       200:
 *         description: DNF 캐릭터 타임라인
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameData'
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/game/dnf/detail:
 *   get:
 *     summary: DNF 캐릭터 상세 정보 조회
 *     tags: [Game - DNF]
 *     parameters:
 *       - in: query
 *         name: characterId
 *         required: true
 *         schema:
 *           type: string
 *         description: 캐릭터 ID
 *       - in: query
 *         name: serverId
 *         required: true
 *         schema:
 *           type: string
 *         description: 서버 ID
 *     responses:
 *       200:
 *         description: DNF 캐릭터 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameData'
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/game/lol:
 *   get:
 *     summary: 리그 오브 레전드 소환사 정보 조회
 *     tags: [Game - LoL]
 *     security:
 *       - bearerAuth: []
 *       - {}
 *     parameters:
 *       - in: query
 *         name: gameName
 *         required: true
 *         schema:
 *           type: string
 *         description: 게임 내 닉네임
 *       - in: query
 *         name: tagLine
 *         required: true
 *         schema:
 *           type: string
 *         description: 태그라인
 *     responses:
 *       200:
 *         description: LoL 소환사 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameData'
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/game/lol/{puuid}:
 *   get:
 *     summary: LoL 매치 리스트 조회
 *     tags: [Game - LoL]
 *     parameters:
 *       - in: path
 *         name: puuid
 *         required: true
 *         schema:
 *           type: string
 *         description: 플레이어 PUUID
 *     responses:
 *       200:
 *         description: LoL 매치 리스트
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MatchData'
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/game/favorites:
 *   post:
 *     summary: 즐겨찾기 추가/삭제
 *     tags: [Game - Common]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteRequest'
 *     responses:
 *       200:
 *         description: 즐겨찾기 처리 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: 잘못된 요청
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 오류
 */