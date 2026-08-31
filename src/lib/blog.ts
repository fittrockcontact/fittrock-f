import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  tags?: string[];
  content: string;
}

const contentDirectory = path.join(process.cwd(), 'content');

// Helper to ensure content directory exists
function ensureContentDirectory() {
  if (!fs.existsSync(contentDirectory)) {
    fs.mkdirSync(contentDirectory, { recursive: true });
  }
}

export function getAllBlogPosts(): BlogPost[] {
  ensureContentDirectory();

  try {
    const fileNames = fs.readdirSync(contentDirectory);
    const mdFiles = fileNames.filter((file) => file.endsWith('.md'));

    const allPosts = mdFiles.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        excerpt: data.excerpt || data.description || content.slice(0, 160).replace(/[#*`_]/g, '') + '...',
        date: data.date ? new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent',
        rawDate: data.date ? new Date(data.date).getTime() : 0,
        readTime: data.readTime || `${Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} min read`,
        image: data.image || data.coverImage || 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1000&q=80',
        author: data.author || 'Fittrock Ergonomics Team',
        authorRole: data.authorRole || 'Ergonomics Specialist',
        authorAvatar: data.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        tags: data.tags || ['Ergonomics', 'Workplace'],
        content,
      };
    });

    // Sort posts by date descending
    return allPosts.sort((a, b) => b.rawDate - a.rawDate);
  } catch (error) {
    console.error('Error reading blog posts from /content folder:', error);
    return [];
  }
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  ensureContentDirectory();

  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      excerpt: data.excerpt || data.description || content.slice(0, 160).replace(/[#*`_]/g, '') + '...',
      date: data.date ? new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent',
      readTime: data.readTime || `${Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} min read`,
      image: data.image || data.coverImage || 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1200&q=80',
      author: data.author || 'Fittrock Ergonomics Team',
      authorRole: data.authorRole || 'Ergonomics Specialist',
      authorAvatar: data.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      tags: data.tags || ['Ergonomics', 'Workplace'],
      content,
    };
  } catch (error) {
    console.error(`Error reading blog post for slug ${slug}:`, error);
    return null;
  }
}

export function getAllBlogPostSlugs(): string[] {
  ensureContentDirectory();
  try {
    const fileNames = fs.readdirSync(contentDirectory);
    return fileNames
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error fetching blog slugs:', error);
    return [];
  }
}
