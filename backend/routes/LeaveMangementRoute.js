const express = require('express')
const leaveManagementController = require('../controller/leaveManagementController')
const {authenticateToken} = require('../auth/auth')

const router = express.Router()

router.route('/add').post(authenticateToken,leaveManagementController.addReport)
router.route('/getLeaves').get(authenticateToken,leaveManagementController.getReport)


module.exports = router
