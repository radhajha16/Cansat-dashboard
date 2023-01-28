import { UploadFileRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import _ from "lodash";
import React from "react";
import { FileUploader } from "react-drag-drop-files";

const DADForm = ({ file, handleFileChange }) => {
  const fileTypes = ["CSV"];

  return (
    <FileUploader
      multiple={false}
      handleChange={handleFileChange}
      name="file"
      types={fileTypes}
      children={
        <Button
          variant="outlined"
          color={file ? "secondary" : "info"}
          startIcon={<UploadFileRounded />}
          sx={{
            borderRadius: 10,
          }}
        >
          {file ? file.name : "Upload or drop CSV file here"}
        </Button>
      }
    />
  );
};

export default DADForm;
