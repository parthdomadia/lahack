"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useRef } from "react";

export default function SignupPage() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="container mx-auto flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>Enter your information to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(() => {
              const fullNameInput = (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
              );
              return fullNameInput;
            })()}
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
                  <Label htmlFor="password">Password</Label>
                  <Input ref={passwordRef} id="password" type="password" placeholder="Create a password" />
                </div>
              );
              return passwordInput;
            })()}
            {(() => {
              const confirmPasswordInput = (
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input ref={confirmPasswordRef} id="confirm-password" type="password" placeholder="Confirm your password" />
                </div>
              );
              return confirmPasswordInput;
            })()}
            <Button
              className="w-full bg-black text-white hover:bg-gray-800"
              onClick={() => {
                const password = passwordRef.current?.value;
                const confirmPassword = confirmPasswordRef.current?.value;

                if (password === confirmPassword) {
                  // Here you would typically handle the signup logic, e.g., sending the data to your backend
                  
                  fetch("http://localhos:5000/create_account", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: (document.getElementById("name") as HTMLInputElement)?.value,
                    email_id: (document.getElementById("email") as HTMLInputElement)?.value,
                    password_hash: password,
                  }),
                  })
                  .then((response) => {
                    if (!response.ok) {
                    throw new Error("Failed to create account");
                    }
                    return response.json();
                  })
                  .then((data) => {
                    console.log("✅ Account created successfully:", data);
                    // Now redirect only after success
                    window.location.href = "/survey";
                  })
                  .catch((error) => {
                    console.error("❌ Error:", error);
                    alert("An error occurred while creating your account. Please try again.");
                  });
                } else {
                  alert("Passwords do not match. Please try again.");
                }
              }}
            >
              Create Account
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-black hover:underline">
                Log in
              </Link>
            </div>
          </CardContent>
          <CardFooter />
        </Card>
      </div>
    </div>
  );
}
