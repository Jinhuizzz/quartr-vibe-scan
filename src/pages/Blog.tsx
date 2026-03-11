import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const posts = [
  { title: "How AI is Transforming Equity Research", date: "Mar 10, 2026", tag: "AI" },
  { title: "Understanding Quantamental Analysis", date: "Mar 5, 2026", tag: "Research" },
  { title: "WatchWise Data Brain: Behind the Scenes", date: "Feb 28, 2026", tag: "Product" },
  { title: "The Future of Institutional-Grade Tools for Retail", date: "Feb 20, 2026", tag: "Insights" },
];

const BlogPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-32 pb-24 max-w-screen-xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary text-sm font-medium tracking-wider uppercase mb-3">Blog</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-16">
          Insights & Updates
        </h1>

        <div className="grid md:grid-cols-2 gap-4">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="surface-card p-8 hover:border-primary/30 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs px-2.5 py-1 rounded-full bg-surface-elevated text-primary font-medium">
                  {post.tag}
                </span>
                <span className="text-text-dim text-xs">{post.date}</span>
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-text-dim text-sm mt-3">Read more →</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
    <Footer />
  </div>
);

export default BlogPage;
