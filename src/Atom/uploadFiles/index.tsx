import React from "react";
import { Upload, Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./uploadFiles.scss"; // Import your styles

interface UploadInputProps {
  name?: string;
  label?: string;
  helperText?: string | React.ReactNode;
  required?: boolean;
  onChange?: (fileList: any[], name: string) => void;
  disabled?: boolean;
  error?: boolean;
  externalClassName?: string;
  accept?: string;
}

export const UploadInput: React.FC<UploadInputProps> = ({
  name = "file",
  label = "Upload File",
  helperText = "",
  required = false,
  onChange = () => {},
  disabled = false,
  error = false,
  externalClassName = "",
  accept = "*",
}) => {
  const handleChange = (info: any) => {
    const fileList = info.fileList;
    onChange(fileList, name);
  };

  return (
    <Form.Item
      label={label}
      required={required}
      validateStatus={error ? "error" : ""}
      help={error && helperText ? helperText : undefined}
      className={`upload-input-container ${externalClassName}`}
    >
      <Upload
        onChange={handleChange}
        beforeUpload={() => false} // Prevent auto-upload
        disabled={disabled}
        accept={accept}
      >
        <Button icon={<UploadOutlined />} disabled={disabled}>
          {label}
        </Button>
      </Upload>
      {!error && helperText && (
        <span className="helper-text">{helperText}</span>
      )}
    </Form.Item>
  );
};
