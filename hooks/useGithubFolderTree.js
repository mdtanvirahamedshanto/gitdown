import { fetchFolderData, processFolderContents } from "@/utils/apiUtils";
import { useState } from "react";

export const useGitHubFolderTree = (folderUrl, apiKey) => {
  const [repoFiles, setRepoFiles] = useState([]);
  const [repoInfo, setRepoInfo] = useState({
    user: "",
    repo: "",
    branch: "",
    dir: "",
  });
  const { repo, branch, dir } = repoInfo;
  const [error, setError] = useState("");
  const [log, setLog] = useState("");

  const fetchRepositoryContents = async () => {
    try {
      const urlRegex =
        /https:\/\/github.com\/([^\/]+)\/([^\/]+)\/tree\/([^\/]+)\/?(.*)/;
      if (!folderUrl) {
        setError("Please enter a GitHub folder URL");
        return;
      }

      const matches = folderUrl.match(urlRegex);

      if (!matches) {
        setError("Invalid GitHub folder URL");
        return;
      }

      const user = matches[1];
      const repo = matches[2];
      const branch = matches[3];
      const dir = matches[4] || "";

      setRepoInfo({ user, repo, branch, dir });

      setLog(
        `Extracted user: ${user}, repo: ${repo}, branch: ${branch}, dir: ${dir}`
      );

      const apiUrl = `https://api.github.com/repos/${user}/${repo}/contents/${dir}?ref=${branch}`;
      setLog(`Fetching repository contents from ${apiUrl}`);
      const folderData = await fetchFolderData(
        apiUrl,
        setError,
        setLog,
        apiKey
      );
      setLog("Folder data fetched");

      const processedFiles = await processFolderContents(
        folderData,
        setError,
        setLog,
        dir,
        apiKey
      );
      setRepoFiles((prevFiles) =>
        [...prevFiles, ...processedFiles].filter(Boolean)
      );
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  return {
    repoFiles,
    fetchRepositoryContents,
    error,
    log,
    repoInfo,
  };
};
