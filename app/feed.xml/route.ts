import { BLOG_POSTS } from '@/lib/blog-posts';

const SITE_URL = 'https://www.juniorspark.in';

export async function GET() {
  const sorted = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>JuniorSpark Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Expert tips and guides to help Indian parents support their child's English speaking journey — from phonics to public speaking, ages 4–15.</description>
    <language>en-IN</language>
    <copyright>© ${new Date().getFullYear()} JuniorSpark</copyright>
    <managingEditor>info@juniorspark.in (JuniorSpark Team)</managingEditor>
    <webMaster>info@juniorspark.in (JuniorSpark)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/logo.png</url>
      <title>JuniorSpark Blog</title>
      <link>${SITE_URL}/blog</link>
    </image>
    ${sorted
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(`${post.date}T08:00:00+05:30`).toUTCString()}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      ${post.tags.map((t) => `<category><![CDATA[${t}]]></category>`).join('\n      ')}
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
