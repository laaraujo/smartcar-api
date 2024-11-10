import { Router } from "express";
import * as controllers from "./controllers";

const router = Router();

/**
 * @openapi
 * /vehicles/{id}:
 *   get:
 *     tags:
 *       - vehicles
 *     summary: Get vehicle information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Vehicle ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vin:
 *                   type: string
 *                   description: Vehicle identification number
 *                   example: 1234
 *                 color:
 *                   type: string
 *                   description: Color of the vehicle
 *                   example: Metallic Silver
 *                 doorCount:
 *                   type: integer
 *                   description: Number of doors on the vehicle
 *                   example: 4
 *                 driveTrain:
 *                   type: string
 *                   description: Type of drive train.
 *                   example: v8
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", controllers.getVehicle);

/**
 * @openapi
 * /vehicles/{id}/doors:
 *   get:
 *     tags:
 *       - vehicles
 *     summary: Get vehicle doors status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Vehicle ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   location:
 *                     type: string
 *                     description: The location of the vehicle door (e.g., 'frontLeft', 'backRight')
 *                     example: frontLeft
 *                   locked:
 *                     type: boolean
 *                     description: Indicates whether the door is locked.
 *                     example: true
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id/doors", controllers.getVehicleDoors);

/**
 * @openapi
 * /vehicles/{id}/fuel:
 *   get:
 *     tags:
 *       - vehicles
 *     summary: Get vehicle remaining fuel
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Vehicle ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 percent:
 *                   type: number
 *                   description: Remaining fuel tank percentage
 *                   example: 50.3
 *       404:
 *         description: Vehicle not found
 *       422:
 *         description: Invalid vehicle engine type
 *       500:
 *         description: Internal server error
 */
router.get("/:id/fuel", controllers.getVehicleFuel);

/**
 * @openapi
 * /vehicles/{id}/battery:
 *   get:
 *     tags:
 *       - vehicles
 *     summary: Get electric vehicle remaining battery
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Vehicle ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 percent:
 *                   type: number
 *                   description: Remaining battery percentage
 *                   example: 50.3
 *       404:
 *         description: Vehicle not found
 *       422:
 *         description: Invalid vehicle engine type
 *       500:
 *         description: Internal server error
 */
router.get("/:id/battery", controllers.getVehicleBattery);
/**
 * @openapi
 * /vehicles/{id}/engine:
 *   post:
 *     tags:
 *       - vehicles
 *     summary: Start/Stop vehicle engine
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Vehicle ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 enum:
 *                   - START
 *                   - STOP
 *                 description: Action to perform
 *             required:
 *               - action
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum:
 *                     - success
 *                     - error
 *                   description: Action result
 *                   example: success
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error (i.e. Missing or Invalid parameters)
 */
router.post("/:id/engine", controllers.startOrStopVehicleEngine);

export default router;
