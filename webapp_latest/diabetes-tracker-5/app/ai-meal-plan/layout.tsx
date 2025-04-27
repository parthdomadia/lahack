import type React from "react"
import { VirtualPet } from "@/components/virtual-pet"

export default function AIMealPlanLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <VirtualPet petType="dog" />
    </>
  )
}
