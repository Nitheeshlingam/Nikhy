import React, { useState, useEffect } from 'react';
import {
  Hero,
  PopularProducts,
  SuperQuality,
  Services,
  CustomerReviews,
  Footer,
  Subscribe,
  SpecialOffer
} from './sections';
import Nav from './components/Nav';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    // Apply initial theme
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  return (
    <main className={`relative w-full min-h-screen transition-colors duration-300 
      ${isDarkMode ? 'dark bg-dark-primary text-dark-text' : 'bg-white text-black'}`}>

      <Nav
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <div className={`w-full min-h-screen flex flex-col transition-opacity duration-300 
        ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}>

        <section className="w-full xl:padding-l wide:padding-r padding-b">
          <Hero />
        </section>

        <section className="w-full padding dark:bg-dark-secondary">
          <PopularProducts />
        </section>

        <section className="w-full padding dark:bg-dark-primary">
          <SuperQuality />
        </section>

        <section className="w-full padding-x py-10 dark:bg-dark-secondary">
          <Services />
        </section>

        <section className="w-full padding dark:bg-dark-primary">
          <SpecialOffer />
        </section>

        <section className="w-full bg-pale-blue dark:bg-dark-secondary padding">
          <CustomerReviews />
        </section>

        <section className="w-full padding-x sm:py-32 py-16 dark:bg-dark-primary">
          <Subscribe />
        </section>

        <section className="w-full bg-black padding-x padding-t pb-8">
          <Footer />
        </section>

      </div>
    </main>
  );
};

export default App;
