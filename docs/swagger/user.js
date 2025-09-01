/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: 사용자 ID
 *         password:
 *           type: string
 *           description: 사용자 비밀번호
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         status:
 *           type: integer
 */

/**
 * @swagger
 * /api/user/info:
 *   get:
 *     summary: 사용자 정보 조회
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/user/id/check:
 *   get:
 *     summary: 사용자 ID 중복 체크
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: 확인할 사용자 ID
 *     responses:
 *       200:
 *         description: 중복 체크 결과
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/user/join:
 *   post:
 *     summary: 사용자 회원가입
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - password
 *             properties:
 *               userId:
 *                 type: string
 *                 description: 사용자 ID
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호
 *     responses:
 *       200:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: 잘못된 요청 (아이디/비밀번호 누락, 중복 아이디)
 *       500:
 *         description: 서버 오류
 */