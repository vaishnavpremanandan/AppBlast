const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { validateProject, isProjectAuthor } = require('../middleware');
const project = require('../controllers/project');
const passport = require('passport');

// Show all projects route

router.get('/', wrapAsync(project.showProjects));

// Create project route

router.post(
    '/', 
    passport.authenticate('jwt', { session: false }), 
    validateProject, 
    wrapAsync(project.createProject)
);

// Show individual project route

router.get('/:id', wrapAsync(project.showIndividualProject));

//  Edit Project Route

router.put(
    '/:id', 
    passport.authenticate('jwt', { session: false }), 
    isProjectAuthor, 
    validateProject, 
    wrapAsync(project.editProject)
);

// Delete project route

router.delete('/:id', passport.authenticate('jwt', { session: false }), isProjectAuthor, wrapAsync(project.deleteProject));

module.exports = router;