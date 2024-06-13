import React from "react";
import Dropzone, { DropzoneOptions, FileRejection } from "react-dropzone";
import { toast } from "sonner";

interface Props extends DropzoneOptions {
  value: File;
  onValueChange: (...event: any[]) => void;
}

function FileUploader({
  value: files,
  onValueChange,
  ...dropzoneProps
}: Props) {
  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (
      !dropzoneProps.multiple &&
      dropzoneProps.maxFiles === 1 &&
      acceptedFiles.length > 1
    ) {
      toast.error("Cannot upload more than 1 file at a time");
      return;
    }

    onValueChange(acceptedFiles[0]);
  };

  return (
    <Dropzone onDrop={onDrop} {...dropzoneProps}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag n drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
}

export default FileUploader;
