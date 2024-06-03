"use client";
import site from "../config/site";
import Download from "./Download";

export default function HomePage() {
  return (
    <div className="sm:max-w-7xl max-w-xl h-[35rem] pt-5 mx-auto w-full my-12 px-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl items-center text-center font-bold">
          {site.name}
        </h1>
        <p className="font-sans items-center  text-lg font-medium text-center">
          {site.description}
        </p>
      </div>
      <div className="w-full items-center flex flex-col">
        <Download />
        <a
          className="text-blue-700 text-sm mt-2 block"
          href="https://github.com/settings/tokens/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          Create token
        </a>
      </div>
    </div>
  );
}
