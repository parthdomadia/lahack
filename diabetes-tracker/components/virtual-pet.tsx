"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

type PetType = "bird" | "butterfly" | "frog" | "dog" | "hamster"
type GrowthStage = "baby" | "young" | "adult" | "master"

interface VirtualPetProps {
  petType?: PetType
  inRangePercentage?: number
  goalsCompleted?: number
}

const petEmojis: Record<PetType, Record<GrowthStage, string>> = {
  bird: {
    baby: "🥚",
    young: "🐤",
    adult: "🐦",
    master: "🦅",
  },
  butterfly: {
    baby: "🐛",
    young: "🐛",
    adult: "🦋",
    master: "✨🦋✨",
  },
  frog: {
    baby: "🥚",
    young: "🐸",
    adult: "🐸",
    master: "👑🐸",
  },
  dog: {
    baby: "🐶",
    young: "🐕",
    adult: "🐕",
    master: "🦮",
  },
  hamster: {
    baby: "🐹",
    young: "🐹",
    adult: "🐹",
    master: "✨🐹✨",
  },
}

const growthMessages: Record<GrowthStage, string[]> = {
  baby: ["Just hatched!", "So tiny!", "Hello world!"],
  young: ["Growing nicely!", "Getting stronger!", "Looking good!"],
  adult: ["Fully grown!", "Healthy and strong!", "Thriving!"],
  master: ["Legendary status!", "Maximum power!", "Incredible!"],
}

export function VirtualPet({ petType = "dog", inRangePercentage = 75, goalsCompleted = 0 }: VirtualPetProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentStage, setCurrentStage] = useState<GrowthStage>("baby")
  const [message, setMessage] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  // Validate pet type and use a fallback if invalid
  const validPetType = Object.keys(petEmojis).includes(petType as string) ? (petType as PetType) : "dog"

  // Determine growth stage based on glucose control and goals
  useEffect(() => {
    let newStage: GrowthStage = "baby"

    // Base growth only on glucose control
    if (inRangePercentage >= 90) {
      newStage = "master"
    } else if (inRangePercentage >= 75) {
      newStage = "adult"
    } else if (inRangePercentage >= 60) {
      newStage = "young"
    } else {
      newStage = "baby"
    }

    if (newStage !== currentStage) {
      setCurrentStage(newStage)
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 2000)

      // Show a random message for the new stage
      const messages = growthMessages[newStage]
      setMessage(messages[Math.floor(Math.random() * messages.length)])
    }
  }, [inRangePercentage, currentStage])

  // Show message briefly when pet is clicked
  const handlePetClick = () => {
    setIsExpanded(true)
    setTimeout(() => setIsExpanded(false), 3000)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 left-4 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="relative">
            <motion.div
              className={`cursor-pointer text-4xl ${isAnimating ? "animate-bounce" : ""}`}
              onClick={handlePetClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {petEmojis[validPetType][currentStage]}
            </motion.div>

            {isExpanded && (
              <motion.div
                className="absolute bottom-full mb-2 left-0 bg-white rounded-lg p-2 shadow-lg border border-gray-200 min-w-[150px]"
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
              >
                <div className="text-sm font-medium">{message || `Your ${validPetType} is ${currentStage}!`}</div>
                <div className="text-xs text-gray-500 mt-1">{inRangePercentage}% in range</div>
                <div className="h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"
                    style={{ width: `${Math.min(inRangePercentage, 100)}%` }}
                  ></div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
