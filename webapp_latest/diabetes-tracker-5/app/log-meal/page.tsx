"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Menu, Settings, Camera, Clock } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"

export default function LogMealPage() {
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date()
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
  })

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
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-800"
                  >
                    AI Meal Plans
                  </Link>
                  <Link
                    href="/log-meal"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-teal-800 bg-teal-50"
                  >
                    Log Meal
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
            <span className="text-xl font-bold text-teal-800">GlucoseGuide</span>
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
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-800"
              >
                AI Meal Plans
              </Link>
              <Link
                href="/log-meal"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-teal-800 bg-teal-50"
              >
                Log Meal
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
              <h1 className="text-2xl font-bold text-teal-800">Log a Meal</h1>
              <p className="text-gray-600">Record what you ate and when to track your glucose response</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Meal Details</CardTitle>
                <CardDescription>Enter information about your meal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="meal-type">Meal Type</Label>
                  <RadioGroup defaultValue="lunch" id="meal-type" className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="breakfast" id="breakfast" />
                      <Label htmlFor="breakfast">Breakfast</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lunch" id="lunch" />
                      <Label htmlFor="lunch">Lunch</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dinner" id="dinner" />
                      <Label htmlFor="dinner">Dinner</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="snack" id="snack" />
                      <Label htmlFor="snack">Snack</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meal-time">Time</Label>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <Input
                      type="time"
                      id="meal-time"
                      value={currentTime}
                      onChange={(e) => setCurrentTime(e.target.value)}
                      className="w-32"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meal-description">What did you eat?</Label>
                  <Textarea
                    id="meal-description"
                    placeholder="Describe your meal in detail (e.g., 1 cup brown rice, 4 oz grilled chicken, 1 cup steamed broccoli)"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="carb-estimate">Estimated Carbs</Label>
                    <span className="text-sm text-gray-500">45g</span>
                  </div>
                  <Slider defaultValue={[45]} max={150} step={5} id="carb-estimate" />
                  <p className="text-xs text-gray-500">Drag the slider to estimate carbohydrates in grams</p>
                </div>
                <div className="space-y-2">
                  <Label>Add Photo (Optional)</Label>
                  <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 p-6">
                    <div className="flex flex-col items-center space-y-2">
                      <Camera className="h-8 w-8 text-gray-400" />
                      <p className="text-sm text-gray-500">Take a photo or upload from your gallery</p>
                      <Button variant="outline" size="sm">
                        Add Photo
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information about this meal or how you felt after"
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Link href="/dashboard">Cancel</Link>
                </Button>
                <Button className="w-full bg-teal-700 text-white hover:bg-teal-800 sm:w-auto">
                  <Link href="/dashboard">Save Meal</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
