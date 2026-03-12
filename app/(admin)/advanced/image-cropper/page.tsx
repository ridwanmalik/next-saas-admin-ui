"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload } from "lucide-react"
import { ImageCropper } from "@/components/advanced/image-cropper"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface CropTarget {
  imageSrc: string
  aspectRatio: number
  label: string
}

const DropZone = ({
  aspectRatio,
  label,
  hint,
  onImageReady,
}: {
  aspectRatio: number
  label: string
  hint: string
  onImageReady: (target: CropTarget) => void
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
    onDrop: ([file]) => {
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => onImageReady({ imageSrc: reader.result as string, aspectRatio, label })
      reader.readAsDataURL(file)
    },
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 cursor-pointer transition-colors",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-border hover:border-muted-foreground/50 hover:bg-muted/40",
      )}
    >
      <input {...getInputProps()} />
      <div className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full mb-4",
        isDragActive ? "bg-primary/10" : "bg-muted",
      )}>
        <Upload className={cn("h-5 w-5", isDragActive ? "text-primary" : "text-muted-foreground")} />
      </div>
      <p className="text-sm font-medium">
        {isDragActive ? "Drop image here" : "Drag & drop an image"}
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        or <span className="text-primary underline underline-offset-2">browse</span> to upload
      </p>
      <p className="text-[11px] text-muted-foreground mt-3">{hint}</p>
    </div>
  )
}

const ImageCropperPage = () => {
  const [cropTarget, setCropTarget] = useState<CropTarget | null>(null)

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Image Cropper</h2>
        <p className="text-muted-foreground">Drop an image to crop, zoom, and preview before saving.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-semibold">Avatar Crop</h3>
            <p className="text-sm text-muted-foreground">Square 1:1 — ideal for profile pictures.</p>
          </div>
          <DropZone
            aspectRatio={1}
            label="Avatar Crop"
            hint="PNG, JPG, WebP · 1:1 square"
            onImageReady={setCropTarget}
          />
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-semibold">Banner Crop</h3>
            <p className="text-sm text-muted-foreground">Wide 16:9 — ideal for cover images.</p>
          </div>
          <DropZone
            aspectRatio={16 / 9}
            label="Banner Crop"
            hint="PNG, JPG, WebP · 16:9 wide"
            onImageReady={setCropTarget}
          />
        </div>
      </div>

      {/* Cropper modal — opens automatically when an image is dropped */}
      <Dialog open={!!cropTarget} onOpenChange={v => !v && setCropTarget(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{cropTarget?.label}</DialogTitle>
            <DialogDescription>
              Drag to reposition, use the slider to zoom, then click Save.
            </DialogDescription>
          </DialogHeader>
          {cropTarget && (
            <ImageCropper
              imageSrc={cropTarget.imageSrc}
              aspectRatio={cropTarget.aspectRatio}
              onSave={() => setCropTarget(null)}
              onCancel={() => setCropTarget(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ImageCropperPage
