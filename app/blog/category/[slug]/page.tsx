import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, formatBlogDate } from '@/lib/blog-posts';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';

const SITE_URL = 'https://www.juniorspark.in';

interface Props {
  params: Promise<{ slug: string }>;
}

function slugToCategory(slug: string): string {
  return decodeURIComponent(slug).replace(/-/g, ' ');
}

function categoryToSlug(category: string): string {
  return encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and'));
}

export async function generateStaticParams() {
  const categories = [...new Set(BLOG_POSTS.map((p) => p.category))];
  return categories.map((cat) => ({ slug: categoryToSlug(cat) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const category = [...new Set(BLOG_POSTS.map((p) => p.category))].find(
    (c) => categoryToSlug(c) === decodedSlug
  );
  if (!category) return {};

  const url = `${SITE_URL}/blog/category/${slug}`;
  return {
    title: `${category} Articles | JuniorSpark Blog`,
    description: `Browse all JuniorSpark blog articles in the "${category}" category — practical tips and guides for Indian parents helping their child learn English.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${category} | JuniorSpark Blog`,
      description: `Tips and guides on ${category} for kids aged 4–15.`,
      url,
      type: 'website',
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: `${category} — JuniorSpark Blog` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category} | JuniorSpark Blog`,
      description: `Tips and guides on ${category} for kids aged 4–15.`,
      images: [`${SITE_URL}/opengraph-image`],
    },
  };
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Tips for Parents': 'Practical strategies for Indian parents to support English learning at home — small habits that build real speaking confidence in children.',
  'Child Development': 'Research-backed insights into how children develop language skills, and what parents can do at each age to accelerate fluency.',
  'Parents Guide': 'Step-by-step guides for parents navigating English education choices — from choosing classes to supporting practice at home.',
  'Learning Guide': 'Age-wise English learning roadmaps for children aged 4–15, covering what to focus on and how to measure real progress.',
  'Speaking Practice': 'Targeted speaking exercises, sentence lists, and conversation frameworks children can practise daily at home.',
  'Public Speaking': 'Everything a child needs to speak confidently in front of any audience — from managing nerves to structuring a compelling opening.',
  'Speech Writing': 'How to write speeches that sound natural, connect with audiences, and earn top marks in school competitions and assemblies.',
  'Creative Writing': 'Creative writing frameworks, story formats, and guided exercises to help children express ideas with clarity and imagination.',
  'Debate & Writing': 'CBSE debate writing formats, argument structure guides, and sample topics for Class 9–12 students preparing for exams.',
};

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

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const categories = [...new Set(BLOG_POSTS.map((p) => p.category))];
  const category = categories.find((c) => categoryToSlug(c) === decodedSlug);
  if (!category) notFound();

  const posts = BLOG_POSTS.filter((p) => p.category === category).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const categoryUrl = `${SITE_URL}/blog/category/${slug}`;
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: category, item: categoryUrl },
    ],
  };

  const description = CATEGORY_DESCRIPTIONS[category];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    <main className="min-h-screen bg-[#fefeff]">
      <section className="bg-gradient-to-br from-primary/5 to-secondary/10 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-6">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${CATEGORY_COLORS[category] ?? 'bg-gray-100 text-gray-600'}`}>
            {category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {category} — English Tips for Kids
          </h1>
          {description && (
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mb-3">{description}</p>
          )}
          <p className="text-gray-400 text-sm">
            {posts.length} article{posts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
            >
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-2 flex-1 leading-snug">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={11} /> {post.readTime} min read
                </span>
                <span className="text-xs text-gray-400">{formatBlogDate(post.date)}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft size={14} /> All articles
          </Link>
        </div>
      </div>
    </main>
    </>
  );
}
