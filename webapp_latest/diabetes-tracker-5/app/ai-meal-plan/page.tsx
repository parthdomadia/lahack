"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu, Settings, RefreshCw, Bookmark, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AIMealPlanPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("balanced")

  const handleGeneratePlan = () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
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
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-800"
                  >
                    Insights & Plan
                  </Link>
                  <Link
                    href="/ai-meal-plan"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-teal-800 bg-teal-50"
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
            <span className="text-xl font-bold text-teal-800">GluCUE</span>
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
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-800"
              >
                Insights & Plan
              </Link>
              <Link
                href="/ai-meal-plan"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-teal-800 bg-teal-50"
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
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-teal-800">AI-Generated Meal Plans</h1>
              <p className="text-gray-600">
                Personalized meal suggestions based on your glucose patterns and dietary preferences
              </p>
            </div>

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Plan Type:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-1">
                      {selectedPlan === "balanced" && "Balanced"}
                      {selectedPlan === "lowCarb" && "Low Carb"}
                      {selectedPlan === "mediterranean" && "Mediterranean"}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedPlan("balanced")}>Balanced</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedPlan("lowCarb")}>Low Carb</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedPlan("mediterranean")}>Mediterranean</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Button
                onClick={handleGeneratePlan}
                disabled={isGenerating}
                className="bg-teal-700 text-white hover:bg-teal-800"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate New Plan
                  </>
                )}
              </Button>
            </div>

            <div className="mb-6 rounded-lg bg-gradient-to-r from-teal-50 to-blue-50 p-4 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-teal-800">Your Personalized Meal Plan</h2>
                  <p className="text-sm text-gray-600">Based on your recent glucose patterns and dietary preferences</p>
                </div>
                <Button variant="outline" className="flex items-center gap-1 bg-white">
                  <Bookmark className="mr-1 h-4 w-4" />
                  Save This Plan
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="overflow-hidden border-t-4 border-t-teal-500">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 pb-2">
                  <CardTitle className="text-lg text-teal-800">Breakfast</CardTitle>
                  <CardDescription>Estimated Glucose Impact: Low</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-1 font-medium">Greek Yogurt Parfait with Berries</h3>
                      <p className="text-sm text-gray-600">
                        Plain Greek yogurt layered with fresh berries, a sprinkle of chopped walnuts, and a touch of
                        cinnamon.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-teal-50 text-teal-700">
                        15g Carbs
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        18g Protein
                      </Badge>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700">
                        12g Fat
                      </Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        240 Calories
                      </Badge>
                    </div>
                    <div className="rounded-md bg-blue-50 p-3">
                      <h4 className="mb-1 text-sm font-medium text-blue-800">Why This Works For You</h4>
                      <p className="text-xs text-blue-700">
                        The protein in Greek yogurt and healthy fats from walnuts slow down glucose absorption, while
                        berries provide antioxidants and fiber with minimal impact on blood sugar.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-t-4 border-t-blue-500">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-2">
                  <CardTitle className="text-lg text-blue-800">Lunch</CardTitle>
                  <CardDescription>Estimated Glucose Impact: Moderate</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-1 font-medium">Mediterranean Chicken Salad</h3>
                      <p className="text-sm text-gray-600">
                        Grilled chicken breast over mixed greens with cherry tomatoes, cucumber, olives, feta cheese,
                        and a light olive oil and lemon dressing.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-teal-50 text-teal-700">
                        12g Carbs
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        28g Protein
                      </Badge>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700">
                        15g Fat
                      </Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        320 Calories
                      </Badge>
                    </div>
                    <div className="rounded-md bg-blue-50 p-3">
                      <h4 className="mb-1 text-sm font-medium text-blue-800">Why This Works For You</h4>
                      <p className="text-xs text-blue-700">
                        This protein-rich meal with healthy fats helps maintain stable blood sugar levels. The fiber
                        from vegetables slows digestion and prevents glucose spikes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-t-4 border-t-indigo-500">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 pb-2">
                  <CardTitle className="text-lg text-indigo-800">Dinner</CardTitle>
                  <CardDescription>Estimated Glucose Impact: Low</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-1 font-medium">Baked Salmon with Roasted Vegetables</h3>
                      <p className="text-sm text-gray-600">
                        Herb-seasoned salmon fillet with a side of roasted broccoli, bell peppers, and zucchini drizzled
                        with olive oil.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-teal-50 text-teal-700">
                        15g Carbs
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        32g Protein
                      </Badge>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700">
                        18g Fat
                      </Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        380 Calories
                      </Badge>
                    </div>
                    <div className="rounded-md bg-blue-50 p-3">
                      <h4 className="mb-1 text-sm font-medium text-blue-800">Why This Works For You</h4>
                      <p className="text-xs text-blue-700">
                        Salmon provides omega-3 fatty acids which improve insulin sensitivity. The fiber-rich vegetables
                        create a balanced meal with minimal impact on blood glucose.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-t-4 border-t-amber-500">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 pb-2">
                  <CardTitle className="text-lg text-amber-800">Snacks</CardTitle>
                  <CardDescription>Options for throughout the day</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-1 font-medium">Morning Snack</h3>
                      <p className="text-sm text-gray-600">
                        A small apple with 1 tablespoon of almond butter (15g carbs, 4g protein, 9g fat)
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-1 font-medium">Afternoon Snack</h3>
                      <p className="text-sm text-gray-600">
                        1/4 cup of mixed nuts with a small piece of cheese (6g carbs, 8g protein, 16g fat)
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-1 font-medium">Evening Snack (if needed)</h3>
                      <p className="text-sm text-gray-600">
                        Celery sticks with 2 tablespoons of hummus (4g carbs, 2g protein, 3g fat)
                      </p>
                    </div>
                    <div className="rounded-md bg-blue-50 p-3">
                      <h4 className="mb-1 text-sm font-medium text-blue-800">Snacking Strategy</h4>
                      <p className="text-xs text-blue-700">
                        These snacks pair protein or healthy fats with fiber to maintain stable blood sugar between
                        meals. Choose the snack that best fits your hunger level and glucose readings.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Glucose Impact Analysis</CardTitle>
                  <CardDescription>How this meal plan is designed for your glucose patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-gradient-to-r from-teal-50 to-blue-50 p-4">
                    <h3 className="mb-2 font-medium text-teal-800">Personalized For Your Patterns</h3>
                    <p className="text-sm text-gray-700">
                      Based on your glucose data, we've noticed you experience higher spikes after consuming refined
                      carbohydrates in the morning. This plan focuses on protein-rich breakfasts and distributes
                      carbohydrates more heavily toward lunch when your body shows better tolerance.
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border border-teal-100 bg-white p-4 shadow-sm">
                      <h3 className="mb-2 font-medium text-teal-800">Carbohydrate Distribution</h3>
                      <p className="text-sm text-gray-600">
                        This plan provides approximately 120g of carbohydrates daily, with emphasis on complex
                        carbohydrates paired with protein and fiber to slow absorption.
                      </p>
                    </div>
                    <div className="rounded-lg border border-teal-100 bg-white p-4 shadow-sm">
                      <h3 className="mb-2 font-medium text-teal-800">Protein Focus</h3>
                      <p className="text-sm text-gray-600">
                        Each meal contains at least 15g of protein to help stabilize blood sugar and promote satiety,
                        reducing the likelihood of snacking on high-carb foods.
                      </p>
                    </div>
                    <div className="rounded-lg border border-teal-100 bg-white p-4 shadow-sm">
                      <h3 className="mb-2 font-medium text-teal-800">Strategic Timing</h3>
                      <p className="text-sm text-gray-600">
                        Meals are timed to prevent prolonged fasting periods which can lead to glucose variability and
                        higher post-meal spikes.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-gray-50 px-6 py-4">
                  <Button variant="outline">Download PDF</Button>
                  <Button className="bg-teal-700 text-white hover:bg-teal-800">Add to My Meal Plans</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
