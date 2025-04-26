import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Menu, Settings, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"

export default function SettingsPage() {
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
                    Insights
                  </Link>
                  <Link
                    href="/plan"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-800"
                  >
                    My Plan
                  </Link>
                  <Link
                    href="/ai-meal-plan"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-800"
                  >
                    AI Meal Plans
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-teal-800 bg-teal-50"
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
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5 text-teal-700" />
                <span className="sr-only">Profile</span>
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
                Insights
              </Link>
              <Link
                href="/plan"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-800"
              >
                My Plan
              </Link>
              <Link
                href="/ai-meal-plan"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-teal-50 hover:text-teal-800"
              >
                AI Meal Plans
              </Link>
              <Link
                href="/settings"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-teal-800 bg-teal-50"
              >
                Settings
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-teal-800">Settings</h1>
              <p className="text-gray-600">Manage your account and preferences</p>
            </div>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-3 md:w-auto">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="device">Device</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Data Collection Progress</CardTitle>
                    <CardDescription>
                      We need 1-4 weeks of data to create your personalized recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Glucose Readings</span>
                        <span className="text-sm text-gray-500">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Meal Logs</span>
                        <span className="text-sm text-gray-500">40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm text-gray-500">52%</span>
                      </div>
                      <Progress value={52} className="h-2" />
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-gray-600">
                        We're analyzing your glucose patterns and food responses. Continue logging your meals and
                        monitoring your glucose to receive more accurate recommendations.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input id="full-name" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="diabetes-type">Diabetes Type</Label>
                      <RadioGroup defaultValue="type2" id="diabetes-type">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="type1" id="type1" />
                          <Label htmlFor="type1">Type 1</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="type2" id="type2" />
                          <Label htmlFor="type2">Type 2</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="prediabetes" id="prediabetes" />
                          <Label htmlFor="prediabetes">Prediabetes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="gestational" id="gestational" />
                          <Label htmlFor="gestational">Gestational</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="target-low">Target Range - Low (mg/dL)</Label>
                        <Input id="target-low" type="number" defaultValue="70" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="target-high">Target Range - High (mg/dL)</Label>
                        <Input id="target-high" type="number" defaultValue="180" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-teal-700 text-white hover:bg-teal-800">Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="device">
                <Card>
                  <CardHeader>
                    <CardTitle>Device Connection</CardTitle>
                    <CardDescription>Manage your glucose monitor connection</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Dexcom G6</h3>
                          <p className="text-sm text-gray-500">Connected since April 15, 2024</p>
                        </div>
                        <Button variant="outline">Disconnect</Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Glucose Unit</Label>
                      <RadioGroup defaultValue="mgdl" id="unit">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mgdl" id="mgdl" />
                          <Label htmlFor="mgdl">mg/dL</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mmol" id="mmol" />
                          <Label htmlFor="mmol">mmol/L</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sync-frequency">Data Sync Frequency</Label>
                      <RadioGroup defaultValue="5min" id="sync-frequency">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="5min" id="5min" />
                          <Label htmlFor="5min">Every 5 minutes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="15min" id="15min" />
                          <Label htmlFor="15min">Every 15 minutes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="30min" id="30min" />
                          <Label htmlFor="30min">Every 30 minutes</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-teal-700 text-white hover:bg-teal-800">Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how and when you receive alerts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Glucose Alerts</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="high-alert">High Glucose Alert</Label>
                          <p className="text-sm text-gray-500">Notify when glucose exceeds your high target</p>
                        </div>
                        <Switch id="high-alert" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="low-alert">Low Glucose Alert</Label>
                          <p className="text-sm text-gray-500">Notify when glucose falls below your low target</p>
                        </div>
                        <Switch id="low-alert" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="rapid-change">Rapid Change Alert</Label>
                          <p className="text-sm text-gray-500">Notify when glucose is changing rapidly</p>
                        </div>
                        <Switch id="rapid-change" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">App Notifications</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="meal-reminder">Meal Logging Reminders</Label>
                          <p className="text-sm text-gray-500">Remind you to log meals</p>
                        </div>
                        <Switch id="meal-reminder" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="insights">New Insights</Label>
                          <p className="text-sm text-gray-500">Notify when new insights are available</p>
                        </div>
                        <Switch id="insights" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="tips">Daily Tips</Label>
                          <p className="text-sm text-gray-500">Receive daily diabetes management tips</p>
                        </div>
                        <Switch id="tips" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-teal-700 text-white hover:bg-teal-800">Save Changes</Button>
                    </div>
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
