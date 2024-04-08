const express = require('express')
const router = express.Router()
const defaultController = require('../controllers/defaultController')

/**
 * @openapi
 * /:
 *   get:
 *     tags:
 *       - Default
 *     description: Retourne le message de bienvenue
 *     responses:
 *       200:
 *         description: Un message de bienvenue au format JSON
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                    description: Le message de bienvenue
 *                    example: Bienvenue sur BakeAPI !
 */
router.get('/', defaultController.index)

module.exports = router
