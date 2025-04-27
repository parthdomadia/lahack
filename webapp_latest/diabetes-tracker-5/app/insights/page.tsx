"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, Menu, Settings, Lightbulb, Camera, Loader2 } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InsightsPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analysisResults, setAnalysisResults] = useState<null | {
    calories: number
    protein: number
    carbs: number
    sugar: number
    water: number
    foodItems: string[]
  }>(null)
  const [inRangePercentage, setInRangePercentage] = useState(75)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)

      // Simulate AI analysis
      setIsAnalyzing(true)
      setTimeout(() => {
        setAnalysisResults({
          calories: Math.floor(Math.random() * 300) + 200,
          protein: Math.floor(Math.random() * 20) + 5,
          carbs: Math.floor(Math.random() * 30) + 20,
          sugar: Math.floor(Math.random() * 15) + 2,
          water: Math.floor(Math.random() * 200) + 100,
          foodItems: ["Avacado", "Bacon", "Potatoes", "Milkshake", "Blackberries", "Eggs", "Bread"],
        })
        setIsAnalyzing(false)
      }, 2000)
    }
  }

  const resetAnalysis = () => {
    setSelectedImage(null)
    setAnalysisResults(null)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5 text-teal-700" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <nav className="flex flex-col space-y-4 py-4">
                  <Link
                    href="/dashboard"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-800"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/insights"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-teal-800 bg-teal-50"
                  >
                    Insights & Plan
                  </Link>
                  <Link
                    href="/ai-meal-plan"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-800"
                  >
                    AI Meal Plans
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-800"
                  >
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex items-center">
              <div className="mr-2 rounded-full bg-teal-500 p-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" fill="white" stroke="white" strokeWidth="2" />
                  <path d="M12 11L16 9V15L12 17L8 15V9L12 11Z" fill="#0D9488" stroke="#0D9488" />
                </svg>
              </div>
              <span className="text-xl font-bold text-teal-800">GluCUE</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5 text-teal-700" />
                <span className="sr-only">Settings</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <nav className="hidden w-64 border-r border-gray-200 bg-white md:block">
          <div className="flex h-full flex-col">
            <div className="flex-1 space-y-1 px-2 py-4">
              <Link
                href="/dashboard"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-800"
              >
                Dashboard
              </Link>
              <Link
                href="/insights"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-teal-800 bg-teal-50"
              >
                Insights & Plan
              </Link>
              <Link
                href="/ai-meal-plan"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-800"
              >
                AI Meal Plans
              </Link>
              <Link
                href="/settings"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-800"
              >
                Settings
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6 flex items-center">
              <Lightbulb className="mr-2 h-6 w-6 text-yellow-500" />
              <h1 className="text-2xl font-bold text-teal-800">Insights & Plan</h1>
            </div>
            <p className="mb-6 text-gray-600 max-w-2xl">
              Discover patterns in your glucose levels and meal responses. These personalized insights help you make
              better choices for your health journey.
            </p>

            <Tabs defaultValue="insights" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-2 md:w-auto">
                <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="meal-analysis">Meal Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="insights">
                <div className="mb-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-4 shadow-sm border border-purple-100">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="rounded-full bg-purple-100 p-3">
                      <img
                        src="/placeholder.svg?height=40&width=40"
                        alt="Insights illustration"
                        className="h-10 w-10"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-purple-800">Your Personalized Insights</h2>
                      <p className="text-sm text-gray-600">
                        We analyze your data to find patterns that can help you make better choices. The more you track,
                        the more personalized your insights become!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="rounded-xl border-teal-100 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100">
                      <CardTitle className="text-teal-800">Meal Impact Analysis</CardTitle>
                      <CardDescription>How different meals affect your glucose levels</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="space-y-4">
                        <div className="rounded-lg border border-green-100 bg-green-50 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="mr-2 rounded-full bg-green-100 p-1.5">
                                <img
                                  src="/placeholder.svg?height=24&width=24"
                                  alt="Breakfast icon"
                                  className="h-6 w-6"
                                />
                              </div>
                              <h3 className="font-medium text-green-800">Breakfast: Oatmeal with Berries</h3>
                            </div>
                            <div className="flex items-center text-green-600">
                              <ArrowUp className="mr-1 h-4 w-4" />
                              <span className="text-sm">+35 mg/dL</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">
                            This meal caused a moderate glucose increase that returned to normal within 2 hours.
                          </p>
                          <div className="mt-2 bg-white rounded-md p-2 border border-green-100">
                            <h4 className="text-xs font-medium text-green-800">RECOMMENDATION</h4>
                            <p className="text-sm text-gray-600">
                              Consider adding protein to slow down glucose absorption.
                            </p>
                          </div>
                        </div>
                        <div className="rounded-lg border border-red-100 bg-red-50 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="mr-2 rounded-full bg-red-100 p-1.5">
                                <img src="/placeholder.svg?height=24&width=24" alt="Lunch icon" className="h-6 w-6" />
                              </div>
                              <h3 className="font-medium text-red-800">Lunch: White Rice with Chicken</h3>
                            </div>
                            <div className="flex items-center text-red-600">
                              <ArrowUp className="mr-1 h-4 w-4" />
                              <span className="text-sm">+85 mg/dL</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">
                            This meal caused a significant glucose spike that took over 3 hours to normalize.
                          </p>
                          <div className="mt-2 bg-white rounded-md p-2 border border-red-100">
                            <h4 className="text-xs font-medium text-red-800">RECOMMENDATION</h4>
                            <p className="text-sm text-gray-600">
                              Replace white rice with brown rice or quinoa for a lower glycemic impact.
                            </p>
                          </div>
                        </div>
                        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="mr-2 rounded-full bg-blue-100 p-1.5">
                                <img src="/placeholder.svg?height=24&width=24" alt="Dinner icon" className="h-6 w-6" />
                              </div>
                              <h3 className="font-medium text-blue-800">Dinner: Salmon with Vegetables</h3>
                            </div>
                            <div className="flex items-center text-green-600">
                              <ArrowUp className="mr-1 h-4 w-4" />
                              <span className="text-sm">+15 mg/dL</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">
                            This meal had minimal impact on your glucose levels. Great choice!
                          </p>
                          <div className="mt-2 bg-white rounded-md p-2 border border-blue-100">
                            <h4 className="text-xs font-medium text-blue-800">RECOMMENDATION</h4>
                            <p className="text-sm text-gray-600">
                              Continue with similar protein and vegetable-based meals for dinner.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="rounded-xl border-blue-100 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                      <CardTitle className="text-blue-800">Food Recommendations</CardTitle>
                      <CardDescription>Better alternatives based on your glucose response</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="space-y-4">
                        <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
                          <div className="flex items-center mb-2">
                            <div className="mr-2 rounded-full bg-amber-100 p-1.5">
                              <img src="/placeholder.svg?height=24&width=24" alt="Bread icon" className="h-6 w-6" />
                            </div>
                            <h3 className="font-medium text-amber-800">Instead of White Bread</h3>
                          </div>
                          <div className="mb-2 flex items-center">
                            <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                            <p className="text-sm text-gray-600">White bread (high glucose impact)</p>
                          </div>
                          <div className="mb-2 flex items-center">
                            <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                            <p className="text-sm text-gray-600">Try whole grain bread or sourdough</p>
                          </div>
                          <p className="text-xs text-gray-500 bg-white rounded-md p-2 border border-amber-100">
                            Whole grains contain fiber that slows down glucose absorption.
                          </p>
                        </div>
                        <div className="rounded-lg border border-orange-100 bg-orange-50 p-4">
                          <div className="flex items-center mb-2">
                            <div className="mr-2 rounded-full bg-orange-100 p-1.5">
                              <img src="/placeholder.svg?height=24&width=24" alt="Juice icon" className="h-6 w-6" />
                            </div>
                            <h3 className="font-medium text-orange-800">Instead of Orange Juice</h3>
                          </div>
                          <div className="mb-2 flex items-center">
                            <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                            <p className="text-sm text-gray-600">Orange juice (high glucose impact)</p>
                          </div>
                          <div className="mb-2 flex items-center">
                            <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                            <p className="text-sm text-gray-600">Try whole oranges or berries</p>
                          </div>
                          <p className="text-xs text-gray-500 bg-white rounded-md p-2 border border-orange-100">
                            Whole fruits contain fiber that helps moderate glucose response.
                          </p>
                        </div>
                        <div className="rounded-lg border border-purple-100 bg-purple-50 p-4">
                          <div className="flex items-center mb-2">
                            <div className="mr-2 rounded-full bg-purple-100 p-1.5">
                              <img src="/placeholder.svg?height=24&width=24" alt="Cereal icon" className="h-6 w-6" />
                            </div>
                            <h3 className="font-medium text-purple-800">Instead of Cereal</h3>
                          </div>
                          <div className="mb-2 flex items-center">
                            <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                            <p className="text-sm text-gray-600">Sweetened cereal (high glucose impact)</p>
                          </div>
                          <div className="mb-2 flex items-center">
                            <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                            <p className="text-sm text-gray-600">Try Greek yogurt with nuts and berries</p>
                          </div>
                          <p className="text-xs text-gray-500 bg-white rounded-md p-2 border border-purple-100">
                            Protein and healthy fats help stabilize blood sugar levels.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="mt-6">
                  <Card className="rounded-xl border-indigo-100 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
                      <CardTitle className="text-indigo-800">Weekly Patterns</CardTitle>
                      <CardDescription>Trends we've identified in your glucose data</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-100">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1 rounded-full bg-yellow-100 p-2">
                            <img src="/placeholder.svg?height=24&width=24" alt="Morning icon" className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="mb-2 font-medium text-yellow-800">Morning Dawn Phenomenon</h3>
                            <p className="text-sm text-gray-600">
                              Your glucose levels tend to rise between 4-7 AM, even before eating. This is common in
                              people with diabetes and is called the dawn phenomenon.
                            </p>
                            <div className="mt-2 bg-white rounded-md p-2 border border-yellow-100">
                              <h4 className="text-xs font-medium text-yellow-800">RECOMMENDATION</h4>
                              <p className="text-sm text-gray-600">
                                Consider a protein-based snack before bed or discuss medication timing with your
                                healthcare provider.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1 rounded-full bg-blue-100 p-2">
                            <img src="/placeholder.svg?height=24&width=24" alt="Weekend icon" className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="mb-2 font-medium text-blue-800">Weekend Variability</h3>
                            <p className="text-sm text-gray-600">
                              Your glucose levels show more variability on weekends, likely due to changes in meal
                              timing and food choices.
                            </p>
                            <div className="mt-2 bg-white rounded-md p-2 border border-blue-100">
                              <h4 className="text-xs font-medium text-blue-800">RECOMMENDATION</h4>
                              <p className="text-sm text-gray-600">
                                Try to maintain consistent meal timing even on weekends, and be mindful of portion sizes
                                when eating out.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg bg-green-50 p-4 border border-green-100">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1 rounded-full bg-green-100 p-2">
                            <img src="/placeholder.svg?height=24&width=24" alt="Exercise icon" className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="mb-2 font-medium text-green-800">Exercise Impact</h3>
                            <p className="text-sm text-gray-600">
                              We've noticed your glucose levels improve for up to 24 hours after exercise sessions.
                            </p>
                            <div className="mt-2 bg-white rounded-md p-2 border border-green-100">
                              <h4 className="text-xs font-medium text-green-800">RECOMMENDATION</h4>
                              <p className="text-sm text-gray-600">
                                Aim for regular physical activity, even short walks after meals can help manage glucose
                                levels.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="meal-analysis">
                <Card className="mb-6 border-teal-100 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50">
                    <CardTitle className="text-teal-800">Log a Meal with Photo Analysis</CardTitle>
                    <CardDescription>Take a photo of your meal to get nutritional information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    {!selectedImage ? (
                      <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-teal-300 bg-teal-50/50 p-8">
                        <div className="flex flex-col items-center space-y-4">
                          <Camera className="h-12 w-12 text-teal-500" />
                          <div className="text-center">
                            <p className="text-sm font-medium text-teal-800">Take a photo of your meal</p>
                            <p className="text-xs text-gray-500 mt-1">Our AI will analyze the nutritional content</p>
                          </div>
                          <label htmlFor="meal-photo" className="cursor-pointer">
                            <div className="bg-teal-600 text-white hover:bg-teal-700 px-4 py-2 rounded-full flex items-center gap-2">
                              <Camera className="h-4 w-4" />
                              <span>Upload Photo</span>
                            </div>
                            <input
                              id="meal-photo"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="relative">
                          <img
                            src={selectedImage || "/placeholder.svg"}
                            alt="Meal"
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                            onClick={resetAnalysis}
                          >
                            Change Photo
                          </Button>
                        </div>

                        {isAnalyzing ? (
                          <div className="flex flex-col items-center justify-center p-8">
                            <Loader2 className="h-8 w-8 text-teal-600 animate-spin mb-4" />
                            <p className="text-teal-800 font-medium">Analyzing your meal...</p>
                            <p className="text-sm text-gray-500">
                              Our AI is identifying ingredients and nutritional content
                            </p>
                          </div>
                        ) : (
                          analysisResults && (
                            <div className="space-y-6">
                              <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
                                <h3 className="font-medium text-teal-800 mb-2">Detected Food Items:</h3>
                                <div className="flex flex-wrap gap-2">
                                  {analysisResults.foodItems.map((item, index) => (
                                    <span
                                      key={index}
                                      className="bg-white px-3 py-1 rounded-full text-sm border border-teal-200 text-teal-700"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-100">
                                  <p className="text-xs text-orange-600 font-medium">CALORIES</p>
                                  <p className="text-2xl font-bold text-orange-800">{analysisResults.calories}</p>
                                  <p className="text-xs text-orange-600">kcal</p>
                                </div>

                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                                  <p className="text-xs text-blue-600 font-medium">PROTEIN</p>
                                  <p className="text-2xl font-bold text-blue-800">{analysisResults.protein}g</p>
                                  <div className="mt-1 h-1 w-full bg-blue-100 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-blue-500 rounded-full"
                                      style={{ width: `${Math.min(analysisResults.protein * 2, 100)}%` }}
                                    ></div>
                                  </div>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                                  <p className="text-xs text-purple-600 font-medium">SUGAR</p>
                                  <p className="text-2xl font-bold text-purple-800">{analysisResults.sugar}g</p>
                                  <div className="mt-1 h-1 w-full bg-purple-100 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-purple-500 rounded-full"
                                      style={{ width: `${Math.min(analysisResults.sugar * 4, 100)}%` }}
                                    ></div>
                                  </div>
                                </div>

                                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-lg p-4 border border-cyan-100">
                                  <p className="text-xs text-cyan-600 font-medium">WATER</p>
                                  <p className="text-2xl font-bold text-cyan-800">{analysisResults.water}ml</p>
                                  <div className="mt-1 h-1 w-full bg-cyan-100 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-cyan-500 rounded-full"
                                      style={{ width: `${Math.min(analysisResults.water / 5, 100)}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-end">
                                <Button className="bg-teal-600 text-white hover:bg-teal-700 rounded-full">
                                  Save to Food Log
                                </Button>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
