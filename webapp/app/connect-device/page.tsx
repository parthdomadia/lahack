import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Smartphone, Upload } from "lucide-react"

export default function ConnectDevicePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="container mx-auto flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Connect Your Glucose Monitor</CardTitle>
            <CardDescription>Link your device or manually upload your glucose readings</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="connect" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="connect">Connect Device</TabsTrigger>
                <TabsTrigger value="manual">Manual Upload</TabsTrigger>
              </TabsList>
              <TabsContent value="connect" className="space-y-4 pt-4">
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-100 p-3">
                      <Smartphone className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Dexcom G6</h3>
                      <p className="text-sm text-gray-500">Continuous Glucose Monitor</p>
                    </div>
                    <Button className="ml-auto bg-black text-white hover:bg-gray-800">Connect</Button>
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-100 p-3">
                      <Smartphone className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">FreeStyle Libre</h3>
                      <p className="text-sm text-gray-500">Flash Glucose Monitor</p>
                    </div>
                    <Button className="ml-auto bg-black text-white hover:bg-gray-800">Connect</Button>
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-gray-100 p-3">
                      <Smartphone className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Medtronic Guardian</h3>
                      <p className="text-sm text-gray-500">Continuous Glucose Monitor</p>
                    </div>
                    <Button className="ml-auto bg-black text-white hover:bg-gray-800">Connect</Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="manual" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Upload CSV or Excel file</Label>
                  <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 p-6">
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <p className="text-sm text-gray-500">Drag and drop your file here, or click to browse</p>
                      <Input id="file-upload" type="file" className="hidden" />
                      <Button variant="outline" size="sm">
                        Browse Files
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Manual Entry</Label>
                  <p className="text-sm text-gray-500">
                    You can also manually log your glucose readings in the dashboard.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-black text-white hover:bg-gray-800">
              <Link href="/dashboard">Continue to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
