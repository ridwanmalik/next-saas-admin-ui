"use client"

import { useCallback, useState } from "react"
import { useDropzone, type Accept } from "react-dropzone"
import { Upload, X, FileText, ImageIcon, File, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type FileStatus = "uploading" | "done" | "error"

interface UploadFile {
  id: string
  file: File
  progress: number
  status: FileStatus
  error?: string
}

export interface FileUploaderProps {
  accept?: Accept
  maxFiles?: number
  maxSize?: number         // bytes
  onUpload?: (files: File[]) => void
  className?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) return <ImageIcon className="h-4 w-4 text-blue-500" />
  if (type === "application/pdf" || type.startsWith("text/")) return <FileText className="h-4 w-4 text-rose-500" />
  return <File className="h-4 w-4 text-muted-foreground" />
}

const simulateUpload = (
  id: string,
  onProgress: (id: string, progress: number) => void,
  onDone: (id: string, success: boolean) => void,
) => {
  let progress = 0
  const interval = setInterval(() => {
    progress += Math.random() * 20
    if (progress >= 100) {
      clearInterval(interval)
      onProgress(id, 100)
      onDone(id, Math.random() > 0.1) // 10% chance of error for demo
    } else {
      onProgress(id, Math.min(progress, 95))
    }
  }, 200)
}

// ─── Component ────────────────────────────────────────────────────────────────

export const FileUploader = ({
  accept,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10 MB
  onUpload,
  className,
}: FileUploaderProps) => {
  const [files, setFiles] = useState<UploadFile[]>([])

  const updateProgress = useCallback((id: string, progress: number) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, progress } : f))
  }, [])

  const updateStatus = useCallback((id: string, success: boolean) => {
    setFiles(prev => prev.map(f =>
      f.id === id
        ? { ...f, status: success ? "done" : "error", error: success ? undefined : "Upload failed. Please try again." }
        : f
    ))
  }, [])

  const onDrop = useCallback((accepted: File[], rejected: { file: File; errors: { message: string }[] }[]) => {
    // Add rejected files as errors
    const rejectedEntries: UploadFile[] = rejected.map(({ file, errors }) => ({
      id: `${file.name}-${Date.now()}`,
      file,
      progress: 0,
      status: "error",
      error: errors[0]?.message ?? "File rejected",
    }))

    // Add accepted files and start simulated upload
    const newEntries: UploadFile[] = accepted.map(file => ({
      id: `${file.name}-${Date.now()}`,
      file,
      progress: 0,
      status: "uploading",
    }))

    setFiles(prev => [...prev, ...rejectedEntries, ...newEntries])
    onUpload?.(accepted)

    newEntries.forEach(entry => {
      simulateUpload(entry.id, updateProgress, updateStatus)
    })
  }, [onUpload, updateProgress, updateStatus])

  const remove = (id: string) => setFiles(prev => prev.filter(f => f.id !== id))

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
  })

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 cursor-pointer transition-colors",
          isDragActive && !isDragReject && "border-primary bg-primary/5",
          isDragReject  && "border-destructive bg-destructive/5",
          !isDragActive && "border-border hover:border-muted-foreground/50 hover:bg-muted/40",
        )}
      >
        <input {...getInputProps()} />
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full mb-4",
          isDragReject ? "bg-destructive/10" : "bg-muted",
        )}>
          <Upload className={cn("h-5 w-5", isDragReject ? "text-destructive" : "text-muted-foreground")} />
        </div>
        <p className="text-sm font-medium">
          {isDragActive
            ? isDragReject ? "Some files will be rejected" : "Drop files here"
            : "Drag & drop files here"
          }
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          or <span className="text-primary underline underline-offset-2">browse</span> to upload
        </p>
        <p className="text-[11px] text-muted-foreground mt-3">
          Max {maxFiles} files · Up to {formatBytes(maxSize)} each
          {accept && ` · ${Object.values(accept).flat().join(", ")}`}
        </p>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map(f => (
            <div
              key={f.id}
              className="flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5"
            >
              <div className="shrink-0">{getFileIcon(f.file.type)}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium truncate">{f.file.name}</p>
                  <span className="text-[11px] text-muted-foreground shrink-0">{formatBytes(f.file.size)}</span>
                </div>

                {f.status === "uploading" && (
                  <Progress value={f.progress} className="h-1 mt-1.5" />
                )}
                {f.status === "error" && (
                  <p className="text-[11px] text-destructive mt-0.5">{f.error}</p>
                )}
              </div>

              <div className="shrink-0">
                {f.status === "done"      && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                {f.status === "error"     && <AlertCircle  className="h-4 w-4 text-destructive"  />}
                {f.status === "uploading" && (
                  <span className="text-[11px] text-muted-foreground w-8 text-right block">
                    {Math.round(f.progress)}%
                  </span>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0 text-muted-foreground hover:text-foreground"
                onClick={() => remove(f.id)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
