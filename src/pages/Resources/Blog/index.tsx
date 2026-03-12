import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import MainNavigation from '@/components/Layout/MainNavigation';
import Footer from '@/components/Layout/Footer';

const Section = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <section className={`py-16 md:py-24 ${className}`}>
    {children}
  </section>
);

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="container mx-auto px-4 md:px-6 max-w-7xl">
    {children}
  </div>
);

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      id: 'end-of-manual-company',
      title: 'The End of the Manual Company. The Dawn of Organizational Autonomy.',
      excerpt: 'The last decade was about giving humans digital tools for Discovery. The next is about giving the enterprise an autonomous workforce for Execution.',
      date: '2026-01-12',
      readTime: '3 min read',
      category: 'Vision',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <MainNavigation />

      <main>
        {/* Hero Section */}
        <Section className="pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-primary/5 to-background">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Blog
              </h1>
              <p className="text-xl text-muted-foreground">
                Insights on AI agents, enterprise automation, and the future of work.
              </p>
            </motion.div>
          </Container>
        </Section>

        {/* Blog Posts */}
        <Section>
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link to={`/resources/blog/${post.id}`} className="block">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                        <ArrowRight className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
