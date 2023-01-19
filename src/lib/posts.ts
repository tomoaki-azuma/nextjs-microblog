import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

interface PostData {
  content: string;
  data: ResultData;
  isEmpty: boolean;
  excerpt: string;
  orig: string;
}

interface ResultData {
  title: string;
  date: string;
  thumbnail: string;
}

export interface MdResult {
  id: string;
  data: ResultData;
}

export interface PostIdParam {
  params: {
    id: string;
  };
}

export interface PostDetailData extends MdResult {
  blogContent: string;
}

export function getPostData(): MdResult[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostData: MdResult[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult: unknown = matter(fileContents);
    return {
      id,
      data: { ...(matterResult as PostData).data },
    };
  });
  return allPostData;
}

export function getALLPostIds(): PostIdParam[] {
  const fileNames: string[] = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostDataById(id: string): Promise<PostDetailData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const matterResult: unknown = matter(fileContent);
  const blogContent = await remark()
    .use(html)
    .process((matterResult as PostData).content);
  const blogContentHTML = blogContent.toString();
  return {
    id,
    blogContent: blogContentHTML,
    data: { ...(matterResult as PostData).data },
  };
}
