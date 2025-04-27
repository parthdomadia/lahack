import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b border-gray-100 py-4 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-2 rounded-full bg-teal-500 p-1.5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" fill="white" stroke="white" strokeWidth="2" />
                  <path d="M12 11L16 9V15L12 17L8 15V9L12 11Z" fill="#0D9488" stroke="#0D9488" />
                </svg>
              </div>
              <span className="text-xl font-bold text-teal-800">GluCUE</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-teal-700">
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col">
        <section className="flex flex-1 flex-col items-center justify-center px-4 py-12 text-center md:py-24 bg-gradient-to-b from-white via-teal-50 to-blue-50">
          <div className="max-w-4xl space-y-8">
            <h1 className="text-3xl font-bold leading-tight text-teal-900 sm:text-4xl md:text-5xl">
              Take control of your diabetes journey <span className="text-blue-600">with confidence</span>
            </h1>
            <p className="mx-auto max-w-xl text-lg text-gray-600">
              Track your meals, monitor your sugar levels, and receive personalized dietary advice in a friendly,
              easy-to-use app designed for your wellbeing.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center pt-4">
              <Link href="/signup">
                <Button size="lg" className="bg-teal-600 text-white hover:bg-teal-700 rounded-full px-8 shadow-md">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-teal-300 text-teal-700 hover:bg-teal-50 rounded-full px-8"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section id="features" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold text-teal-800 mb-12">How GluCUE Helps You</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 p-6 shadow-md border border-teal-100 transform transition-transform hover:scale-105">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-teal-200 p-3">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" stroke="#0D9488" strokeWidth="2" />
                      <circle cx="12" cy="12" r="4" fill="#0D9488" />
                    </svg>
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-teal-800 text-center">Track Glucose</h3>
                <p className="text-gray-600 text-center">
                  Connect your glucose monitor or manually log your readings to visualize your daily patterns with
                  colorful, easy-to-understand charts.
                </p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-md border border-blue-100 transform transition-transform hover:scale-105">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-blue-200 p-3">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6H21M3 12H21M3 18H21" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="7" cy="6" r="2" fill="#1E40AF" />
                      <circle cx="12" cy="12" r="2" fill="#1E40AF" />
                      <circle cx="17" cy="18" r="2" fill="#1E40AF" />
                    </svg>
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-blue-800 text-center">Log Meals</h3>
                <p className="text-gray-600 text-center">
                  Record what you eat and when to identify which foods affect your glucose levels, with a friendly
                  interface that makes tracking enjoyable.
                </p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 shadow-md border border-purple-100 transform transition-transform hover:scale-105">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-purple-200 p-3">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2L2 7L12 12L22 7L12 2Z"
                        fill="#7E22CE"
                        fillOpacity="0.2"
                        stroke="#7E22CE"
                        strokeWidth="2"
                      />
                      <path d="M2 17L12 22L22 17" stroke="#7E22CE" strokeWidth="2" />
                      <path d="M2 12L12 17L22 12" stroke="#7E22CE" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-purple-800 text-center">Get Insights</h3>
                <p className="text-gray-600 text-center">
                  Receive personalized recommendations based on your unique glucose response to foods, presented in a
                  clear, supportive way.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-gradient-to-b from-white to-teal-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-teal-800 mb-6 text-center">Friendly Support for Your Journey</h2>
              <p className="text-lg text-gray-600 mb-8 text-center">
                GluCUE is designed to be your supportive companion, not just another medical app. We use friendly
                visuals, clear language, and encouraging feedback to help you manage your diabetes with confidence.
              </p>
              <ul className="space-y-4 max-w-xl mx-auto">
                <li className="flex items-center">
                  <div className="mr-3 rounded-full bg-green-100 p-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 12L10 17L20 7"
                        stroke="#059669"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-lg">Colorful, easy-to-read glucose charts</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-3 rounded-full bg-green-100 p-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 12L10 17L20 7"
                        stroke="#059669"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-lg">Personalized meal suggestions with visual guides</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-3 rounded-full bg-green-100 p-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 12L10 17L20 7"
                        stroke="#059669"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-lg">Encouraging progress tracking and celebrations</span>
                </li>
              </ul>
              <div className="pt-8 text-center">
                <Link href="/signup">
                  <Button className="bg-teal-600 text-white hover:bg-teal-700 rounded-full px-8">
                    Start Your Journey
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-gray-100 py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center">
              <div className="mr-2 rounded-full bg-teal-500 p-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" fill="white" stroke="white" strokeWidth="2" />
                  <path d="M12 11L16 9V15L12 17L8 15V9L12 11Z" fill="#0D9488" stroke="#0D9488" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">© 2024 GluCUE. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-teal-700">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-teal-700">
                Terms
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-teal-700">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
