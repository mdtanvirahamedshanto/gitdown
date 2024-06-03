import axios from "axios";

export const fetchFolderData = async (folderUrl, setError, setLog, apiKey) => {
  const contentIndex = folderUrl.indexOf("contents/") + "contents/".length;
  const decodedUrl = decodeURIComponent(
    contentIndex > 0 ? folderUrl.substring(contentIndex) : folderUrl
  );
  setLog(`Fetching data from ${decodedUrl}`);
  const options = {};
  if (apiKey) {
    options.headers = {
      Authorization: `Bearer ${apiKey}`,
    };
  }
  const { data: response } = await axios.get(folderUrl, options);
  setLog(`Data fetched from ${decodedUrl}`);
  return response;
};

export const processFolderContents = async (
  folder,
  setError,
  setLog,
  path,
  apiKey
) => {
  const filePromises = folder.map(async (item) => {
    try {
      if (item.type === "file") {
        setLog(`Processing ${item.name}`);
        const extension = item.name.split(".").pop() || "unknown";
        const sizeInKB = Math.round(parseInt(item.size) / 1024);
        let size;
        if (sizeInKB >= 1024) {
          const sizeInMB = (sizeInKB / 1024).toFixed(2);
          size = sizeInMB + " MB";
        } else {
          size = sizeInKB + " KB";
        }

        return {
          name: item.name,
          file_type: extension,
          download_url: item.download_url,
          sha: item.sha,
          size: size,
          path: item.path,
        };
      } else if (item.type === "dir") {
        setLog(`Processing ${item.name}`);
        const subFolder = await fetchFolderData(
          item.url,
          setError,
          setLog,
          apiKey
        );

        if (subFolder !== null) {
          setLog(`Processing ${item.name}`);
          const subFolderFiles = await processFolderContents(
            subFolder,
            setError,
            setLog,
            item.path,
            apiKey
          );
          setLog(`Processed ${item.name}`);
          return subFolderFiles;
        } else {
          setLog(
            `Skipping ${item.name} due to error in fetching subfolder data`
          );
          return null;
        }
      }
    } catch (error) {
      setError(`Error processing ${item.name}: ${error.message}`);
      return null;
    }
  });

  const files = await Promise.all(filePromises);
  const flattenedFiles = files.flat();

  setLog("Processing complete");
  return flattenedFiles.filter((file) => file !== null);
};
