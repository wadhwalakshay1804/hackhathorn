import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import CommunityDiscussion from './components/CommunityDiscussion';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Notifications from './components/Notifications';

function App() {
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setCurrentView(hash);
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'notifications':
        return <Notifications />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <Products />
            <CommunityDiscussion />
            <News />
            <Contact />
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          {renderContent()}
        </main>
        {currentView === 'home' && <Footer />}
        <ChatBot />
      </div>
    </AuthProvider>
  );
}

export default App;