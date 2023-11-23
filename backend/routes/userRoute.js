const express = require('express')
const mainController = require('../controller/userController')
const {authenticateToken} = require('../auth/auth')

const router = express.Router()

router.route('/test') .get(mainController.test)
router.route('/test1') .get(mainController.test1)
router.route('/register') .post(mainController.register)
// router.route('/show-users').get(mainController.getAllUsersWithRedis)
 router.route('/show-users').get(mainController.getAllUsers)
router.route('/show-user').get(authenticateToken,mainController.getUserById)
router.route('/login') .post(mainController.login)
router.route('/logout').get(mainController.logout)
router.route('/me').get(authenticateToken,mainController.me)
router.route('/deleteUser/:id') .delete(authenticateToken,mainController.deleteUserById)
router.route("/:id/verify/:token/").get(mainController.verify);
router.route("/update-profile-image").post(authenticateToken,mainController.updateProfileImage)
//------------------------------------------------------------------------------------
router.route('/sendEmailToUser').post(mainController.SendEmailToController)


module.exports = router