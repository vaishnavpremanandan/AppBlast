const Project = require('../models/project');
const cloudinary = require('cloudinary').v2;

const categories = ['toprated', 'newposts', 'mostreviewed'];

// Calculates the average rating of a set of reviews

const averageRating = (arr) => {
    if (!arr.length || !arr) return 0;
    let sum = 0;
    for (let value of arr) {
        sum += value.rating;
    }
    return Math.floor(sum / arr.length);
}

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
    const { category } = req.query;
    const projects = await Project.find().populate('reviews').populate('author');
    if (category && categories.indexOf(category) < 0) {
        return res.status(404).json({ status: 404, message: 'Unknown Category'});
    }
    if (category && category === 'newposts') {
        projects.sort((a, b) => b.date - a.date);
        return res.status(200).send(projects);
    }
    if (category && category === 'mostreviewed') {
        projects.sort((a, b) => b.reviews.length - a.reviews.length);
        return res.status(200).send(projects);
    }
    if (category && category === 'toprated') {
        projects.sort((a, b) => averageRating(b.reviews) - averageRating(a.reviews));
        return res.status(200).send(projects);
    }
    return res.status(200).send(projects);
}

// Show all projects of a certain user 

module.exports.showProjectsUser = async (req, res) => {
    const { id } = req.params;
    const projects = await Project.find({ author: id }).populate('reviews').populate('author');
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
    }).populate('author');
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