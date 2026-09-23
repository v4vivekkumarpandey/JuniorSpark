import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, getBlogPost, getRelatedPosts, formatBlogDate } from '@/lib/blog-posts';
import { Clock, ArrowLeft, ChevronRight, ArrowRight, List } from 'lucide-react';

function slugifyHeading(heading: string): string {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const SITE_URL = 'https://www.juniorspark.in';
const OG_IMAGE = `${SITE_URL}/opengraph-image`;

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

  const url = `${SITE_URL}/blog/${post.slug}`;
  // Keep title under 60 chars for Google
  const seoTitle =
    post.title.length <= 50
      ? `${post.title} | JuniorSpark`
      : post.title;

  return {
    title: seoTitle,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
      publishedTime: `${post.date}T00:00:00+05:30`,
      modifiedTime: `${post.date}T00:00:00+05:30`,
      authors: [`${SITE_URL}/about`],
      tags: post.tags,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [OG_IMAGE],
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  'Tips for Parents': 'bg-blue-50 text-blue-700',
  'Child Development': 'bg-purple-50 text-purple-700',
  'Parents Guide': 'bg-amber-50 text-amber-700',
  'Learning Guide': 'bg-green-50 text-green-700',
  'Speaking Practice': 'bg-teal-50 text-teal-700',
  'Public Speaking': 'bg-indigo-50 text-indigo-700',
  'Speech Writing': 'bg-rose-50 text-rose-700',
  'Creative Writing': 'bg-orange-50 text-orange-700',
  'Debate & Writing': 'bg-violet-50 text-violet-700',
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 3);
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const headings = post.sections.filter((s) => s.heading);

  const isHowTo =
    post.slug.includes('how-to') ||
    post.slug === 'tips-confident-public-speaker-kids' ||
    post.slug === 'speech-writing-for-kids';

  const howToSchema = isHowTo && headings.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: post.title,
        description: post.excerpt,
        step: headings.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.heading,
          text: s.paragraphs.join(' '),
        })),
      }
    : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: OG_IMAGE,
    datePublished: `${post.date}T00:00:00+05:30`,
    dateModified: `${post.date}T00:00:00+05:30`,
    author: {
      '@type': 'Person',
      name: 'JuniorSpark Team',
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'JuniorSpark',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags.join(', '),
    inLanguage: 'en-IN',
    url: postUrl,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

      <main className="min-h-screen bg-[#fefeff]">
        {/* Breadcrumb */}
        <div className="border-b border-gray-100 bg-white">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight size={14} />
            <span className="text-gray-800 truncate max-w-[200px] md:max-w-none">{post.title}</span>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={15} />
            Back to Blog
          </Link>

          <header className="mb-10">
            <div
              className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-600'}`}
            >
              {post.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-6">{post.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400 border-t border-b border-gray-100 py-4">
              <Link href="/about" className="font-medium text-gray-600 hover:text-primary transition-colors">
                JuniorSpark Team
              </Link>
              <span>&middot;</span>
              <span>{formatBlogDate(post.date)}</span>
              <span>&middot;</span>
              <span className="flex items-center gap-1">
                <Clock size={13} />
                {post.readTime} min read
              </span>
            </div>
          </header>

          {/* Table of Contents — shown for posts with 4+ headings */}
          {headings.length >= 4 && (
            <nav className="mb-10 p-5 bg-gray-50 border border-gray-200 rounded-2xl">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <List size={15} className="text-primary" />
                In this article
              </div>
              <ol className="space-y-2">
                {headings.map((s) => (
                  <li key={s.heading}>
                    <a
                      href={`#${slugifyHeading(s.heading!)}`}
                      className="text-sm text-primary hover:underline leading-snug"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Article body */}
          <div className="space-y-8 text-gray-700 leading-relaxed">
            {post.sections.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2
                    id={slugifyHeading(section.heading)}
                    className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-3 scroll-mt-20"
                  >
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
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-8 text-center text-white">
            <p className="text-xl font-bold mb-2">Give your child the edge</p>
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

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Related Articles</h2>
              <div className="grid gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group flex items-start justify-between gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-primary/30 hover:shadow-sm transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <span
                        className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1 ${CATEGORY_COLORS[r.category] ?? 'bg-gray-100 text-gray-600'}`}
                      >
                        {r.category}
                      </span>
                      <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-sm leading-snug">
                        {r.title}
                      </p>
                      <span className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                        <Clock size={11} /> {r.readTime} min read
                      </span>
                    </div>
                    <ArrowRight size={16} className="text-gray-300 group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            </div>
          )}

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
