// components/Slider.tsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Slide = {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
}

const slides: Slide[] = [
    {
        id: 1,
        title: "Premium Collection",
        subtitle: "2024 Edition",
        description: "Experience luxury redefined with our exclusive collection. Crafted with precision and passion for the discerning individual.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    },
    {
        id: 2,
        title: "Summer Essentials",
        subtitle: "Limited Edition",
        description: "Embrace the season with our carefully curated summer collection. Style meets comfort in every piece.",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    },
    {
        id: 3,
        title: "Sustainable Fashion",
        subtitle: "Eco-Friendly",
        description: "Look good while doing good. Our sustainable line combines style with environmental consciousness.",
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
    }
];

export default function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Optimization: Adding `currentSlide` resets the timer on manual clicks
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [currentSlide]); 

    return (
        <div className="relative h-screen w-full overflow-hidden bg-linear-to-br from-gray-900 to-gray-800">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === currentSlide
                            ? 'opacity-100 translate-x-0'
                            : index < currentSlide
                                ? 'opacity-0 -translate-x-full'
                                : 'opacity-0 translate-x-full'
                    }`}
                >
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    
                    {/* Note: Consider using Next.js <Image /> component here for better performance */}
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-full w-full object-cover"
                    />

                    {/* Content */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <div className="text-center text-white px-4 max-w-4xl mx-auto">
                            <span className="inline-block text-sm uppercase tracking-wider mb-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                {slide.subtitle}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
                                {slide.title}
                            </h1>
                            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                                {slide.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-300 group"
            >
                <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-300 group"
            >
                <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
        </div>
    );
}