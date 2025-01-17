import React, { useState, useEffect } from 'react';
import { headerLogo } from '../assets/images';
import { hamburger, sun, moon } from '../assets/icons';
import { navLinks } from '../constants';

const Nav = ({ setIsMenuOpen, isMenuOpen, isDarkMode: globalDarkMode, setIsDarkMode: setGlobalDarkMode }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [localDarkMode, setLocalDarkMode] = useState(false);

    // Use either global or local dark mode state
    const isDarkMode = globalDarkMode !== undefined ? globalDarkMode : localDarkMode;
    const setIsDarkMode = setGlobalDarkMode || setLocalDarkMode;

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);
        // Initial scroll check
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Check if user has a theme preference in localStorage
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);

        setIsDarkMode(initialDarkMode);
        document.documentElement.classList.toggle('dark', initialDarkMode);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
    };

    const handleLinkClick = (e, href) => {
        e.preventDefault();
        toggleMenu();
        setTimeout(() => {
            window.location.href = href;
        }, 300);
    };

    // Handle screen resize to close the menu on large screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false); // Close menu on larger screens
                document.body.style.overflow = 'auto';
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setIsMenuOpen]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
            ${isScrolled
                    ? 'bg-white dark:bg-slate-900 shadow-md'
                    : 'bg-transparent dark:bg-transparent'} 
            ${isDarkMode ? 'dark' : ''}`}
        >
            <nav className={`flex justify-between items-center max-container relative 
                ${isScrolled ? 'py-4' : 'py-8'} padding-x transition-all duration-300`}
            >
                {/* Logo */}
                <a href="/" className="relative z-50">
                    <img
                        src={headerLogo}
                        alt="Logo"
                        width={120}
                        height={29}
                        className={`transition-all duration-300 hover:scale-105 
                            ${isDarkMode ? 'filter invert' : ''}`}
                    />
                </a>

                {/* Desktop Navigation */}
                <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
                    {navLinks.map((item) => (
                        <li key={item.label}>
                            <a
                                href={item.href}
                                className={`font-montserrat leading-normal text-lg 
                                ${isScrolled
                                        ? 'text-slate-900 dark:text-white'
                                        : 'text-slate-gray dark:text-white'} 
                                hover:text-coral-red dark:hover:text-coral-red 
                                transition-all duration-300`}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Theme Toggle and Mobile Menu */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-all duration-300
                            ${isScrolled
                                ? 'hover:bg-slate-100 dark:hover:bg-slate-800'
                                : 'hover:bg-white/10 dark:hover:bg-slate-800/50'}
                            focus:outline-none`}
                        aria-label="Toggle theme"
                    >
                        <img
                            src={isDarkMode ? sun : moon}
                            alt={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                            className={`transition-all duration-300 hover:scale-110 h-8 w-8 lg:h-10 lg:w-10
                                ${isDarkMode ? 'invert' : ''}`}
                        />
                    </button>

                    {/* Mobile Menu Button */}
                    <div className="hidden max-lg:block cursor-pointer z-50">
                        <img
                            src={hamburger}
                            alt="Menu"
                            width={25}
                            height={25}
                            onClick={toggleMenu}
                            className={`transition-all duration-300 hover:scale-110
                                ${isDarkMode ? 'filter invert' : ''}`}
                        />
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={`fixed inset-0 bg-white/95 dark:bg-slate-900/98  dark:bg-black transform 
                        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} 
                        transition-transform duration-300 ease-in-out lg:hidden z-40`}
                >
                    <div className="flex flex-col h-full pt-24 px-8">
                        <ul className="flex flex-col items-center gap-8">
                            {navLinks.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className="font-montserrat text-2xl text-slate-900 
                                            dark:text-white hover:text-coral-red 
                                            dark:hover:text-coral-red transition-all duration-300"
                                        onClick={(e) => handleLinkClick(e, item.href)}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Nav;
