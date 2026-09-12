import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, getBlogPost, formatBlogDate } from '@/lib/blog-posts';
import { Clock, ArrowLeft, ChevronRight } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const url = `https://www.juniorspark.in/blog/${post.slug}`;
  return {
    title: `${post.title} | JuniorSpark Blog`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: ['JuniorSpark Team'],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'JuniorSpark',
      url: 'https://www.juniorspark.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'JuniorSpark',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.juniorspark.in/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.juniorspark.in/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-[#fefeff]">
        {/* Top bar */}
        <div className="border-b border-gray-100 bg-white">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-800 truncate max-w-[200px] md:max-w-none">
              {post.title}
            </span>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 py-12">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={15} />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="inline-block text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">
              {post.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-6">{post.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400 border-t border-b border-gray-100 py-4">
              <span className="font-medium text-gray-600">JuniorSpark Team</span>
              <span>&middot;</span>
              <span>{formatBlogDate(post.date)}</span>
              <span>&middot;</span>
              <span className="flex items-center gap-1">
                <Clock size={13} />
                {post.readTime} min read
              </span>
            </div>
          </header>

          {/* Content */}
          <div className="prose-content space-y-8 text-gray-700 leading-relaxed">
            {post.sections.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-3">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-base md:text-lg leading-relaxed mb-4 text-gray-700">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="space-y-2 my-4 pl-1">
                    {section.list.map((item, k) => (
                      <li key={k} className="flex items-start gap-2 text-gray-700">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Give your child the edge</h2>
            <p className="text-blue-100 mb-6">
              Book a free 30-minute demo class — small batches, expert teachers, real results.
            </p>
            <Link
              href="/demo"
              className="inline-block bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Book Free Demo Class →
            </Link>
          </div>

          {/* Back link bottom */}
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
            >
              <ArrowLeft size={15} />
              Back to all articles
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
