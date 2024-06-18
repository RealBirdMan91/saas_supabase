import { cn } from "@/lib/utils";
import { error } from "console";
import React from "react";
import Dropzone, { DropzoneOptions, FileRejection } from "react-dropzone";
import { toast } from "sonner";

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
  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    const { maxFiles, maxSize, multiple } = dropzoneProps;
    console.log("files", files);
    console.log("MAXFILES", maxFiles);
    console.log("FILESLENGTH", files?.length + 1);

    if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
      toast.error("Cannot upload more than 1 file at a time");
      return;
    }

    if (maxFiles && (files?.length ?? 0) + acceptedFiles.length > maxFiles) {
      toast.error(`Cannot upload more than ${maxFiles} files`);
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
      if (maxSize && file.errors.some((err) => err.code === "file-too-large")) {
        const maxSizeMB = maxSize / (1024 * 1024);
        toast.error(
          `${file.file.name} is too large. Max file size is ${
            Math.round((maxSizeMB + Number.EPSILON) * 100) / 100
          } MB`
        );
      }
    }

    /*    if (rejectedFiles.length) {
      const tooManyFiles = rejectedFiles[0].errors.find(
        (error) => error.code === "too-many-files"
      );
      toast.error(
        dropzoneProps.maxFiles
          ? `Cannot upload more than ${dropzoneProps.maxFiles} files`
          : tooManyFiles?.message
      );

      rejectedFiles.forEach((file) => {
        const tooLargeFile = file.errors.find(
          (error) => error.code === "file-too-large"
        );
        toast.error(
          `${file.file.name} is too large. Max file size is ${dropzoneProps.maxSize}MB`
        );
      });
    } */

    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    const updatedFiles = files ? [...files, ...newFiles] : newFiles;

    onValueChange(updatedFiles);
  };

  return (
    <Dropzone onDrop={onDrop} {...dropzoneProps}>
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
            <p>Drag n drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
}

export default FileUploader;
