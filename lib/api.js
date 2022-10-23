import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');

function readFileSystem() {
  return fs.readdirSync(postsDirectory);
}

const getSlugByFileName = (fileName) => fileName.replace(/\.md$/, '');

const getPostsByName = (fileName, summaryOnly = false) => {
  const slug = getSlugByFileName(fileName);
  const fullPath = join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const { title, date } = data;
  if (summaryOnly) return { slug, title, date };
  return { slug, title, date, content };
};

export function getAllPosts(summaryOnly = false) {
  return readFileSystem().map((fileName) =>
    getPostsByName(fileName, summaryOnly)
  );
}

export function getPostBySlug(slug) {
  const fullPath = join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const { title, date } = data;
  return { slug, title, date, content };
}
