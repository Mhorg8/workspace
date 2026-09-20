"use client"

import { useId, useState, type Dispatch, type FormEvent, type SetStateAction } from "react"

import { DEFAULT_COLOR, isHexColor, normalizeHex } from "../utils/hex-color"

type UseAddColorOptions = {
  setColors: Dispatch<SetStateAction<string[]>>
}

export function useAddColor({ setColors }: UseAddColorOptions) {
  const colorId = useId()
  const hexId = useId()
  const [color, setColor] = useState(DEFAULT_COLOR)
  const [hex, setHex] = useState(DEFAULT_COLOR)
  const [error, setError] = useState<string | null>(null)

  function resetForm() {
    setColor(DEFAULT_COLOR)
    setHex(DEFAULT_COLOR)
    setError(null)
  }

  function handleSwatchChange(value: string) {
    setColor(value)
    setHex(value)
    setError(null)
  }

  function handleHexChange(value: string) {
    const nextHex = normalizeHex(value)
    setHex(nextHex)

    if (isHexColor(nextHex)) {
      setColor(nextHex)
      setError(null)
      return
    }

    setError("Enter a 6-digit hex color like #E11D48.")
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isHexColor(hex)) {
      setError("Enter a 6-digit hex color like #E11D48.")
      return
    }

    setColors((current) => [...current, hex.toLowerCase()])
    resetForm()
  }

  function handleRemoveColor(index: number) {
    setColors((current) => current.filter((_, currentIndex) => currentIndex !== index))
  }

  return {
    colorId,
    hexId,
    color,
    hex,
    error,
    isHexColor,
    resetForm,
    handleSwatchChange,
    handleHexChange,
    handleSubmit,
    handleRemoveColor,
  }
}
