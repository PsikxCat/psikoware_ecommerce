'use client'

import { useState } from 'react'
import { type FieldErrors, type FieldValues, type UseFormRegister } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'

interface ImageInputProps {
  onImagesSelected: (images: File[]) => void
  existingImages?: File[]
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

export default function ImageInput({ onImagesSelected, existingImages = [], disabled = false, required = false, register, errors }: ImageInputProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>(existingImages)

  const onDrop = (acceptedFiles: File[]) => {
    const newImages = [...selectedImages, ...acceptedFiles]
    setSelectedImages(newImages)
    onImagesSelected(newImages)
  }

  const removeImage = (index: number) => {
    const newImages = [...selectedImages]
    newImages.splice(index, 1)
    setSelectedImages(newImages)
    onImagesSelected(newImages)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png'] },
    multiple: true
  })

  return (<>
    <div
      {...getRootProps()}
      className={`w-full h-36 flex items-center justify-center border-2 border-dashed rounded-lg ${isDragActive ? 'border-accent' : 'border-stone-500'}`}
    >
      <input {...getInputProps()} />
      <p className='text-center text-stone-300'>Arrastra y suelta las imágenes aquí, o haz clic para seleccionarlas</p>

    </div>

    {selectedImages.length > 0 && (
      <div className='w-full flex flex-wrap gap-2 mt-3'>
        {selectedImages.map((image, index) => (
          <div key={index} className='relative'>
            <img
              src={URL.createObjectURL(image)}
              alt={`Imagen #${index + 1}`}
              className='w-20 h-20 object-cover rounded-lg'
            />
            <button
              type='button'
              onClick={() => { removeImage(index) }}
              className='absolute top-0 right-0 bg-stone-700 text-stone-300 rounded-full w-6 h-6 flex items-center justify-center'
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    )}
  </>)
}
