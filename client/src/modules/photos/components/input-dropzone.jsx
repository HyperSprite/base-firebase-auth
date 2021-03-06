import React from 'react';
import Dropzone from 'react-dropzone';

const inputDropzone = (field) => {
  const files = field.input.value;
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={(filesToUpload, e) => field.input.onChange(filesToUpload)}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map(file => <li key={file.name}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
};

export default inputDropzone;
