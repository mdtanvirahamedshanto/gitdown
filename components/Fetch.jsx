"use client";
import { useState } from "react";

import { useGitHubFolderTree } from "@/hooks/useGithubFolderTree";
import Spinner from "./Spinner";
const Fetch = () => {
  const [folderUrl, setFolderUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { repoFiles, error, log, fetchRepositoryContents, repoInfo } =
    useGitHubFolderTree(folderUrl, apiKey);

  const handleFetchClick = (e) => {
    setIsLoading(true);
    e.preventDefault();
    fetchRepositoryContents();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  if (repoFiles.length > 0) {
    console.log(repoFiles);
    console.log(repoInfo);
  }
  const handleDownload = async (mainUrl, fileExtension) => {
    const response = await fetch(`${mainUrl}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileExtension;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col w-[17rem] sm:w-[32rem] md:w-[45rem] text-gray-300 mb-10">
      <div className="flex flex-col w-full gap-4 mt-8">
        <div>
          <label
            htmlFor={""}
            className="block text-sm font-medium text-gray-300"
          >
            Download Dir File one by one{" "}
            <span aria-hidden="true" className="text-red-500">
              *
            </span>
          </label>
          <input
            name="text"
            type="text"
            value={folderUrl}
            onChange={(e) => setFolderUrl(e.target.value)}
            className="text-sm shadow-sm border-blue-300 rounded-md w-full block mt-2 
    appearance-none bg-gray-700 border py-2 px-3
    focus:ring-blue-500 focus:border-blue-500 focus:ring-2 focus:outline-2 focus:outline-transparent focus:outline-offset-2 focus:shadow-sm
    transition
    "
            placeholder="https://github.com/mdtanvirahamedshanto/gitdown/tree/master/public/images"
          />
        </div>

        <div>
          <label htmlFor="token">Token</label>
          <input
            type="text"
            className="text-sm shadow-sm border-blue-300 rounded-md w-full block mt-2 
      appearance-none bg-gray-700 border py-2 px-3
      focus:ring-blue-500 focus:border-blue-500 focus:ring-2 focus:outline-2 focus:outline-transparent focus:outline-offset-2 focus:shadow-sm
      transition
      "
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter GitHub API key (optional)"
          />
        </div>

        <button
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          onClick={handleFetchClick}
        >
          {isLoading ? <Spinner /> : "Fetch"}
        </button>
      </div>
      <div className="mt-7 w-[17rem] flex-col sm:w-[32rem] md:w-[45rem]  items-center flex justify-center">
        {error && <div className="mb-2 text-red-500">Error: {error}</div>}
        {log && <div className="mb-2 text-green-500">Status: {log}</div>}
        <table className="w-full  flex ">
          <tbody>
            {repoFiles.map((file) => (
              <tr
                className="flex  w-[17rem] justify-between items-center text-center sm:w-[35rem] md:w-[45rem] "
                key={file.download_url}
              >
                <td className="md:w-72 w-24 sm:w-40 overflow-hidden text-left ">
                  {file.name}
                </td>
                <td className="sm:w-8 w-4 sm:block hidden text-left  ">
                  {file.file_type}
                </td>
                <td className="w-14 text-left ">{file.size}</td>
                <a
                  className="sm:px-6 px-3 py-2 mt-1 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 cursor-pointer "
                  onClick={() => handleDownload(file.download_url, file.name)}
                >
                  Download
                </a>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fetch;
