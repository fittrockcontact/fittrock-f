import { getAllBlogPosts, BlogPost } from './blog';

export interface Author {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  shortBio: string;
  avatar: string;
  coverImage?: string;
  location?: string;
  education?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
    website?: string;
  };
  expertise: string[];
}

export const authorsData: Author[] = [
  {
    id: 'author-1',
    slug: 'dr-rahul-vance',
    name: 'Dr. Rahul Vance',
    role: 'Ergonomics & Spinal Specialist',
    shortBio: 'Orthopedic ergonomist specializing in musculoskeletal health, posture alignment, and active workplace design.',
    bio: 'Dr. Rahul Vance is an orthopedic ergonomics specialist with over 12 years of experience advising Fortune 500 enterprises and remote workspaces on spinal health, dynamic workstation setups, and repetitive strain injury (RSI) prevention. He holds a Doctorate in Physical Therapy and Workplace Ergonomics from Manipal University.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1200&q=80',
    location: 'Bengaluru, India',
    education: 'D.P.T. in Physical Ergonomics & Biomechanics',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'rahul.vance@fittrock.com',
    },
    expertise: ['Spinal Ergonomics', 'Sit-Stand Dynamics', 'Biomechanics', 'Workstation Audits'],
  },
  {
    id: 'author-2',
    slug: 'karan-malhotra',
    name: 'Karan Malhotra',
    role: 'Lead Product Engineer & Industrial Designer',
    shortBio: 'Hardware engineer focused on dual-motor kinematics, whisper-quiet gearing systems, and heavy-duty steel desk architecture.',
    bio: 'Karan Malhotra leads hardware engineering at Fittrock, designing heavy-duty dual-motor lift columns, synchronized gyro anti-collision controllers, and reinforced steel frames. Prior to Fittrock, he engineered precision mechatronic drive systems for German automotive suppliers.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
    location: 'Pune, India',
    education: 'M.Tech in Mechatronics & Precision Machinery',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'karan.malhotra@fittrock.com',
    },
    expertise: ['Motor Mechanics', 'Industrial Design', 'Anti-Collision Sensors', 'Durability Testing'],
  },
  {
    id: 'author-3',
    slug: 'ananya-roy',
    name: 'Ananya Roy',
    role: 'Senior Workspace Stylist & Architect',
    shortBio: 'Interior architect focused on minimalist ergonomics, wireless cable management, and biophilic home office aesthetics.',
    bio: 'Ananya Roy is an interior architect and creative director with a passion for designing distraction-free, functional workspaces. She writes extensively about natural wood grain finishes, cable management spines, acoustic balance, and creating energizing home office environments.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
    location: 'Mumbai, India',
    education: 'B.Arch in Sustainable Interior Design',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'ananya.roy@fittrock.com',
    },
    expertise: ['Desk Setup Aesthetics', 'Cable Management', 'Biophilic Design', 'Lighting Ergonomics'],
  },
];

export function getAllAuthors(): Author[] {
  return authorsData;
}

export function getAuthorBySlug(slug: string): Author | null {
  return authorsData.find((a) => a.slug === slug) || null;
}

export function getAuthorByName(name: string): Author | null {
  const cleanName = name.toLowerCase().trim();
  return (
    authorsData.find(
      (a) =>
        a.name.toLowerCase().includes(cleanName) ||
        cleanName.includes(a.name.toLowerCase()) ||
        a.slug.includes(cleanName.replace(/\s+/g, '-'))
    ) || null
  );
}

export function getPostsByAuthor(authorIdentifier: string): BlogPost[] {
  const allPosts = getAllBlogPosts();
  const clean = authorIdentifier.toLowerCase().trim();

  return allPosts.filter((p) => {
    const authorName = (p.author || '').toLowerCase();
    return (
      authorName.includes(clean) ||
      clean.includes(authorName) ||
      authorName.replace(/[^a-z]/g, '') === clean.replace(/[^a-z]/g, '')
    );
  });
}
