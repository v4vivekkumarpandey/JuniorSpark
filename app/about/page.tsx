import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Users, Map, GraduationCap, Star, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About JuniorSpark | Online English Classes for Kids in India',
  description:
    'JuniorSpark provides live online spoken English classes for kids aged 4–15 across 100+ Indian cities. Learn about our teachers, curriculum, and our commitment to every child.',
  alternates: { canonical: 'https://www.juniorspark.in/about' },
  openGraph: {
    title: 'About JuniorSpark | Online English Classes for Kids in India',
    description:
      'Learn about JuniorSpark — our qualified teachers, proven curriculum, and the small-batch approach that has helped 4,000+ families across India.',
    url: 'https://www.juniorspark.in/about',
    type: 'website',
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': 'https://www.juniorspark.in/#organization',
  name: 'JuniorSpark',
  url: 'https://www.juniorspark.in',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.juniorspark.in/logo.png',
    width: 512,
    height: 512,
  },
  description:
    'Live online spoken English classes for kids aged 4–15. Small batches, expert teachers, proven results across 100+ cities in India.',
  foundingDate: '2023',
  areaServed: 'IN',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-7011254904',
    contactType: 'customer support',
    email: 'info@juniorspark.in',
    availableLanguage: ['English', 'Hindi'],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '4000',
    bestRating: '5',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61586400512936',
    'https://www.youtube.com/@JuniorSparkLive/',
    'https://www.instagram.com/juniorspark.in/',
  ],
};

const stats = [
  { icon: Users, value: '4,000+', label: 'Happy Families' },
  { icon: Map, value: '100+', label: 'Cities Covered' },
  { icon: GraduationCap, value: '25+', label: 'Expert Teachers' },
  { icon: Star, value: '4.9/5', label: 'Average Rating' },
];

const values = [
  {
    title: 'Small Batches, Big Results',
    body: 'Every class is capped at 5 students. This is not a marketing claim — it is the structural decision that makes everything else work. In a group of five, every child speaks in every session.',
  },
  {
    title: 'Live Classes, Not Pre-Recorded',
    body: 'All JuniorSpark sessions are conducted live on Google Meet with a qualified teacher. Real-time feedback, real conversation practice, and genuine human connection — these cannot be replicated by video lessons.',
  },
  {
    title: 'Qualified, Vetted Teachers',
    body: "Every JuniorSpark teacher passes rigorous screening for English proficiency, teaching methodology, and child communication skills. Teaching qualifications alone don't make the cut — we look for educators who know how to build a nervous child's confidence.",
  },
  {
    title: 'Curriculum Built for Speaking',
    body: 'Most English programmes teach grammar. JuniorSpark teaches communication. Our curriculum at every level — from phonics at age 5 to debate at age 15 — is designed to produce children who can express themselves clearly and confidently in real life.',
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <main className="min-h-screen bg-[#fefeff]">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/10 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <div className="inline-block text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">
                  About JuniorSpark
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  Making Every Indian Child a{' '}
                  <span className="text-primary">Confident English Speaker</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  JuniorSpark was founded on a single belief: that quality English education should
                  not depend on where a child lives or how much a family can afford. We deliver
                  live, small-group online English classes to children aged 4–15 across every
                  corner of India.
                </p>
                <Link
                  href="/demo"
                  className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                >
                  Book a Free Demo Class
                </Link>
              </div>
              <div className="shrink-0">
                <Image
                  src="/logo.png"
                  alt="JuniorSpark — Online English Classes for Kids"
                  width={160}
                  height={160}
                  className="w-36 h-36 md:w-40 md:h-40 object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-4 border-b border-gray-100">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                  <Icon size={22} className="text-primary" />
                </div>
                <p className="text-3xl font-black text-gray-900">{value}</p>
                <p className="text-sm text-gray-500 font-medium mt-1">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                JuniorSpark began when its founders noticed a persistent gap in the Indian education
                landscape: millions of children were studying English in school yet graduating unable
                to hold a simple conversation in the language. Grammar was being taught. Speaking was
                not.
              </p>
              <p>
                The solution was not another app or another content library. It was live,
                structured, small-group speaking practice with qualified teachers — delivered online
                so that a child in Patna has the same access as a child in Mumbai.
              </p>
              <p>
                Since launch, JuniorSpark has served more than 4,000 families across 100+ cities in
                India. Our teachers have watched thousands of children who arrived in their first
                class barely willing to say hello leave their sessions speaking in full sentences,
                telling stories, and asking questions without prompting.
              </p>
              <p>
                We measure success the same way parents do: not by test scores, but by the moment a
                child answers a question in class without looking at the floor.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              What We Stand For
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 size={20} className="text-primary mt-0.5 shrink-0" />
                    <h3 className="font-bold text-gray-900 text-lg">{v.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed pl-8">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Teaching Approach */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Teaching Approach</h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                JuniorSpark's curriculum is structured across three developmental stages, each
                designed for the cognitive and linguistic abilities of children at that age:
              </p>
            </div>
            <div className="mt-8 space-y-4">
              {[
                {
                  age: 'Ages 5–8',
                  level: 'Beginner',
                  focus: 'Phonics, pronunciation, basic vocabulary, and daily conversation through games and storytelling.',
                },
                {
                  age: 'Ages 9–12',
                  level: 'Intermediate',
                  focus: 'Grammar in context, structured storytelling, public speaking foundations, and conversational fluency.',
                },
                {
                  age: 'Ages 13–15',
                  level: 'Advanced',
                  focus: 'Debate, persuasive speaking, literary analysis, and academic communication skills.',
                },
              ].map((stage) => (
                <div key={stage.age} className="flex gap-4 p-5 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="shrink-0 text-center">
                    <p className="text-xs font-black text-primary uppercase tracking-wide">{stage.level}</p>
                    <p className="text-sm font-bold text-gray-700">{stage.age}</p>
                  </div>
                  <div className="w-px bg-primary/20 shrink-0" />
                  <p className="text-gray-700 leading-relaxed">{stage.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Teachers */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Teachers</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Every JuniorSpark teacher has been selected through a multi-stage evaluation covering
              English language proficiency, teaching methodology, and the ability to build rapport
              with children. We currently work with 25+ qualified educators, all of whom teach live
              online sessions with a maximum of 5 students per class.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our teachers hold teaching certifications and have experience working with children
              across different learning styles, confidence levels, and language backgrounds. Ongoing
              training ensures every teacher stays current with evidence-based approaches to
              second-language acquisition and child communication development.
            </p>
          </div>
        </section>

        {/* Commitment & Contact */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment to You</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              We offer a 100% refund if you do not see progress within 2 days of starting —
              no questions asked. We stand behind our programme because we have seen what it does
              for children. If it does not work for yours, you should not pay for it.
            </p>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Get in Touch</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-primary" />
                  <a href="mailto:info@juniorspark.in" className="hover:text-primary transition-colors">
                    info@juniorspark.in
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary font-bold text-sm w-[18px] text-center">WA</span>
                  <a href="https://wa.me/917011254904" className="hover:text-primary transition-colors">
                    +91 70112 54904
                  </a>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/demo"
                  className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-lg shadow-primary/20"
                >
                  Book a Free Demo Class
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
