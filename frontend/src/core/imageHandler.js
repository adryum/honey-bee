import noImage from '@/assets/images/no-image.jpg'

const images = import.meta.glob('@/assets/images/*')

export async function getImageRes(imageId) {
  const path = `/src/assets/images/${imageId}` // make sure this path matches the actual file path

  const importer = images[path]
  if (!importer) {
    return noImage
  }
  const module = await importer()
  return module.default
}