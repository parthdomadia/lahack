"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Menu,
  Plus,
  Settings,
  TrendingUp,
  Award,
  Activity,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  Info,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { GlucoseChart } from "./glucose-chart"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function DashboardPage() {
  const [date, setDate] = useState(new Date())
  const [syncStatus, setSyncStatus] = useState<"synced" | "syncing" | "error">("syncing")
  const [lastSynced, setLastSynced] = useState<Date | null>(null)
  const [inRangePercentage, setInRangePercentage] = useState(85)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })
  }

  // Simulate sync status changes
  useEffect(() => {
    // Initial sync simulation
    const syncTimer = setTimeout(() => {
      setSyncStatus("synced")
      setLastSynced(new Date())
    }, 2000)

    // Set up interval to simulate periodic sync attempts
    const syncInterval = setInterval(() => {
      // Randomly choose a sync status for demonstration
      const statuses: ("synced" | "syncing" | "error")[] = ["synced", "syncing", "error"]
      const randomStatus = statuses[Math.floor(Math.random() * 10) % 3]

      setSyncStatus(randomStatus)

      if (randomStatus === "synced") {
        setLastSynced(new Date())
      }
    }, 30000) // Every 30 seconds

    return () => {
      clearTimeout(syncTimer)
      clearInterval(syncInterval)
    }
  }, [])

  const handleManualSync = () => {
    setSyncStatus("syncing")

    // Simulate sync process
    setTimeout(() => {
      setSyncStatus("synced")
      setLastSynced(new Date())
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
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-teal-800 bg-teal-50"
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
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-teal-800 bg-teal-50"
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
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-teal-800">Welcome back, John!</h1>
                <div className="ml-2 rounded-full bg-yellow-100 p-1">
                  <Award className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600">{formatDate(date)}</p>
            </div>

            {/* Sensor Sync Status */}
            <div className="mb-6 rounded-xl border p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                {syncStatus === "synced" && (
                  <>
                    <div className="rounded-full bg-green-100 p-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">Sensor Connected</h3>
                      <p className="text-sm text-gray-600">
                        Last synced: {lastSynced ? formatTime(lastSynced) : "Never"}
                      </p>
                    </div>
                  </>
                )}

                {syncStatus === "syncing" && (
                  <>
                    <div className="rounded-full bg-blue-100 p-2">
                      <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-800">Syncing with Sensor</h3>
                      <p className="text-sm text-gray-600">Please wait while we connect to your device...</p>
                    </div>
                  </>
                )}

                {syncStatus === "error" && (
                  <>
                    <div className="rounded-full bg-red-100 p-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-red-800">Sync Error</h3>
                      <p className="text-sm text-gray-600">
                        Unable to connect to your sensor. Please check your device.
                      </p>
                    </div>
                  </>
                )}
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-teal-200 text-teal-700"
                      onClick={handleManualSync}
                      disabled={syncStatus === "syncing"}
                    >
                      <RefreshCw className={`h-4 w-4 mr-1 ${syncStatus === "syncing" ? "animate-spin" : ""}`} />
                      Sync Now
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Manually sync with your glucose sensor</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="mb-6 rounded-xl bg-gradient-to-r from-blue-50 via-teal-50 to-purple-50 p-4 shadow-sm border border-blue-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 p-3">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-blue-800">Your day is going well!</h2>
                    <p className="text-sm text-gray-600">
                      You've been in range {inRangePercentage}% of the time today.
                    </p>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                  <Link href="/insights">View Insights</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2 rounded-xl border-teal-100 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-teal-50 to-blue-50">
                  <div>
                    <CardTitle className="text-teal-800">Glucose Levels</CardTitle>
                    <CardDescription>Today's readings from 11AM to 9PM</CardDescription>
                  </div>
                  <Tabs defaultValue="day">
                    <TabsList className="bg-white/50">
                      <TabsTrigger value="day">Day</TabsTrigger>
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="month">Month</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="h-[300px]">
                    <GlucoseChart />
                  </div>

                  {/* Live data indicator */}
                  <div className="mt-4 flex items-center justify-end">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          syncStatus === "synced"
                            ? "bg-green-500 animate-pulse"
                            : syncStatus === "syncing"
                              ? "bg-blue-500 animate-pulse"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <span>
                        {syncStatus === "synced"
                          ? "Live data"
                          : syncStatus === "syncing"
                            ? "Updating..."
                            : "Data not updating"}
                      </span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {syncStatus === "synced"
                                ? "Your sensor is connected and sending data in real-time"
                                : syncStatus === "syncing"
                                  ? "Connecting to your sensor..."
                                  : "Unable to receive data from your sensor"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-xl border-blue-100 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <CardTitle className="text-blue-800">Current Status</CardTitle>
                  <CardDescription>Based on your latest reading</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Current Glucose</span>
                    <span className="text-xl font-bold text-blue-800">118 mg/dL</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Status</span>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                      In Range
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Trend</span>
                    <div className="flex items-center text-gray-600">
                      <TrendingUp className="mr-1 h-4 w-4 text-blue-600" />
                      <span className="text-sm">Slowly Rising</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Last Reading</span>
                    <span className="text-sm text-gray-600">
                      {lastSynced ? `${formatTime(lastSynced)}` : "Unknown"}
                    </span>
                  </div>
                  <div className="pt-2">
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full">
                      <Link href="/dashboard" className="flex items-center">
                        <Plus className="mr-2 h-4 w-4" />
                        Record Reading
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
