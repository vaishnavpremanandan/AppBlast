import { useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";

import { getProjects } from "../lib/project-api";
import Header from "../components/layout/header/Header";
import ProjectList from "../components/project/list/ProjectList";
import useHttp from "../hooks/useHttp";
import Loading from "../components/UI/loading/Loading";
import ShowError from "../components/layout/error/ShowError";
import Container from "../components/layout/container/Container";
import Category from "../components/layout/category/Category";

let content;

const Projects = () => {
  const location = useLocation();
  const {
    sendRequest,
    status,
    data: projects,
    error,
  } = useHttp(getProjects, true);
  const category = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    sendRequest(category, signal);
    return () => {
      controller.abort();
    };
  }, [sendRequest, category]);

  content = <ProjectList projects={projects} />;

  if (status === "pending" || error === "The user aborted a request.") {
    content = <Loading />;
  }

  if (error && error !== "The user aborted a request.") {
    content = <ShowError message={error} />;
  }

  if (status === "completed" && (!projects || projects.length === 0)) {
    content = <ShowError message={"No projects found"} />;
  }

  return (
    <Fragment>
      <Header />
      <Container>
        <Category />
        {content}
      </Container>
    </Fragment>
  );
};

export default Projects;
