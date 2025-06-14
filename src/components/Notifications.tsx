import React, { useState } from 'react';
import { Bell, Package, DollarSign, Users, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'order' | 'incentive' | 'reminder' | 'sales' | 'grower' | 'general';
  timestamp: Date;
  read: boolean;
  icon: React.ReactNode;
}

const Notifications: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    if (!user) return [];

    const baseNotifications: Notification[] = [];

    if (user.role === 'grower') {
      baseNotifications.push(
        {
          id: 1,
          title: "Order Shipped",
          message: "Your fertilizer order #12345 has been shipped and will arrive in 2-3 business days.",
          type: 'order',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          read: false,
          icon: <Package className="text-blue-500" size={20} />
        },
        {
          id: 2,
          title: "Reorder Reminder",
          message: "You ordered fertilizer 7 days ago. Do you need more for the upcoming season?",
          type: 'reminder',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          read: false,
          icon: <AlertCircle className="text-orange-500" size={20} />
        },
        {
          id: 3,
          title: "Incentive Added",
          message: "$50 has been added to your account as a loyalty incentive. Thank you for being a valued customer!",
          type: 'incentive',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          read: true,
          icon: <DollarSign className="text-green-500" size={20} />
        },
        {
          id: 4,
          title: "Seasonal Discount Available",
          message: "Get 15% off on all organic pesticides this month. Limited time offer!",
          type: 'general',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          read: true,
          icon: <Bell className="text-purple-500" size={20} />
        }
      );
    } else if (user.role === 'sales-rep') {
      baseNotifications.push(
        {
          id: 1,
          title: "New Grower Registration",
          message: "Sarah Johnson has registered as a new grower in your territory. Consider reaching out for an introduction.",
          type: 'grower',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
          read: false,
          icon: <Users className="text-blue-500" size={20} />
        },
        {
          id: 2,
          title: "Monthly Sales Target",
          message: "You've achieved 85% of your monthly sales target. Great progress! $15,000 remaining to reach goal.",
          type: 'sales',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
          read: false,
          icon: <TrendingUp className="text-green-500" size={20} />
        },
        {
          id: 3,
          title: "Large Order Alert",
          message: "Mike Chen placed a large order worth $5,000. Consider following up for additional products.",
          type: 'order',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          read: true,
          icon: <Package className="text-orange-500" size={20} />
        },
        {
          id: 4,
          title: "Grower Support Request",
          message: "David Martinez requested technical support for pest control. Please schedule a consultation.",
          type: 'grower',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          read: true,
          icon: <AlertCircle className="text-red-500" size={20} />
        },
        {
          id: 5,
          title: "Commission Payment",
          message: "Your commission payment of $2,500 has been processed and will be deposited within 24 hours.",
          type: 'incentive',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          read: true,
          icon: <DollarSign className="text-green-500" size={20} />
        }
      );
    }

    return baseNotifications;
  });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return diffInMinutes === 0 ? 'Just now' : `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days}d ago`;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Bell size={48} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please log in to view your notifications.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell size={24} className="text-green-600" />
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-200">
            {notifications.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Bell size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {notification.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-medium ${
                          !notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className={`mt-1 text-sm ${
                        !notification.read ? 'text-gray-700' : 'text-gray-600'
                      }`}>
                        {notification.message}
                      </p>
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          notification.type === 'order' ? 'bg-blue-100 text-blue-800' :
                          notification.type === 'incentive' ? 'bg-green-100 text-green-800' :
                          notification.type === 'reminder' ? 'bg-orange-100 text-orange-800' :
                          notification.type === 'sales' ? 'bg-purple-100 text-purple-800' :
                          notification.type === 'grower' ? 'bg-indigo-100 text-indigo-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {notification.type.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;