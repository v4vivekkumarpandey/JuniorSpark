import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS, formatBlogDate } from '@/lib/blog-posts';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'English Learning Blog for Parents | JuniorSpark',
  description:
    'Expert tips and guides to help Indian parents support their child\'s English speaking journey — from phonics to public speaking, ages 5–15.',
  alternates: { canonical: 'https://www.juniorspark.in/blog' },
  openGraph: {
    title: 'English Learning Blog for Parents | JuniorSpark',
    description:
      "Expert tips and guides to help Indian parents support their child's English speaking journey.",
    url: 'https://www.juniorspark.in/blog',
    type: 'website',
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  'Tips for Parents': 'bg-blue-50 text-blue-700',
  'Child Development': 'bg-purple-50 text-purple-700',
  'Parents Guide': 'bg-amber-50 text-amber-700',
  'Learning Guide': 'bg-green-50 text-green-700',
};

export default function BlogPage() {
  const sorted = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const [featured, ...rest] = sorted;

  return (
    <main className="min-h-screen bg-[#fefeff]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/10 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <BookOpen size={15} />
            JuniorSpark Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Helping Parents Raise{' '}
            <span className="text-primary">Confident English Speakers</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practical tips, age-wise guides, and expert insights to support your child&apos;s
            English learning journey — from phonics to public speaking.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-14">
        {/* Featured post */}
        <div className="mb-14">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">
            Latest Article
          </h2>
          <Link
            href={`/blog/${featured.slug}`}
            className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_COLORS[featured.category] ?? 'bg-gray-100 text-gray-600'}`}
                >
                  {featured.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={12} />
                  {featured.readTime} min read
                </span>
                <span className="text-xs text-gray-400">{formatBlogDate(featured.date)}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-3">
                {featured.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{featured.excerpt}</p>
              <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                Read article <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        </div>

        {/* Rest of posts */}
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">
          More Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-600'}`}
                >
                  {post.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-2 flex-1">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={11} />
                  {post.readTime} min read
                </span>
                <span className="text-xs text-gray-400">{formatBlogDate(post.date)}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-primary rounded-2xl p-8 md:p-10 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ready to see real results?
          </h2>
          <p className="text-blue-100 mb-6 max-w-lg mx-auto">
            Book a free 30-minute demo class and watch your child speak English with confidence —
            in a small batch of just 4–5 kids.
          </p>
          <Link
            href="/demo"
            className="inline-block bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Book Free Demo Class
          </Link>
        </div>
      </div>
    </main>
  );
}
