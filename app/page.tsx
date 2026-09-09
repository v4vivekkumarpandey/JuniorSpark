'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  CheckCircle2,
  Users,
  Map,
  ShieldCheck,
  PlayCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MessageCircle,
  Video,
  BookOpen,
  GraduationCap,
  Sparkles,
  Check,
  X
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [activeTab, setActiveTab] = React.useState('beginner');
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const testimonialScrollRef = React.useRef<HTMLDivElement>(null);

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (testimonialScrollRef.current) {
      const { current } = testimonialScrollRef;
      let itemsToShow = 1;
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 1024) itemsToShow = 3;
        else if (window.innerWidth >= 768) itemsToShow = 2;
      }
      const scrollAmount = current.clientWidth / itemsToShow;

      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // scroll by one element width approximately
      let itemsToShow = 1;
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 1024) itemsToShow = 4;
        else if (window.innerWidth >= 768) itemsToShow = 3;
        else if (window.innerWidth >= 640) itemsToShow = 2;
      }
      const scrollAmount = current.clientWidth / itemsToShow;

      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const shiningStars = [
    'https://www.youtube.com/embed/EjZe6emOMJY',
    'https://www.youtube.com/embed/1Tt-Pvd6acg',
    'https://www.youtube.com/embed/K8yWiuqvOfw',
    'https://www.youtube.com/embed/_e-x89abkLY'
  ];

  const stats = [
    { label: 'Batch Size', value: '1:5', icon: <Users className="size-5" />, color: 'primary' },
    { label: 'Happy Parents', value: '4,000+', icon: <Star className="size-5" />, color: 'secondary' },
    { label: 'Cities Covered', value: '100+', icon: <Map className="size-5" />, color: 'primary' },
    { label: 'Expert Teachers', value: '25+', icon: <ShieldCheck className="size-5" />, color: 'accent' },
  ];

  const steps = [
    {
      step: '01',
      title: 'Join Demo',
      desc: 'Book a free 30-minute demo session. No credit card required, just choose a time that works for you.',
      icon: <Users className="size-8" />,
      color: 'bg-primary'
    },
    {
      step: '02',
      title: 'Interactive Learning',
      desc: 'Attend live classes with peer groups. Our expert teachers use games and activities to make learning fun.',
      icon: <Video className="size-8" />,
      color: 'bg-secondary'
    },
    {
      step: '03',
      title: 'Speak Confidently',
      desc: 'Watch your child start speaking English naturally in everyday situations within just 4 weeks.',
      icon: <MessageCircle className="size-8" />,
      color: 'bg-accent'
    }
  ];

  const curriculum = {
    beginner: [
      {
        title: 'Phonics & Pronunciation',
        desc: 'Master the basics of sounds and word formations through interactive singing.',
        img: '/phonics.webp',
        features: ['44 basic phonemes', 'Introduction to rhythm']
      },
      {
        title: 'Storytelling Basics',
        desc: 'Expressing emotions and narrating small incidents with simple sentence structures.',
        img: '/storytelling.webp',
        features: ['Vocabulary building', 'Confidence in speaking']
      },
      {
        title: 'Daily Conversation',
        desc: 'Handling everyday situations: asking for help, meeting friends, and basic etiquette.',
        img: '/daily.webp',
        features: ['Fluency practice', 'Overcoming stage fear']
      }
    ],
    intermediate: [
      {
        title: 'Grammar Mastery',
        desc: 'Building solid foundations in sentence structure and tenses.',
        img: '/grammar.webp',
        features: ['Advanced tenses', 'Sentence synthesis']
      },
      {
        title: 'Public Speaking',
        desc: 'Learning to present ideas clearly in front of a small group.',
        img: '/public.webp',
        features: ['Body language', 'Voice modulation']
      },
      {
        title: 'Creative Writing',
        desc: 'Expressing thoughts through short stories and essays.',
        img: '/creative.webp',
        features: ['Descriptive language', 'Narrative flow']
      }
    ],
    advanced: [
      {
        title: 'Debate & Logic',
        desc: 'Formulating arguments and responding to counter-arguments.',
        img: '/debate.webp',
        features: ['Critical thinking', 'Logical reasoning']
      },
      {
        title: 'Literature Analysis',
        desc: 'Understanding themes and characters in English literature.',
        img: '/literature.webp',
        features: ['Analytical skills', 'Deep reading']
      },
      {
        title: 'Academic Excellence',
        desc: 'Preparing for international English proficiency standards.',
        img: '/academic.webp',
        features: ['Academic Literature & Grammar', 'Advanced Vocabulary']
      }
    ]
  };

  const testimonials = [
    {
      name: 'Vandana Sharma',
      location: 'Indore, MP',
      text: 'My daughter Riya was very shy. Living in Indore, she didn\'t have many English speakers around. After 3 months here, she won her school\'s debate competition!',
      img: 'https://picsum.photos/seed/parent1/100/100'
    },
    {
      name: 'Ajay Deshmukh',
      location: 'Nagpur, Maharashtra',
      text: 'The small batch size of 4 students is the best part. Aarav gets to speak for at least 15 minutes every class. We couldn\'t find such individual attention in Nagpur.',
      img: 'https://picsum.photos/seed/parent2/100/100'
    },
    {
      name: 'Ahlam Mukhtar',
      location: 'Patna, Bihar',
      text: 'The teachers here understand that children in cities like Patna need more practice. They are patient and very encouraging. Highly recommend!',
      img: 'https://picsum.photos/seed/parent3/100/100'
    },
    {
      name: 'Olivia Gomez',
      location: 'Kochi, Kerala',
      text: 'value for money. My little Agitha has improved a lot in last 2 months. Highly recommend!',
      img: 'https://picsum.photos/seed/parent3/100/100',
      video: true
    }
  ];

  const faqs = [
    { q: 'How do I book a free demo?', a: 'Simply click on the "Book Free Demo" button, select a convenient time slot, and provide your basic details. No payment is required for the demo.' },
    { q: 'What is the age group for these classes?', a: 'We have specialized curriculums for children aged 5 to 15 years, divided into Beginner, Intermediate, and Advanced levels.' },
    { q: 'What is the batch size?', a: 'We maintain a strict 1:4 teacher-to-student ratio to ensure every child gets individual attention and ample speaking time.' },
    { q: 'Do you provide certificates?', a: 'Yes, every student receives a certificate of completion after successfully finishing a level in our curriculum.' }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': 'https://www.juniorspark.in/#organization',
        name: 'JuniorSpark',
        url: 'https://www.juniorspark.in',
        logo: 'https://www.juniorspark.in/heroimage.jpeg',
        description: 'Live online Spoken English classes for kids aged 5–15 in India. Small batches, expert teachers.',
        sameAs: [
          'https://www.instagram.com/juniorspark.in/',
          'https://www.youtube.com/@JuniorSparkLive/',
          'https://www.facebook.com/profile.php?id=61586400512936',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-7011254904',
          contactType: 'customer service',
          availableLanguage: ['English', 'Hindi'],
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '2800',
          bestRating: '5',
        },
      },
      {
        '@type': 'Course',
        name: 'Spoken English for Kids',
        description: 'Live online Spoken English classes for children aged 5–15. Covering phonics, storytelling, grammar, public speaking, and debate.',
        provider: { '@id': 'https://www.juniorspark.in/#organization' },
        hasCourseInstance: [
          { '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: 'PT1H', name: 'Beginner — Ages 5–7' },
          { '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: 'PT1H', name: 'Intermediate — Ages 8–11' },
          { '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: 'PT1H', name: 'Advanced — Ages 12–15' },
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
          description: 'Free demo class available',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="px-6 md:px-12 lg:px-20 py-12 md:py-16 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 overflow-hidden">
          <div className="max-w-[1024px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-8 order-2 lg:order-1 lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary-900 font-bold text-xs uppercase tracking-wider w-fit">
                <Sparkles size={14} className="text-secondary" />
                Used by 4,000+ happy parents
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-slate-900 text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                  Build Confidence through <span className="text-primary">Spoken English</span>
                </h1>
                <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed max-w-[540px]">
                  Specialized live classes for kids. We focus on storytelling, public speaking, and personality development.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/book-demo"
                  className="flex flex-1 md:flex-none min-w-[240px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-lg font-bold shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all"
                >
                  Book Demo Class
                </Link>
                <Link
                  href="#curriculum"
                  className="flex flex-1 md:flex-none cursor-center items-center justify-center rounded-xl h-14 px-8 bg-white border border-slate-200 text-slate-700 text-lg font-bold hover:bg-slate-50 transition-all"
                >
                  View Syllabus
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                <div className="flex -space-x-2">
                  {['AJ', 'SK', 'MK'].map((initials, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold ${i === 0 ? 'bg-slate-200' : i === 1 ? 'bg-primary/20' : 'bg-secondary/20'}`}>
                      {initials}
                    </div>
                  ))}
                </div>
                <span>Join our community of young learners</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2 relative group lg:col-span-5"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-secondary to-accent rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div
                className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-slate-100 border-4 border-white cursor-pointer group/video"
                onClick={() => setIsVideoOpen(true)}
              >
                <Image
                  src="/herovideo_placeholder.png"
                  alt="Watch Our Shining Stars in Action"
                  fill
                  className="object-cover transition-transform duration-700 group-hover/video:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/10 group-hover/video:bg-black/0 transition-colors flex items-center justify-center">
                  {/* YouTube Styled Play Button */}
                  <div className="w-[68px] h-[48px] bg-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover/video:bg-red-700 group-hover/video:scale-105 transition-all">
                    {/* Pure CSS Triangle */}
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 md:px-12 lg:px-20 py-8 md:py-10 bg-white border-y border-slate-100">
          <div className="max-w-[1024px] mx-auto flex flex-wrap justify-center gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="flex min-w-[200px] items-center gap-4 p-4 md:p-5 rounded-2xl bg-slate-50 border border-slate-100/50 hover:bg-primary/5 transition-colors group">
                <div className={`size-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${stat.color === 'primary' ? 'bg-primary/10 text-primary' : stat.color === 'secondary' ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className={`text-2xl font-black leading-none ${stat.color === 'primary' ? 'text-primary' : stat.color === 'secondary' ? 'text-secondary-600' : 'text-accent'}`}>
                    {stat.value}
                  </p>
                  <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shining Stars Videos */}
        <section className="px-6 md:px-12 lg:px-20 py-16 bg-white border-y border-slate-100">
          <div className="max-w-[950px] mx-auto">
            <div className="flex flex-col items-center text-center mb-10 gap-6">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-black mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Our Shining Stars</span>
                </h2>
                <p className="text-slate-600 text-lg font-medium">Watch young learners who have transformed their communication skills with our classes.</p>
              </div>
            </div>

            <div className="relative group">
              <button
                onClick={() => scroll('left')}
                className="hidden md:flex absolute -left-5 lg:-left-12 top-[calc(50%-16px)] -translate-y-1/2 z-10 size-12 rounded-full border border-slate-200 bg-white items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all hover:scale-105 shadow-md opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="hidden md:flex absolute -right-5 lg:-right-12 top-[calc(50%-16px)] -translate-y-1/2 z-10 size-12 rounded-full border border-slate-200 bg-white items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all hover:scale-105 shadow-md opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={24} />
              </button>

              <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] px-1"
              >
                {shiningStars.map((video, i) => (
                  <div key={i} className="min-w-[70vw] sm:min-w-[calc(50%-0.5rem)] md:min-w-[calc(33.333%-1rem)] lg:min-w-[calc(25%-1.125rem)] aspect-[9/16] rounded-2xl overflow-hidden bg-slate-100 shrink-0 snap-center shadow-lg border border-slate-200 relative group">
                    <iframe
                      width="100%"
                      height="100%"
                      src={video}
                      title={`Shining Star ${i + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    ></iframe>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="px-6 md:px-12 lg:px-20 py-16 bg-background-light">
          <div className="max-w-[1024px] mx-auto">
            <div className="flex flex-col gap-4 text-center mb-16">
              <h2 className="text-slate-900 text-3xl md:text-5xl font-black leading-tight">
                Three simple steps to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">fluency</span>
              </h2>
              <p className="text-slate-600 text-lg font-medium max-w-[700px] mx-auto">Our unique learning path is designed specifically for young learners in India&apos;s growing cities.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="flex flex-col gap-6 p-8 rounded-3xl bg-white border border-slate-200 hover:shadow-2xl transition-all group"
                >
                  <div className={`size-16 rounded-2xl ${step.color} flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-transform group-hover:rotate-0 ${i % 2 === 0 ? 'rotate-3' : '-rotate-3'}`}>
                    {step.icon}
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className={`${step.color.replace('bg-', 'text-')} font-bold text-sm tracking-widest uppercase`}>Step {step.step}</span>
                    <h3 className="text-slate-900 text-2xl font-bold">{step.title}</h3>
                    <p className="text-slate-600 text-base leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid
        <section className="w-full bg-white py-16">
          <div className="max-w-[1024px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col gap-4">
                <Users className="text-primary size-10" />
                <h3 className="text-xl font-bold">Small Batch Size (1:4)</h3>
                <p className="text-slate-600">Every child gets individual attention. No more getting lost in large virtual classrooms.</p>
              </div>
              <div className="p-8 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col gap-4">
                <BookOpen className="text-primary size-10" />
                <h3 className="text-xl font-bold">Activity-Based Learning</h3>
                <p className="text-slate-600">English through storytelling, role-plays, and fun interactive games designed for Tier-2 cities.</p>
              </div>
              <div className="p-8 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col gap-4">
                <GraduationCap className="text-primary size-10" />
                <h3 className="text-xl font-bold">Certified Teachers</h3>
                <p className="text-slate-600">Experts trained specifically to build confidence in hesitant speakers from diverse backgrounds.</p>
              </div>
            </div>
          </div>
        </section>
        */}

        {/* Curriculum Section */}
        <section id="curriculum" className="max-w-[1150px] mx-auto px-6 md:px-12 lg:px-20 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Comprehensive</span> Curriculum
            </h2>
            <p className="text-slate-600 text-lg font-medium max-w-2xl mx-auto">Structured levels designed to take your child from hesitant speaker to confident communicator.</p>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex justify-center border-b border-slate-200 overflow-x-auto">
              {['beginner', 'intermediate', 'advanced'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 border-b-4 transition-all font-bold capitalize whitespace-nowrap ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-primary'}`}
                >
                  {tab} {tab === 'beginner' ? '(Ages 5-8)' : tab === 'intermediate' ? '(Ages 9-12)' : '(Ages 13-15)'}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              {curriculum[activeTab as keyof typeof curriculum].map((item, i) => (
                <div key={i} className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 relative">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                    <p className="text-slate-600 text-sm mb-4">{item.desc}</p>
                    <ul className="text-xs space-y-2 text-slate-500">
                      {item.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <CheckCircle2 className="text-primary size-4" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-6 md:px-12 lg:px-20 py-16 bg-slate-50">
          <div className="max-w-[1024px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                  <h2 className="text-slate-900 text-4xl font-black leading-tight">Why parents in 100+ cities trust us?</h2>
                  <p className="text-slate-600 text-lg">We understand the needs of children growing up in Indian families.</p>
                </div>
                <div className="space-y-6">
                  {[
                    { title: 'Small Batch Size', desc: 'Every child gets individual attention. No more getting lost in large virtual classrooms.', icon: <Users className="text-primary" /> },
                    { title: 'Affordable Pricing', desc: 'High-quality education that doesn\'t burn a hole in your pocket. Plans start at just ₹90/class.', icon: <Sparkles className="text-green-600" /> },
                    { title: 'Activity-Based Learning', desc: 'English through storytelling, role-plays, and fun interactive games.', icon: <Map className="text-primary" /> },
                    { title: 'Flexible Batch Timings', desc: 'Choose batches after school or on weekends. We fit into your child\'s busy routine perfectly.', icon: <Video className="text-secondary-600" /> }
                  ].map((f, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="size-10 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center">
                        {f.icon}
                      </div>
                      <div>
                        <h4 className="text-slate-900 font-bold text-lg">{f.title}</h4>
                        <p className="text-slate-600">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="p-8 md:p-12 rounded-[2.5rem] bg-white shadow-2xl border border-slate-100">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-accent text-white font-bold text-sm tracking-widest uppercase whitespace-nowrap">
                    Batches Filling Fast
                  </div>
                  <div className="text-center flex flex-col gap-6">
                    <h3 className="text-slate-900 text-3xl font-black">Young Achiever</h3>
                    <p className="text-slate-500 font-medium">Perfect for building a strong foundation</p>
                    {/* <div className="py-6 border-y border-slate-100">
                      <p className="text-slate-400 line-through text-lg">₹9,999</p>
                      <p className="text-primary text-3xl font-black mt-1">₹4,800/Quarter</p>
                      <p className="text-slate-500 font-bold mt-2">1800/Month</p>
                      <p className="text-slate-500 font-bold mt-2">5 Live Classes Weekly (₹90/class)</p>
                    </div> */}
                    <ul className="text-left space-y-4 my-4">
                      {['Small Batch Sizes', 'Interactive Learning', 'Personalized progress reports', 'Certification of completion'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                          <Check className="text-green-500 font-bold size-5" /> {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/book-demo"
                      className="w-full h-14 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/25 hover:scale-105 transition-transform flex items-center justify-center"
                    >
                      Book Demo
                    </Link>
                    <p className="text-xs text-slate-400 font-medium italic">* 100% Refund if you don&apos;t see progress in 2 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full bg-white py-16 border-y border-slate-200">
          <div className="max-w-[1024px] mx-auto px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                Trusted by Parents, <br className="md:hidden" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Liked by Kids</span>
              </h2>
              <p className="text-slate-600 text-lg font-medium">
                Real stories from parents and achievers across India.
              </p>
            </div>

            <div className="relative group">
              <button
                onClick={() => scrollTestimonials('left')}
                className="hidden md:flex absolute -left-5 lg:-left-12 top-[calc(50%-16px)] -translate-y-1/2 z-10 size-12 rounded-full border border-slate-200 bg-white items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all hover:scale-105 shadow-md opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scrollTestimonials('right')}
                className="hidden md:flex absolute -right-5 lg:-right-12 top-[calc(50%-16px)] -translate-y-1/2 z-10 size-12 rounded-full border border-slate-200 bg-white items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all hover:scale-105 shadow-md opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={24} />
              </button>

              <div
                ref={testimonialScrollRef}
                className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] px-1"
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="w-[85vw] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] shrink-0 snap-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative transition-transform hover:-translate-y-1">
                    {t.video && (
                      <div className="absolute -top-4 -right-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow-sm">
                        Video Story
                      </div>
                    )}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, j) => <Star key={j} size={16} className="text-yellow-500 fill-current" />)}
                    </div>
                    <p className="text-slate-700 italic mb-6">&quot;{t.text}&quot;</p>
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-slate-200 relative overflow-hidden ring-2 ring-slate-100">
                        <Image src={t.img} alt={t.name} fill className="object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900">{t.name}</p>
                        <p className="text-slate-500 text-xs font-semibold uppercase">{t.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="px-6 md:px-12 lg:px-20 py-16 bg-slate-50">
          <div className="max-w-[1150px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Common</span> Questions
              </h2>
              <p className="text-slate-600 text-lg font-medium">Everything you need to know about our online English classes.</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  open={openFaqIndex === i}
                  className="group p-6 rounded-2xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenFaqIndex(openFaqIndex === i ? null : i);
                    }}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <h4 className="text-lg font-bold">{faq.q}</h4>
                    <ChevronDown className="text-primary transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-slate-600 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 md:px-12 lg:px-20 py-16 bg-white">
          <div className="max-w-[800px] mx-auto rounded-[2rem] bg-gradient-to-r from-primary to-accent p-8 md:p-10 text-center text-white relative shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 rounded-full -ml-16 -mb-16 blur-2xl"></div>
            <div className="relative z-10 flex flex-col gap-5 items-center">
              <h2 className="text-2xl md:text-3xl font-black leading-tight max-w-[600px]">Give your child the gift of confidence today</h2>
              <p className="text-base md:text-lg font-medium text-white/90 max-w-[500px] mb-2">Join thousands of parents across India and start your child&apos;s English journey with a demo.</p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-2">
                <a
                  href="https://wa.me/917011254904"
                  className="h-12 px-6 rounded-xl bg-[#25D366] text-white font-bold text-base shadow-lg hover:bg-[#20bd5a] hover:scale-105 transition-all flex items-center justify-center gap-2 shrink-0 border border-transparent"
                >
                  <MessageCircle size={18} /> WhatsApp
                </a>
                <Link
                  href="/book-demo"
                  className="h-12 px-6 rounded-xl bg-white text-primary font-bold text-base shadow-lg hover:bg-slate-50 hover:scale-105 transition-all flex items-center justify-center shrink-0"
                >
                  Book Demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
            onClick={() => setIsVideoOpen(false)}
          >
            <button
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors focus:outline-none"
              onClick={() => setIsVideoOpen(false)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-[1000px] aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/oFv-PkllHdU?autoplay=1"
                title="Junior Spark Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
