

// export function getImageRes(imageId) {
//     console.log(require('@/assets/images/' + imageId));
    
//     return require('@/assets/images/' + imageId)
// }

const images = import.meta.glob('@/assets/images/*')
import noImage from '@/assets/images/no-image.jpg'
export async function getImageRes(imageId) {
  const path = `/src/assets/images/${imageId}` // make sure this path matches the actual file path

  const importer = images[path]
  if (!importer) {
    return noImage
  }
  const module = await importer()
  return module.default
}