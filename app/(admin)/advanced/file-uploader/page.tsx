import { FileUploader } from "@/components/advanced/file-uploader"

const FileUploaderPage = () => (
  <div className="mx-auto w-full max-w-3xl space-y-10">
    <div>
      <h2 className="text-2xl font-bold tracking-tight">File Uploader</h2>
      <p className="text-muted-foreground">Drag-and-drop file uploader with validation and progress.</p>
    </div>

    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">Any File</h3>
        <p className="text-sm text-muted-foreground">Accepts any file type, up to 10 MB each, max 10 files.</p>
      </div>
      <FileUploader />
    </div>

    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">Images Only</h3>
        <p className="text-sm text-muted-foreground">Accepts PNG, JPG, GIF, and WebP up to 5 MB.</p>
      </div>
      <FileUploader
        accept={{ "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] }}
        maxSize={5 * 1024 * 1024}
        maxFiles={5}
      />
    </div>

    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">Documents</h3>
        <p className="text-sm text-muted-foreground">Accepts PDF and text files up to 20 MB.</p>
      </div>
      <FileUploader
        accept={{ "application/pdf": [".pdf"], "text/*": [".txt", ".csv", ".md"] }}
        maxSize={20 * 1024 * 1024}
        maxFiles={3}
      />
    </div>
  </div>
)

export default FileUploaderPage
