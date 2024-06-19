import { cn, formatBytes } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { UploadIcon, Trash2 } from "lucide-react";
import React from "react";
import Dropzone, { DropzoneOptions, FileRejection } from "react-dropzone";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props extends DropzoneOptions {
  value: File[];
  onValueChange: (...event: any[]) => void;
  className?: string;
}

function FileUploader({
  value: files,
  onValueChange,
  className,
  ...dropzoneProps
}: Props) {
  const { multiple, maxSize = 1024 * 1024 * 2, maxFiles = 1 } = dropzoneProps;

  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
      toast.error("Cannot upload more than 1 file at a time");
      return;
    }

    if ((files?.length ?? 0) + acceptedFiles.length > maxFiles) {
      toast.error(
        `Cannot upload more than ${maxFiles} ${
          maxFiles === 1 ? "file" : "files"
        }`
      );
      return;
    }

    for (const file of rejectedFiles) {
      if (file.errors.some((err) => err.code === "too-many-files")) {
        toast.error(
          dropzoneProps.maxFiles
            ? `Cannot upload more than ${maxFiles} files`
            : "Cannot upload more than 1 file at a time"
        );
        break;
      }
      if (file.errors.some((err) => err.code === "file-too-large")) {
        toast.error(
          `${file.file.name} is too large. Max file size is ${formatBytes(
            maxSize
          )}`
        );
      }
    }

    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    const updatedFiles = files ? [...files, ...newFiles] : newFiles;

    onValueChange(updatedFiles);
  };

  function onRemove(index: number) {}

  // Revoke preview url when component unmounts
  React.useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach((file) => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Dropzone
        onDrop={onDrop}
        maxFiles={maxFiles}
        maxSize={maxSize}
        {...dropzoneProps}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <section>
            <div
              {...getRootProps()}
              className={cn(
                "group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isDragActive && "border-muted-foreground/50",
                className
              )}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                  <div className="rounded-full border border-dashed p-3">
                    <UploadIcon
                      className="size-7 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="font-medium text-muted-foreground">
                    Drop the files here
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                  <div className="rounded-full border border-dashed p-3">
                    <UploadIcon
                      className="size-7 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="space-y-px">
                    <p className="font-medium text-muted-foreground">
                      Drag {`'n'`} drop files here, or click to select files
                    </p>
                    {
                      <p className="text-sm text-muted-foreground/70">
                        You can upload
                        {maxFiles > 1
                          ? ` ${maxFiles === Infinity ? "multiple" : maxFiles}
                     files (up to ${formatBytes(maxSize)} each)`
                          : ` a file with ${formatBytes(maxSize)}`}
                      </p>
                    }
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </Dropzone>
      {files?.length ? (
        <ScrollArea className="h-fit w-full px-3">
          <div className="max-h-48 space-y-4">
            {files?.map((file, index) => (
              <FileCard
                key={index}
                file={file}
                onRemove={() => onRemove(index)}
              />
            ))}
          </div>
        </ScrollArea>
      ) : null}
    </div>
  );
}

interface FileCardProps {
  file: File;
  onRemove: () => void;
}

function FileCard({ file, onRemove }: FileCardProps) {
  return (
    <div className="relative flex items-center space-x-4 mt-4">
      <div className="flex flex-1 space-x-4">
        {isFileWithPreview(file) && (
          <Image
            src={file.preview}
            alt={file.name}
            width={48}
            height={48}
            loading="lazy"
            className="aspect-square shrink-0 rounded-md object-cover"
          />
        )}

        <div className="flex w-full flex-col gap-2">
          <div className="space-y-px">
            <p className="line-clamp-1 text-sm font-medium text-foreground/80">
              {file.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatBytes(file.size)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-7"
          onClick={onRemove}
        >
          <Trash2 className="size-4 " aria-hidden="true" />
          <span className="sr-only">Remove file</span>
        </Button>
      </div>
    </div>
  );
}

function isFileWithPreview(file: File): file is File & { preview: string } {
  return "preview" in file && typeof file.preview === "string";
}

export default FileUploader;
