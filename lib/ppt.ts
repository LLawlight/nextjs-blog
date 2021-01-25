import path from "path";
import fs from "fs";
import { format } from "date-fns";

const postsDirectory = path.join(process.cwd(), "public/ppt");

export function getSortedPPTData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.pptx$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileStat = fs.statSync(fullPath);

    // Combine the data with the id
    return {
      id,
      date: format(fileStat.ctime, "yyyy-MM-dd"),
      title: id,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPPTIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: encodeURIComponent(fileName.replace(/\.pptx$/, "")),
      },
    };
  });
}

export async function getPPTData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.pptx`);
  const fileStat = fs.statSync(fullPath);

  return {
    id,
    date: format(fileStat.ctime, "yyyy-MM-dd"),
    title: id,
  };
}
