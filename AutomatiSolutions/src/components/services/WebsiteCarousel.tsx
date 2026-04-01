import React, { useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import developerDesmondImg from '@/assets/developerdesmond.jpg'
import infiniteChlorellaImg from '@/assets/infinitechlorella.jpg'
import bcmConsultingImg from '@/assets/bcmconsulting.jpg'
import newEnglandMeleeImg from '@/assets/newenglandmelee.jpg'

interface WebsiteExample {
  name: string
  url: string
  image: string
  description: string
}

const websiteExamples: WebsiteExample[] = [
  {
    name: "BCM Consulting",
    url: "https://bcmconsultingllc.com/",
    image: bcmConsultingImg,
    description: "Professional analytics dashboard with modern design"
  },
  {
    name: "New England Melee",
    url: "https://newenglandmelee.xyz",
    image: newEnglandMeleeImg,
    description: "Gaming community platform with dynamic content"
  },
  {
    name: "Developer Desmond",
    url: "https://developerdesmond.tech",
    image: developerDesmondImg,
    description: "Portfolio website showcasing technical expertise"
  },
  {
    name: "Infinite Chlorella",
    url: "https://infinitechlorella.com",
    image: infiniteChlorellaImg,
    description: "Health and wellness brand with clean aesthetics"
  }
]

const WebsiteCarousel: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      <Carousel 
        className="w-full"
        opts={{
          loop: true,
          align: "center"
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {websiteExamples.map((website, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="p-1">
                <a 
                  href={website.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-2 hover:border-indigo-500">
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      <img
                        src={website.image}
                        alt={website.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                        {website.name}
                      </h3>
                      <p className="text-base text-gray-600 mt-2">
                        {website.description}
                      </p>
                      <div className="flex items-center mt-4 text-indigo-600 text-sm font-medium">
                        <span>Visit Site</span>
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation buttons positioned outside the carousel visually */}
        <CarouselPrevious className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        <CarouselNext className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        
        {/* Mobile floating arrows above the images */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 md:hidden" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 md:hidden" />
        
        {/* Swipe indicators for mobile */}
        <div className="flex justify-center mt-6 space-x-2">
          {websiteExamples.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === current 
                  ? 'bg-indigo-600 w-6' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}

export default WebsiteCarousel
