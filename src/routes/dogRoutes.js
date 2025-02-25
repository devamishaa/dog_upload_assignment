const express = require('express');
const dogController = require('../controllers/dogController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dogs
 *   description: API endpoints for managing dog images
 */

/**
 * @swagger
 * /api/dogs/upload:
 *   post:
 *     summary: Upload a dog's image
 *     tags: [Dogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Bulldog"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Dog image uploaded successfully
 *       400:
 *         description: Missing name or image
 *       401:
 *         description: Unauthorized
 */
router.post('/upload', auth, upload.single('image'), dogController.uploadDogPicture);

/**
 * @swagger
 * /api/dogs:
 *   get:
 *     summary: Get all dogs
 *     tags: [Dogs]
 *     responses:
 *       200:
 *         description: List of all dogs
 *       500:
 *         description: Server error
 */
router.get('/', dogController.getAllDogs);

/**
 * @swagger
 * /api/dogs/{id}:
 *   get:
 *     summary: Get a specific dog by ID
 *     tags: [Dogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65c9e59f4a3c3c0012b5a41a"
 *     responses:
 *       200:
 *         description: Dog details retrieved
 *       404:
 *         description: Dog not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', auth, dogController.getDogById);

/**
 * @swagger
 * /api/dogs/{id}:
 *   put:
 *     summary: Update a dog's image
 *     tags: [Dogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65c9e59f4a3c3c0012b5a41a"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Golden Retriever"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Dog image updated successfully
 *       400:
 *         description: Missing data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Dog not found
 */
router.put('/:id', auth, upload.single('image'), dogController.updateDogPicture);

/**
 * @swagger
 * /api/dogs/{id}:
 *   delete:
 *     summary: Delete a dog by ID
 *     tags: [Dogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65c9e59f4a3c3c0012b5a41a"
 *     responses:
 *       200:
 *         description: Dog deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Dog not found
 */
router.delete('/:id', auth, dogController.deleteDogPicture);

module.exports = router;
