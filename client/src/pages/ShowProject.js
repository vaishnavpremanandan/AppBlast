import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Main from "../components/layout/main/Main";
import ProjectItem from "../components/project/item/ProjectItem";
import Review from "../components/review/Review";
import { getIndividualProject } from "../lib/project-api";
import { newReview, deleteReview } from "../lib/review-api";
import useHttp from "../hooks/useHttp";
import Loading from "../components/UI/loading/Loading";
import ShowError from "../components/layout/error/ShowError";
import { showNotif } from "../store/notification-actions";

const ShowProject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const currentUserId = useSelector((state) => state.auth.currentUserId);

  const {
    sendRequest: getProjectRequest,
    status: getProjectStatus,
    data: project,
    error: getProjectError,
  } = useHttp(getIndividualProject, true);

  const {
    sendRequest: newReviewRequest,
    status: newReviewStatus,
    data: newReviewData,
    error: newReviewError,
  } = useHttp(newReview);

  const {
    sendRequest: deleteReviewRequest,
    status: deleteReviewStatus,
    data: deleteReviewData,
    error: deleteReviewError,
  } = useHttp(deleteReview);

  useEffect(() => {
    getProjectRequest(id);
  }, [getProjectRequest, id]);

  useEffect(() => {
    if (newReviewStatus === "completed" && !newReviewError) {
      getProjectRequest(id);
      dispatch(showNotif(newReviewData.message, "success"));
    }
    if (newReviewStatus === "completed" && newReviewError) {
      getProjectRequest(id);
      dispatch(showNotif(newReviewError, "error"));
    }
  }, [newReviewStatus, getProjectRequest, id, newReviewError, dispatch]);

  useEffect(() => {
    if (deleteReviewStatus === "completed" && !deleteReviewError) {
      getProjectRequest(id);
      dispatch(showNotif(deleteReviewData.message, "success"));
    }
    if (deleteReviewStatus === "completed" && deleteReviewError) {
      getProjectRequest(id);
      dispatch(showNotif(deleteReviewError, "error"));
    }
  }, [deleteReviewStatus, getProjectRequest, id, deleteReviewError, dispatch]);

  const newReviewHandler = (data) => {
    newReviewRequest(data, id, token);
  };

  const deleteReviewHandler = (reviewId) => {
    const userData = {
      author: currentUserId,
      token: token,
    };
    deleteReviewRequest(id, reviewId, userData);
  };

  let content = (
    <Fragment>
      <ProjectItem readOnly={false} project={project} />
      <Review
        onAddReview={newReviewHandler}
        onDeleteReview={deleteReviewHandler}
        reviews={project.reviews}
        isLoading={
          newReviewStatus === "pending" || deleteReviewStatus === "pending"
        }
      />
    </Fragment>
  );

  if (getProjectStatus === "pending") {
    content = <Loading />;
  }

  if (getProjectError) {
    content = <ShowError message={"Project not found"} />;
  }

  return <Main>{content}</Main>;
};

export default ShowProject;
