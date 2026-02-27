"use client"

import { useEffect, useState } from "react"

export const useModKey = () => {
  const [modKey, setModKey] = useState("⌘")
  useEffect(() => {
    setModKey(/Mac|iPhone|iPad|iPod/.test(navigator.platform) ? "⌘" : "Ctrl")
  }, [])
  return modKey
}
