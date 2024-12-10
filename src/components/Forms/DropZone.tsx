import React, {useCallback} from 'react'
import  {useDropzone} from 'react-dropzone'
import { Label } from '../ui/label'
import { title } from 'process'


interface DropZonePropsInterface { 
    title? : string
    handleFileChange : (key : string, file: File | null) => void
    name : string
}

const DropZone  :React.FC<DropZonePropsInterface> = ({
    title , 
    handleFileChange , 
    name
}) =>  {

  const onDrop = useCallback((acceptedFiles : any) => {
    handleFileChange( name ,acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop ,
    accept: {
        'image/jpeg': [],
        'image/png': []
    }
})

  return (
    <>
        <Label>
            {title}
        </Label>
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
    </>
  )
}

export default DropZone