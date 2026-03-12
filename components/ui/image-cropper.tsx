"use client"

import { useCallback, useState } from "react"
import Cropper from "react-easy-crop"
import type { Area, Point } from "react-easy-crop"
import { ZoomIn, ZoomOut, RotateCcw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ImageCropperProps {
  imageSrc: string
  aspectRatio?: number
  onSave?: (blob: Blob, dataUrl: string) => void
  onCancel?: () => void
  className?: string
}

// ─── Canvas helper ────────────────────────────────────────────────────────────

const getCroppedImg = async (imageSrc: string, pixelCrop: Area): Promise<{ blob: Blob; dataUrl: string }> => {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.addEventListener("load", () => resolve(img))
    img.addEventListener("error", reject)
    img.src = imageSrc
  })

  const canvas = document.createElement("canvas")
  canvas.width  = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext("2d")!

  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height)

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) { reject(new Error("Canvas is empty")); return }
      resolve({ blob, dataUrl: canvas.toDataURL("image/jpeg") })
    }, "image/jpeg", 0.9)
  })
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ImageCropper = ({ imageSrc, aspectRatio = 1, onSave, onCancel, className }: ImageCropperProps) => {
  const [crop, setCrop]               = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom]               = useState(1)
  const [croppedArea, setCroppedArea] = useState<Area | null>(null)
  const [preview, setPreview]         = useState<string | null>(null)
  const [saving, setSaving]           = useState(false)

  const onCropComplete = useCallback((_: Area, pixelCrop: Area) => {
    setCroppedArea(pixelCrop)
  }, [])

  const handlePreview = async () => {
    if (!croppedArea) return
    const { dataUrl } = await getCroppedImg(imageSrc, croppedArea)
    setPreview(dataUrl)
  }

  const handleSave = async () => {
    if (!croppedArea) return
    setSaving(true)
    try {
      const result = await getCroppedImg(imageSrc, croppedArea)
      onSave?.(result.blob, result.dataUrl)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={cn("space-y-4", className)}>

      {/* Crop area — large */}
      <div className="relative h-130 rounded-xl overflow-hidden bg-muted">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      {/* Zoom slider */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0"
          onClick={() => setZoom(z => Math.max(1, z - 0.1))}>
          <ZoomOut className="h-3.5 w-3.5" />
        </Button>
        <Slider min={1} max={3} step={0.01} value={[zoom]}
          onValueChange={([v]) => setZoom(v)} className="flex-1" />
        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0"
          onClick={() => setZoom(z => Math.min(3, z + 0.1))}>
          <ZoomIn className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Preview — small */}
      {preview && (
        <div className="flex items-center gap-3">
          <p className="text-xs font-medium text-muted-foreground shrink-0">Preview</p>
          <img
            src={preview}
            alt="Cropped preview"
            className={cn(
              "object-cover shadow-md",
              aspectRatio === 1 ? "h-12 w-12 rounded-full" : "h-12 rounded-md",
            )}
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handlePreview}>Preview</Button>
        <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1.5">
          <Check className="h-3.5 w-3.5" />
          {saving ? "Saving…" : "Save"}
        </Button>
        {onCancel && (
          <Button variant="ghost" size="sm" onClick={onCancel} className="gap-1.5 ml-auto">
            <RotateCcw className="h-3.5 w-3.5" />
            Change image
          </Button>
        )}
      </div>
    </div>
  )
}
