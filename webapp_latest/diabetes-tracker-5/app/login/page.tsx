"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { use } from "react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="container mx-auto flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-teal-100 shadow-md">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 pb-6">
            <div className="flex justify-center mb-4">
              <div className="flex items-center">
                <div className="mr-2 rounded-full bg-teal-500 p-1.5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" fill="white" stroke="white" strokeWidth="2" />
                    <path d="M12 11L16 9V15L12 17L8 15V9L12 11Z" fill="#0D9488" stroke="#0D9488" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-teal-800">GluCUE</span>
              </div>
            </div>
            <CardTitle className="text-center text-2xl text-teal-800">Welcome back</CardTitle>
            <CardDescription className="text-center">Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
           {(() => {
              const emailInput = (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
              );
              return emailInput;
            })()}
            {(() => {
              const passwordInput = (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-teal-700 hover:text-teal-800 hover:underline">
                  Forgot password?
                </Link>
                </div>
                <Input 
                id="password"
                type="password"
                placeholder="Enter your password"
                className="border-gray-200 focus-visible:ring-teal-500"
                />
              </div>
              );
              return passwordInput;
            })()}
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                Remember me for 30 days
              </Label>
            </div>
          </CardContent>
            <CardFooter className="flex flex-col space-y-4">
            <Button
              className="w-full bg-teal-600 text-white hover:bg-teal-700"
              onClick={async () => {
              const email = (document.getElementById("email") as HTMLInputElement)?.value;
              const password = (document.getElementById("password") as HTMLInputElement)?.value;

              if (!email || !password) {
                alert("Please fill in both email and password.");
                return;
              }

              try {
                const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password }),
                });

                if (response.ok) {
                const data = await response.json();
                // Redirect to dashboard or handle success
                window.location.href = "/dashboard";
                } else {
                const error = await response.json();
                alert(error.message || "Login failed. Please try again.");
                }
              } catch (error) {
                console.error("Error during login:", error);
                alert("An error occurred. Please try again later.");
              }
              }}
            >
              Sign In
            </Button>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="font-medium text-teal-700 hover:text-teal-800 hover:underline">
                Create one
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <footer className="border-t border-gray-100 py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-600">© 2024 GluCUE. All rights reserved.</p>
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
