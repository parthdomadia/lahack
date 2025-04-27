"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  User,
  Ruler,
  Weight,
  Droplet,
  Cookie,
  FileUp,
  ChevronRight,
  ChevronLeft,
  PawPrintIcon as Paw,
} from "lucide-react"

export default function SurveyPage() {
  const [step, setStep] = useState(1)
  const totalSteps = 7
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null)

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleAnimalSelect = (animal: string) => {
    setSelectedAnimal(animal)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="container mx-auto flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg border-teal-100 rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50">
            <CardTitle className="text-2xl text-teal-800">Your Health Profile</CardTitle>
            <CardDescription>
              Help us understand your needs and preferences (Step {step} of {totalSteps})
            </CardDescription>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div
                className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-blue-100 p-2">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-blue-800">Personal Information</h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <RadioGroup defaultValue="male" id="gender" className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nonbinary" id="nonbinary" />
                      <Label htmlFor="nonbinary">Non-binary</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                      <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height</Label>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-green-100 p-1">
                        <Ruler className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <Input id="height-ft" placeholder="Feet" type="number" />
                        <Input id="height-in" placeholder="Inches" type="number" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Select>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="imperial">ft/in</SelectItem>
                          <SelectItem value="metric">cm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-purple-100 p-1">
                        <Weight className="h-4 w-4 text-purple-600" />
                      </div>
                      <Input id="weight" placeholder="Enter your weight" type="number" />
                      <Select>
                        <SelectTrigger className="w-[80px]">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lbs">lbs</SelectItem>
                          <SelectItem value="kg">kg</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" placeholder="Enter your age" type="number" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-teal-100 p-2">
                    <Cookie className="h-5 w-5 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-medium text-teal-800">Dietary Habits</h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="breakfast">What do you typically eat for breakfast?</Label>
                  <Textarea id="breakfast" placeholder="Describe your typical breakfast" className="min-h-[80px]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lunch">What do you typically eat for lunch?</Label>
                  <Textarea id="lunch" placeholder="Describe your typical lunch" className="min-h-[80px]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dinner">What do you typically eat for dinner?</Label>
                  <Textarea id="dinner" placeholder="Describe your typical dinner" className="min-h-[80px]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="snacks">What snacks do you typically eat?</Label>
                  <Textarea id="snacks" placeholder="Describe your typical snacks" className="min-h-[80px]" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-blue-100 p-2">
                    <Droplet className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-blue-800">Water & Sugar Intake</h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="water-intake">Daily Water Intake</Label>
                  <div className="flex items-center gap-2">
                    <Input id="water-intake" placeholder="Amount" type="number" />
                    <Select defaultValue="cups">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cups">Cups</SelectItem>
                        <SelectItem value="oz">Ounces</SelectItem>
                        <SelectItem value="ml">Milliliters</SelectItem>
                        <SelectItem value="liters">Liters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>What forms of sugar do you typically consume?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="table-sugar" />
                      <Label htmlFor="table-sugar">Table sugar</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="honey" />
                      <Label htmlFor="honey">Honey</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="maple-syrup" />
                      <Label htmlFor="maple-syrup">Maple syrup</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="artificial-sweeteners" />
                      <Label htmlFor="artificial-sweeteners">Artificial sweeteners</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="agave" />
                      <Label htmlFor="agave">Agave</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="coconut-sugar" />
                      <Label htmlFor="coconut-sugar">Coconut sugar</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sugar-frequency">How often do you add sugar to your food/drinks?</Label>
                  <RadioGroup defaultValue="sometimes" id="sugar-frequency">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="never" id="never" />
                      <Label htmlFor="never">Never</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rarely" id="rarely" />
                      <Label htmlFor="rarely">Rarely</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sometimes" id="sometimes" />
                      <Label htmlFor="sometimes">Sometimes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="often" id="often" />
                      <Label htmlFor="often">Often</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="always" id="always" />
                      <Label htmlFor="always">Always</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sugary-drinks">How many sugary drinks do you consume per day?</Label>
                  <Select defaultValue="1-2">
                    <SelectTrigger>
                      <SelectValue placeholder="Select amount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">None</SelectItem>
                      <SelectItem value="1-2">1-2 drinks</SelectItem>
                      <SelectItem value="3-4">3-4 drinks</SelectItem>
                      <SelectItem value="5+">5+ drinks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-amber-100 p-2">
                    <FileText className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-medium text-amber-800">Medical History</h3>
                </div>

                <div className="space-y-2">
                  <Label>Do you have any existing medical conditions?</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hypertension" />
                      <Label htmlFor="hypertension">Hypertension (High Blood Pressure)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="heart-disease" />
                      <Label htmlFor="heart-disease">Heart Disease</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="high-cholesterol" />
                      <Label htmlFor="high-cholesterol">High Cholesterol</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="thyroid-disorder" />
                      <Label htmlFor="thyroid-disorder">Thyroid Disorder</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="kidney-disease" />
                      <Label htmlFor="kidney-disease">Kidney Disease</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="other-conditions">Other medical conditions:</Label>
                  <Textarea
                    id="other-conditions"
                    placeholder="Please list any other medical conditions you have"
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                    <Label>Upload Medical Records (Optional)</Label>
                    <div className="flex items-center justify-center rounded-lg border border-dashed border-teal-300 bg-teal-50/50 p-6">
                    <div className="flex flex-col items-center space-y-2">
                      <FileUp className="h-8 w-8 text-teal-500" />
                      <p className="text-sm text-gray-600">
                      Drag and drop your medical records here, or click to browse
                      </p>
                      <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                        console.log("File selected:", file);
                        // Prepare the file for API call
                        const formData = new FormData();
                        formData.append("medicalRecord", file);
                        // Example: Send formData to an API endpoint
                        fetch('http://localhost:5000/upload', { method: 'POST', body: formData });
                        }
                      }}
                      />
                      <Button
                      variant="outline"
                      size="sm"
                      className="border-teal-200 text-teal-700 hover:bg-teal-100"
                      onClick={() => document.getElementById("file-upload")?.click()}
                      >
                      Browse Files
                      </Button>
                      <p className="text-xs text-gray-500">Supported formats: PDF ONLY (Max 10MB)</p>
                    </div>
                    </div>
                  </div>
                </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-purple-100 p-2">
                    <img src="/placeholder.svg?height=20&width=20" alt="Food allergies" className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-medium text-purple-800">Dietary Restrictions</h3>
                </div>

                <div className="space-y-2">
                  <Label>Do you have any food allergies?</Label>
                  <RadioGroup defaultValue="no">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="allergies-yes" />
                      <Label htmlFor="allergies-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="allergies-no" />
                      <Label htmlFor="allergies-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allergies-list">If yes, please list your allergies:</Label>
                  <Textarea
                    id="allergies-list"
                    placeholder="List your food allergies"
                    className="min-h-[80px] border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Dietary Preferences</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="vegetarian" />
                      <Label htmlFor="vegetarian">Vegetarian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="vegan" />
                      <Label htmlFor="vegan">Vegan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="gluten-free" />
                      <Label htmlFor="gluten-free">Gluten-Free</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dairy-free" />
                      <Label htmlFor="dairy-free">Dairy-Free</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="low-carb" />
                      <Label htmlFor="low-carb">Low-Carb</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="keto" />
                      <Label htmlFor="keto">Keto</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="paleo" />
                      <Label htmlFor="paleo">Paleo</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="other-preferences">Other dietary preferences:</Label>
                  <Textarea
                    id="other-preferences"
                    placeholder="Describe any other dietary preferences"
                    className="min-h-[80px] border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-blue-100 p-2">
                    <img src="/placeholder.svg?height=20&width=20" alt="Glucose target" className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-medium text-blue-800">Diabetes Information</h3>
                </div>

                <div className="space-y-2">
                  <Label>Blood Sugar Target Range</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="target-low">Lower Limit (mg/dL)</Label>
                      <Input
                        id="target-low"
                        type="number"
                        placeholder="70"
                        className="border-blue-200 focus-visible:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target-high">Upper Limit (mg/dL)</Label>
                      <Input
                        id="target-high"
                        type="number"
                        placeholder="180"
                        className="border-blue-200 focus-visible:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Diabetes Type</Label>
                  <RadioGroup defaultValue="type2">
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

                <div className="space-y-2">
                  <Label htmlFor="diagnosis-date">When were you diagnosed?</Label>
                  <Input id="diagnosis-date" type="date" className="border-blue-200 focus-visible:ring-blue-500" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medications">Current Diabetes Medications</Label>
                  <Textarea
                    id="medications"
                    placeholder="List any medications you take for diabetes (name, dosage, frequency)"
                    className="min-h-[80px] border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-green-100 p-2">
                    <Paw className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-green-800">Choose Your Companion</h3>
                </div>

                <div className="space-y-2">
                  <Label className="text-center block mb-4">
                    Select a virtual pet that will grow with you as you maintain healthy glucose levels
                  </Label>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { id: "bird", name: "Bird", emoji: "🐦" },
                      { id: "butterfly", name: "Butterfly", emoji: "🦋" },
                      { id: "frog", name: "Frog", emoji: "🐸" },
                      { id: "dog", name: "Dog", emoji: "🐕" },
                      { id: "hamster", name: "Hamster", emoji: "🐹" },
                    ].map((animal) => (
                      <div
                        key={animal.id}
                        onClick={() => handleAnimalSelect(animal.id)}
                        className={`cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center transition-all ${
                          selectedAnimal === animal.id
                            ? "bg-green-100 border-2 border-green-500 transform scale-105"
                            : "bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50"
                        }`}
                      >
                        <div className="text-4xl mb-2">{animal.emoji}</div>
                        <p className="text-sm font-medium">{animal.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-100 mt-6">
                  <h4 className="font-medium text-green-800 mb-2">How Your Pet Grows</h4>
                  <p className="text-sm text-gray-600">
                    Your virtual pet will evolve as you maintain healthy glucose levels and complete your weekly goals.
                    Keep your levels in range and watch your companion grow and develop new abilities!
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-100 bg-gray-50 px-6 py-4">
            {step > 1 ? (
              <Button variant="outline" onClick={prevStep} className="flex items-center gap-1 border-teal-200">
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            ) : (
              <div></div>
            )}
            {step < totalSteps ? (
              <Button className="bg-teal-600 text-white hover:bg-teal-700 flex items-center gap-1" onClick={nextStep}>
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button className="bg-teal-600 text-white hover:bg-teal-700" disabled={!selectedAnimal}>
                <Link href="/connect-device">Complete</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
