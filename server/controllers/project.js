const Project = require('../models/project');
const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    }
);

// Create project/post

module.exports.createProject = async (req, res, next) => {
    const project = new Project(req.body);
    await project.save();
    res.status(200).send({ status: '200', message: 'Successfully created a post' });
}

// Show all projects/post

module.exports.showProjects = async (req, res, next) => {
    const projects = await Project.find().populate('reviews').populate('author', 'username');
    res.status(200).send(projects);
}

// Show individual project/post

module.exports.showIndividualProject = async (req, res, next) => {
    const { id } = req.params;
    const project = await Project.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author', 'username _id');
    if (!project) {
        res.status(404).send({ status: '404', message: 'Project not found' });
    } else {
        res.status(200).send(project);
    }
}

// Edit project/post

module.exports.editProject = async (req, res, next) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (project.image.filename !== req.body.image.filename) {
        await cloudinary.uploader.destroy(project.image.filename);
    }
    await Project.findByIdAndUpdate(id, req.body);
    res.status(200).send({ status: '200', message: 'Successfully edited a post' });
}

// Delete project/post

module.exports.deleteProject = async (req, res, next) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    await cloudinary.uploader.destroy(project.image.filename);
    await Project.findByIdAndDelete(id);
    res.status(200).send({ status: '200', message: 'Successfully deleted a post' });
}