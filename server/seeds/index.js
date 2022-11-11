const mongoose = require("mongoose");
const Project = require("../models/project");
const Review = require("../models/review");

mongoose.connect("mongodb://localhost:27017/projectReview");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected");
});

const seedDatabase = async () => {
  await Project.deleteMany({});
  await Review.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const project = new Project({
      title: "Project " + i,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a sem nec urna euismod vestibulum sit amet quis tellus. Sed ullamcorper justo quis ante viverra tincidunt non vel mauris. Nulla facilisi. Sed elementum enim tristique rhoncus placerat. Cras ultricies mauris eu risus facilisis malesuada. Sed viverra aliquet eros ut posuere. Proin condimentum lorem urna. ",
      link: "Test Project Link",
      date: new Date().getTime(),
      image: {
        url: "https://res.cloudinary.com/de9dxfdav/image/upload/v1666542711/AppBlast/d91a4dleelzsoqpholxj.jpg",
        filename: "AppBlast/d91a4dleelzsoqpholxj",
      },
      author: "633d392152a9886459c49b3b",
    });
    await project.save();
  }
};

seedDatabase().then(() => {
  db.close();
});
