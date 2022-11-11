import { useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getUserProject } from "../lib/project-api";
import Header from "../components/layout/header/Header";
import ProjectList from "../components/project/list/ProjectList";
import useHttp from "../hooks/useHttp";
import Loading from "../components/UI/loading/Loading";
import ShowError from "../components/layout/error/ShowError";
import Container from "../components/layout/container/Container";

let content;

const UserProjects = () => {
  const { id } = useParams();
  const {
    sendRequest,
    status,
    data: projects,
    error,
  } = useHttp(getUserProject, true);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    sendRequest(id, token);
  }, [sendRequest]);

  content = <ProjectList projects={projects} />;

  if (status === "pending") {
    content = <Loading />;
  }

  if (error) {
    content = <ShowError message={"No projects found"} />;
  }

  if (status === "completed" && (!projects || projects.length === 0)) {
    content = <ShowError message={"No projects found"} />;
  }

  return (
    <Fragment>
      <Header />
      <Container>{content}</Container>
    </Fragment>
  );
};

export default UserProjects;
