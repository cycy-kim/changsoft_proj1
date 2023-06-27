import React, { useState, useEffect } from "react";
import axios from "axios";
import urlPrefix from "./../../resource/URL_prefix.json";

const ProjectDetail = (props: any) => {
  const [selectedProject, setSelectedProject] = useState(props.projectName);

  
  useEffect(() => {
    setSelectedProject(props.projectName); // Update the state when propValue changes
  }, [props.projectName]);

  return <div>{selectedProject} 선택했읍니다,,</div>;
};

export default ProjectDetail;
