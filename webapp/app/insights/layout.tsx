import type React from "react"
import { VirtualPet } from "@/components/virtual-pet"

export default function InsightsLayout({
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
