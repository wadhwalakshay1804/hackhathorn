import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Reply, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Reply {
  id: number;
  author: string;
  content: string;
  timestamp: Date;
  role: string;
}

interface Discussion {
  id: number;
  title: string;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies: Reply[];
  category: string;
  role: string;
}

const CommunityDiscussion: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('general');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const postsPerPage = 5;

  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: 1,
      title: "Best practices for organic pest control in tomatoes",
      author: "Sarah Johnson",
      content: "I've been struggling with aphids on my tomato plants. What are some effective organic methods you've tried?",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      likes: 15,
      replies: [
        {
          id: 1,
          author: "Mike Chen",
          content: "I've had great success with neem oil spray. Apply it in the evening to avoid harming beneficial insects.",
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
          role: "grower"
        }
      ],
      category: "pest-control",
      role: "grower"
    },
    {
      id: 2,
      title: "Soil pH testing recommendations",
      author: "David Martinez",
      content: "What's the most accurate way to test soil pH at home? Looking for reliable testing kits.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      likes: 8,
      replies: [],
      category: "soil-health",
      role: "grower"
    },
    {
      id: 3,
      title: "Seasonal fertilizer application schedule",
      author: "Lisa Thompson",
      content: "Can someone share their fertilizer application timeline for corn? First year growing and want to get it right.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      likes: 12,
      replies: [
        {
          id: 2,
          author: "Robert Wilson",
          content: "For corn, I typically do a pre-plant application, then side-dress at V6 stage. Happy to share my detailed schedule.",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          role: "sales-rep"
        }
      ],
      category: "fertilizers",
      role: "grower"
    },
    {
      id: 4,
      title: "Drought-resistant crop varieties",
      author: "Emma Davis",
      content: "With changing weather patterns, what drought-resistant varieties have worked well in your region?",
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      likes: 20,
      replies: [],
      category: "crop-varieties",
      role: "grower"
    },
    {
      id: 5,
      title: "Integrated pest management strategies",
      author: "James Rodriguez",
      content: "Looking to implement IPM on my farm. What monitoring tools and thresholds do you use?",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      likes: 18,
      replies: [],
      category: "pest-control",
      role: "grower"
    },
    {
      id: 6,
      title: "Cover crop benefits and selection",
      author: "Maria Garcia",
      content: "Considering cover crops for soil health. What species have given you the best results?",
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
      likes: 14,
      replies: [
        {
          id: 3,
          author: "Tom Anderson",
          content: "Crimson clover and winter rye have been excellent for me. Great nitrogen fixation and erosion control.",
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          role: "grower"
        }
      ],
      category: "soil-health",
      role: "grower"
    },
    {
      id: 7,
      title: "Precision agriculture technology adoption",
      author: "Kevin Brown",
      content: "Thinking about investing in precision ag tech. What's been your ROI experience?",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      likes: 22,
      replies: [],
      category: "technology",
      role: "grower"
    }
  ]);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return diffInHours === 0 ? 'Just now' : `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const handleNewPost = () => {
    if (newPostTitle.trim() && newPostContent.trim() && user) {
      const newPost: Discussion = {
        id: discussions.length + 1,
        title: newPostTitle,
        author: user.name,
        content: newPostContent,
        timestamp: new Date(),
        likes: 0,
        replies: [],
        category: newPostCategory,
        role: user.role
      };
      
      setDiscussions([newPost, ...discussions]);
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostCategory('general');
      setShowNewPost(false);
    }
  };

  const handleReply = (discussionId: number) => {
    if (replyContent.trim() && user) {
      const newReply: Reply = {
        id: Date.now(),
        author: user.name,
        content: replyContent,
        timestamp: new Date(),
        role: user.role
      };

      setDiscussions(discussions.map(discussion => 
        discussion.id === discussionId 
          ? { ...discussion, replies: [...discussion.replies, newReply] }
          : discussion
      ));
      
      setReplyContent('');
      setReplyingTo(null);
    }
  };

  // Sort discussions by timestamp (latest first)
  const sortedDiscussions = [...discussions].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  
  // Pagination
  const totalPages = Math.ceil(sortedDiscussions.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentDiscussions = sortedDiscussions.slice(startIndex, startIndex + postsPerPage);

  return (
    <section id="community" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Discussions</h2>
          <p className="text-lg text-gray-600">Connect with fellow farmers and agricultural experts</p>
        </div>

        {/* New Post Button */}
        {user && (
          <div className="mb-8">
            <button
              onClick={() => setShowNewPost(!showNewPost)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Start New Discussion
            </button>
          </div>
        )}

        {/* New Post Form */}
        {showNewPost && user && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Start a New Discussion</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="general">General</option>
                  <option value="pest-control">Pest Control</option>
                  <option value="soil-health">Soil Health</option>
                  <option value="fertilizers">Fertilizers</option>
                  <option value="crop-varieties">Crop Varieties</option>
                  <option value="technology">Technology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="Enter discussion title..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Share your question or insight..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleNewPost}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Post Discussion
                </button>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Discussion List */}
        <div className="space-y-6">
          {currentDiscussions.map((discussion) => (
            <div key={discussion.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {discussion.category.replace('-', ' ')}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {discussion.role}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{discussion.title}</h3>
                  <p className="text-gray-600 mb-3">{discussion.content}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>By {discussion.author}</span>
                    <span>{formatTimeAgo(discussion.timestamp)}</span>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp size={16} />
                      <span>{discussion.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare size={16} />
                      <span>{discussion.replies.length} replies</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Replies */}
              {discussion.replies.length > 0 && (
                <div className="mt-6 pl-4 border-l-2 border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Replies</h4>
                  <div className="space-y-3">
                    {discussion.replies.map((reply) => (
                      <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 mb-2">{reply.content}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-2">
                          <span>{reply.author}</span>
                          <span className="capitalize">({reply.role})</span>
                          <span>•</span>
                          <span>{formatTimeAgo(reply.timestamp)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reply Form */}
              {user && (
                <div className="mt-4">
                  {replyingTo === discussion.id ? (
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write your reply..."
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        onKeyPress={(e) => e.key === 'Enter' && handleReply(discussion.id)}
                      />
                      <button
                        onClick={() => handleReply(discussion.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Send size={16} />
                      </button>
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReplyingTo(discussion.id)}
                      className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
                    >
                      <Reply size={16} />
                      <span>Reply</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
            
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? 'bg-green-600 text-white'
                      : 'bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunityDiscussion;