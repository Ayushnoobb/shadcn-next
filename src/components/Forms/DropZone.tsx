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
    <div className='flex flex-col gap-4'>
        <Label>
            {title}
        </Label>
        <div {...getRootProps({ className: 'dropzone' })} className='bg-gray-100 border-gray-400 border border-dashed px-4 py-8 rounded'>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
    </div>
  )
}

export default DropZone