import toast from 'react-hot-toast'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

import firebaseApp from '@/libs/firebase'

export default async function handleImagesUpload(data: any, updateImages: string[][]) {
  toast('Creando producto, por favor espere...', { icon: '📦' })

  try {
    for (const [index, variant] of data.productVariants.entries()) {
      updateImages[index] = []

      const formattedName = data.name.split(' ').join('').split('').slice(0, 10).join('').toUpperCase()

      for (const item of variant.images) {
        if (item.name) {
          const fileName = `${formattedName} - 0${index + 1} - ${item.name}`
          const storage = getStorage(firebaseApp)
          const storageRef = ref(storage, `products/${data.category}/${fileName}`)
          const uploadTask = uploadBytesResumable(storageRef, item)

          // crea una nueva Promesa que se resuelve cuando la tarea de subida de imagen se completa y retorna la URL de descarga, que se almacena en el array updateImages
          await new Promise<void>((resolve, reject) => {
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload is ' + progress + '% done')

                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused')
                    break
                  case 'running':
                    console.log('Upload is running')
                    break
                }
              },
              (error) => {
                console.error('Error subiendo imagenes', error)
                toast.error('Error subiendo imagenes')
                reject(error)
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  updateImages[index] = [...updateImages[index], downloadURL]
                  console.log('Imagen disponible en', downloadURL)
                  resolve()
                }).catch((error) => {
                  console.error('Error obteniendo URL de descarga', error)
                  toast.error('Error obteniendo URL de descarga')
                  reject(error)
                })
              }
            )
          })
        }
      }
    }
  } catch (error) {
    console.error('Error al guardar las imagenes en Firebase', error)
    return toast.error('Error al guardar las imagenes en Firebase')
  }
}
