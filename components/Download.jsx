"use client";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

import downdir from "../lib/downdir";
import { tokenStore } from "../lib/downdir/utility";
const Download = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [repo, setRepo] = useState({
    url: {
      name: "url",
      type: "url",
      placeholder:
        "https://github.com/mdtanvirahamedshanto/gitdown/tree/master/public/logo.png",
      label: "Repo / Directory / File URL",
      value: "",
      required: true,
    },
    token: {
      name: "token",
      type: "text",
      placeholder: "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxjk",
      label: "Token",
      value: "",
    },
  });

  useEffect(() => {
    const token = tokenStore.get();
    if (token) {
      setRepo((prev) => ({
        ...prev,
        token: { ...prev.token, value: token },
      }));
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const { token, url } = repo;
      tokenStore.set(token.value);
      await downdir(url.value, token.value);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof TypeError) {
        setError(`${error.name}: ${error.message} (maybe the file is too big)`);
      } else {
        setError(error.message);
      }
      setIsLoading(false);
    }
  };

  const inputChangeHandler = (e) => {
    setRepo((prev) => ({
      ...prev,
      [e.target.name]: {
        ...prev[e.target.name],
        value: e.target.value,
      },
    }));
  };

  return (
    <div className="flex flex-col w-[17rem] sm:w-[32rem] md:w-[45rem] text-gray-300">
      <form
        onSubmit={submitHandler}
        className="flex flex-col w-full gap-4 mt-8"
      >
        {Object.values(repo).map((repoInfo) => (
          <Input
            key={repoInfo.name}
            onChange={inputChangeHandler}
            {...repoInfo}
          />
        ))}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button isLoading={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Download;
