const express = require('express')
const projectController = require('../controller/projectController')
const {authenticateToken} = require('../auth/auth')
const router = express.Router()

router.route('/add-member').post(projectController.addMemberToProject)
router.route('/create') .post(projectController.createProject)
router.route('/show-all') .get(projectController.getProjects)
router.route('/show') .get(authenticateToken,projectController.getProjectsByUser)




module.exports = router