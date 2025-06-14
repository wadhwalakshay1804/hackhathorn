import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

const News: React.FC = () => {
  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: "Revolutionary Drought-Resistant Corn Varieties Show Promise in Field Trials",
      excerpt: "New genetically enhanced corn varieties demonstrate 40% better water efficiency while maintaining yield quality in extensive field testing across multiple climate zones.",
      author: "Dr. Sarah Mitchell",
      date: "Today",
      category: "Research",
      image: "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Precision Agriculture Technology Adoption Reaches New Heights",
      excerpt: "Latest industry report shows 65% of farms now utilize GPS-guided equipment and variable rate application technology, marking a significant shift in modern farming practices.",
      author: "Michael Chen",
      date: "Yesterday",
      category: "Technology",
      image: "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Organic Farming Methods Show Increased Soil Health Benefits",
      excerpt: "Long-term study reveals organic farming practices improve soil microbiome diversity by 30% and increase carbon sequestration rates significantly over conventional methods.",
      author: "Dr. Emily Rodriguez",
      date: "Yesterday",
      category: "Sustainability",
      image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Climate-Smart Agriculture Practices Gain Government Support",
      excerpt: "New federal initiatives provide $2 billion in funding for farmers adopting climate-resilient practices, including cover cropping and regenerative agriculture techniques.",
      author: "James Wilson",
      date: "2 days ago",
      category: "Policy",
      image: "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=800",
      readTime: "3 min read"
    },
    {
      id: 5,
      title: "Integrated Pest Management Reduces Chemical Usage by 50%",
      excerpt: "Comprehensive IPM programs implemented across 1,000 farms demonstrate significant reduction in pesticide use while maintaining crop protection effectiveness.",
      author: "Dr. Lisa Thompson",
      date: "3 days ago",
      category: "Pest Control",
      image: "https://images.pexels.com/photos/1595105/pexels-photo-1595105.jpeg?auto=compress&cs=tinysrgb&w=800",
      readTime: "4 min read"
    },
    {
      id: 6,
      title: "Vertical Farming Revolution: Urban Agriculture Reaches New Scale",
      excerpt: "Indoor vertical farms now produce equivalent yields to traditional farming using 95% less water and 99% less land, revolutionizing urban food production systems.",
      author: "David Park",
      date: "4 days ago",
      category: "Innovation",
      image: "https://images.pexels.com/photos/1595101/pexels-photo-1595101.jpeg?auto=compress&cs=tinysrgb&w=800",
      readTime: "5 min read"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Research': 'bg-blue-100 text-blue-800',
      'Technology': 'bg-purple-100 text-purple-800',
      'Sustainability': 'bg-green-100 text-green-800',
      'Policy': 'bg-orange-100 text-orange-800',
      'Pest Control': 'bg-red-100 text-red-800',
      'Innovation': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section id="news" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Agricultural News</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest developments in agriculture, technology, and sustainable farming practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User size={16} />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <span className="text-green-600 font-medium">{article.readTime}</span>
                </div>
                
                <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium transition-colors">
                  <span>Read More</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            View All News
          </button>
        </div>
      </div>
    </section>
  );
};

export default News;