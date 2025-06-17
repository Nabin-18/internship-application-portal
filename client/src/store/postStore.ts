import { create } from 'zustand';


export interface Post {
  id: number;
  title: string;
  company: string;
  location: string;
  time: string;
  image: string;
  description: string;
  category: string;
}

interface PostStore {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  fetchPosts: () => Promise<void>;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  fetchPosts: async () => {
    try {
      const res = await fetch("http://localhost:8000/admin/get-post");
      const result = await res.json();
      set({ posts: result.data });
    } catch (err) {
      console.error("Error fetching posts from store:", err);
    }
  },
}));
