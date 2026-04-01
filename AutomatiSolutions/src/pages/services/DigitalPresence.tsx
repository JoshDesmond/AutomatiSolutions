import React from 'react'
import WebsiteCarousel from '@/components/services/WebsiteCarousel'
import CalendlyCTA from '@/components/calendly/CalendlyCTA'
import textureBg from '@/assets/Texture.jpg'

const DigitalPresence: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 z-0" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10 opacity-15"
          style={{ backgroundImage: `url(${textureBg})` }}
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/20 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
              Get Found Online
            </h1>
            <p className="mt-4 text-xl text-white max-w-3xl mx-auto mb-8">
              I'll build you a professional online presence that attracts customers and establishes your business as a trusted authority in your market.
            </p>
            <div className="mt-8 flex flex-col md:flex-row md:space-x-4 justify-center">
              <a href="#packages" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50">
                View Packages
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a href="#consultation" className="mt-3 md:mt-0 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 bg-opacity-60 hover:bg-opacity-70">
                Book Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Agitation */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Check: How's Your Digital Presence?
            </h2>
            
             <p className="text-lg text-gray-600">
              Every unchecked item represents potential customers walking away. 
              I can help turn those question marks into confident checkmarks.
            </p>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-100 mt-8">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 border-2 border-indigo-400 rounded mr-3 mt-0.5 bg-white"></div>
                    <span className="text-gray-700 font-medium">Can customers find your business online?</span>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 border-2 border-indigo-400 rounded mr-3 mt-0.5 bg-white"></div>
                    <span className="text-gray-700 font-medium">Does your website work well on phones?</span>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 border-2 border-indigo-400 rounded mr-3 mt-0.5 bg-white"></div>
                    <span className="text-gray-700 font-medium">Is your site loading fast enough?</span>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 border-2 border-indigo-400 rounded mr-3 mt-0.5 bg-white"></div>
                    <span className="text-gray-700 font-medium">Do you have clear calls-to-action?</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 border-2 border-indigo-400 rounded mr-3 mt-0.5 bg-white"></div>
                    <span className="text-gray-700 font-medium">Are you showing up in local searches?</span>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 border-2 border-indigo-400 rounded mr-3 mt-0.5 bg-white"></div>
                    <span className="text-gray-700 font-medium">Does your brand look professional?</span>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 border-2 border-indigo-400 rounded mr-3 mt-0.5 bg-white"></div>
                    <span className="text-gray-700 font-medium">Can visitors easily contact you?</span>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 border-2 border-indigo-400 rounded mr-3 mt-0.5 bg-white"></div>
                    <span className="text-gray-700 font-medium">Is your content up-to-date?</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section id="packages" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Packages That Fit Your Stage</h2>
            <p className="text-lg text-gray-600">Straightforward pricing, no surprises — pick the tier that matches where your business is today</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Package */}
            <div className="bg-white rounded-lg shadow-md p-8 relative flex flex-col">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Starter Website</h3>
                <p className="text-gray-600 mb-4">Perfect for businesses taking their first step online</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">$1,500</span>
                  <span className="ml-2 text-gray-500">one-time</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">5-page responsive website</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Contact form with email notifications</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Basic SEO setup</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Mobile-optimized design</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">2-week delivery</span>
                </li>
              </ul>

              <a href="#consultation" className="mt-auto block w-full text-center px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition">
                Get Started
              </a>
            </div>

            {/* Professional Package */}
            <div className="bg-white rounded-lg shadow-xl p-8 relative border-2 border-indigo-500 flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  RECOMMENDED
                </span>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Web Presence</h3>
                <p className="text-gray-600 mb-4">Stand out from competitors with custom design</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">$3,500</span>
                  <span className="ml-2 text-gray-500">one-time</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><strong>Everything in Starter</strong></span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Custom design (not template)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Blog/news section</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Google Analytics setup</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Social media integration</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">3-week delivery</span>
                </li>
              </ul>

              <a href="#consultation" className="mt-auto block w-full text-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition">
                Get Started
              </a>
            </div>

            {/* Complete Package */}
            <div className="bg-white rounded-lg shadow-md p-8 relative flex flex-col">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Digital Launch</h3>
                <p className="text-gray-600 mb-4">Everything you need for a complete brand presence</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">$5,500</span>
                  <span className="ml-2 text-gray-500">one-time</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><strong>Everything in Professional</strong></span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Logo & brand identity package</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Google Business Profile optimization</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Social media templates (5 designs)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Email signature & business card design</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">4-week delivery</span>
                </li>
              </ul>

              <a href="#consultation" className="mt-auto block w-full text-center px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition">
                Get Started
              </a>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Not sure which package is right for you?</p>
            <a href="#consultation" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700">
              Book a free consultation and I'll help you decide
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Visual Examples */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">See the Difference</h2>
            <p className="text-lg text-gray-600">Clean, professional design that turns visitors into customers</p>
          </div>
          
          <WebsiteCarousel />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does the process take?</h3>
              <p className="text-gray-600">Delivery times range from 2–4 weeks depending on the package. I'll provide a detailed timeline during your consultation.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need to provide content and images?</h3>
              <p className="text-gray-600">I'll work with what you have and help create what you need. I can help with website content, source stock images, and define your visual branding and style if needed.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What about hosting and domain names?</h3>
              <p className="text-gray-600">I'll help you secure a domain and set up reliable hosting. Hosting typically costs $10-20/month, which you'll pay directly to the provider.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I update the site myself after launch?</h3>
              <p className="text-gray-600">Absolutely! I'll provide training on how to make updates, or I can handle ongoing maintenance for a small monthly fee.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What if I need something more custom?</h3>
              <p className="text-gray-600">No problem! Book a free consultation and I'll create a custom proposal based on your specific needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="consultation" className="py-16 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Found Online?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Book a free consultation and I'll help you figure out the right package for your business
          </p>

          <CalendlyCTA />
        </div>
      </section>
    </div>
  )
}

export default DigitalPresence 