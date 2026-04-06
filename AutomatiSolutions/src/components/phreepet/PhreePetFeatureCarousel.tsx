import { useEffect, useState } from 'react'
import type { CarouselApi } from '@/components/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import storyImage from '@/assets/phreepet/story.jpg'
import eggImage from '@/assets/phreepet/egg.jpg'
import statsImage from '@/assets/phreepet/stats.jpg'
import petImage from '@/assets/phreepet/pet.jpg'
import emotionsImage from '@/assets/phreepet/emotions.jpg'
import detailsImage from '@/assets/phreepet/details.jpg'
import PhreePetFeatureCard from '@/components/phreepet/PhreePetFeatureCard'

type Slide = {
  title: string
  image: string
  captionTitle: string
  captionBody: string
}

const slides: Slide[] = [
  {
    title: 'The Introduction',
    image: storyImage,
    captionTitle: 'Take responsibility for your digital well-being.',
    captionBody:
      'It\'s time to fight back against the addictive pull of Big Tech. By adopting a PhreePet, you are committing to reducing your screen time, opting out of excessive scroll-based social media, and seeing your digital habits as they really are.',
  },
  {
    title: 'The Egg',
    image: eggImage,
    captionTitle: 'Start with an egg.',
    captionBody:
      'PhreePet uses your device\'s native screen time tools to passively track your phone usage. To make forward progress, minimize the percent of daily time that you spend on your phone.',
  },
  {
    title: 'Historical Stats',
    image: statsImage,
    captionTitle: 'Track your history.',
    captionBody:
      'PhreePet reduces screen time down to an intuitive, easy to understand score that makes viewing your historical progress easy. Are you ready to face the reality of your phone usage?',
  },
  {
    title: 'The Pet',
    image: petImage,
    captionTitle: 'Care for your pet.',
    captionBody:
      'Like an amenable houseplant, your PhreePet needs only the occasional feeding and attention to stay alive. But unlike a plant\'s need for sunshine, PhreePet\'s thrive with healthy screentime habits.',
  },
  {
    title: 'Full Emotional Model',
    image: emotionsImage,
    captionTitle: 'Fifteen real emotions, real feedback.',
    captionBody:
      'Did you spend too much time staying up late and scrolling during your stillness hours (12:00am - 8:00am)? Now your pet has depression and clinical anxiety.\n\nScroll too much and your pet will suffer; (and you probably will be suffering too - but you already knew that).',
  },
  {
    title: 'Usage Details',
    image: detailsImage,
    captionTitle: 'Rapid feedback.',
    captionBody:
      'The eight-hour cadence of screen time tracking rewards gives you rapid feedback on your screen time performance without being yet another overstimulation in and of itself.',
  },
]

const PhreePetFeatureCarousel: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap())
    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)

    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          How does it work?
        </h2>

        <div className="flex flex-col min-h-0 h-[min(80svh,45rem)] md:h-[min(69svh,34rem)]">
          <div className="flex-1 min-h-0 flex flex-col px-10 md:px-14">
            <Carousel
              setApi={setApi}
              opts={{ loop: true }}
              className="flex h-full min-h-0 flex-col"
            >
              <div className="flex-1 min-h-0 min-w-0 flex flex-col">
                <CarouselContent className="-ml-4">
                {slides.map((slide) => (
                  <CarouselItem key={slide.title} className="h-full pl-4">
                    <PhreePetFeatureCard
                      imageSrc={slide.image}
                      imageAlt={slide.title}
                      captionTitle={slide.captionTitle}
                      captionBody={slide.captionBody}
                    />
                  </CarouselItem>
                ))}
                </CarouselContent>
              </div>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="shrink-0 pt-3 sm:pt-4 flex justify-center gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              className={`h-2 rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? 'w-6 bg-indigo-600'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to ${slide.title}`}
            />
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PhreePetFeatureCarousel
