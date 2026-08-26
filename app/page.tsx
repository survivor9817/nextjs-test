"use client";

import { useQuery } from "@tanstack/react-query";

// تعریف تایپ پست
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// تابع fetch برای دریافت داده
const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  if (!response.ok) {
    throw new Error("خطا در دریافت داده‌ها");
  }
  return response.json();
};

export default function Home() {
  const { data, error, isLoading } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <p className="text-lg">در حال بارگذاری...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <p className="text-red-500">خطا: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <h1 className="text-2xl font-bold mb-6">لیست پست‌ها</h1>
      <p>پستای عجیب تستی</p>
      <div className="space-y-4 w-full max-w-2xl">
        {data?.map((post) => (
          <div key={post.id} className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
