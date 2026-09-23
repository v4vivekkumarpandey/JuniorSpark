import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blog-posts';

function categoryToSlug(category: string): string {
  return encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and'));
}

const SITE_URL = 'https://www.juniorspark.in';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/demo`,
      lastModified: new Date('2026-09-01'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...BLOG_POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date('2026-09-23'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date('2026-08-01'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...[...new Set(BLOG_POSTS.map((p) => p.category))].map((category) => ({
      url: `${SITE_URL}/blog/category/${categoryToSlug(category)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];
}
