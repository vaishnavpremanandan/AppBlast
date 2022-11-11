import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import PropTypes from "prop-types";

import Card from "../../UI/card/Card";
import classes from "./ProjectItem.module.css";
import { deleteProject } from "../../../lib/project-api";
import useHttp from "../../../hooks/useHttp";
import Loading from "../../UI/loading/Loading";
import { showNotif } from "../../../store/notification-actions";
import PrimaryButton from "../../UI/button/PrimaryButton";

const averageRating = (arr) => {
  if (!arr.length || !arr) return 0;
  let sum = 0;
  for (let value of arr) {
    sum += value.rating;
  }
  return Math.floor(sum / arr.length);
};

const ProjectItem = ({ project, readOnly }) => {
  const { sendRequest, status, data, error } = useHttp(deleteProject);
  const currentUserId = useSelector((state) => state.auth.currentUserId);
  const token = useSelector((state) => state.auth.token);
  const history = useHistory();
  const dispatch = useDispatch();

  const overallRating = averageRating(project.reviews);

  useEffect(() => {
    if (status === "completed" && !error) {
      history.replace("/projects");
      dispatch(showNotif(data.message, "success"));
    }
    if (status === "completed" && error) {
      history.replace("/projects");
      dispatch(showNotif(error, "error"));
    }
  }, [status, history, dispatch, error]);

  const deleteProjectHandler = () => {
    sendRequest(project._id, currentUserId, token);
  };

  const editAndDelete = (
    <div>
      <Link to={`/projects/${project._id}/edit`}>
        <PrimaryButton>Edit</PrimaryButton>
      </Link>
      <PrimaryButton onClick={deleteProjectHandler}>Delete</PrimaryButton>
    </div>
  );

  let content = (
    <div className={classes.itemcontainer}>
      <div className={classes.imgcontainer}>
        <img src={project.image.url} />
      </div>
      <div className={classes.textcontainer}>
        <h1>{project.title}</h1>
        <p className={classes.author}>Posted by: {project.author.username}</p>
        <p>{project.description}</p>
        {!readOnly && (
          <a href={project.link} className={classes.repolink}>
            {project.link}
          </a>
        )}
        <Rating
          size={25}
          readonly={true}
          initialValue={overallRating}
          className={classes.stars}
          allowHalfIcon={true}
        />
        {currentUserId === project.author._id && !readOnly && editAndDelete}
      </div>
    </div>
  );

  if (status === "pending") {
    content = <Loading />;
  }

  return <Card>{content}</Card>;
};

ProjectItem.propTypes = {
  projects: PropTypes.object,
  readOnly: PropTypes.bool,
};

export default ProjectItem;
