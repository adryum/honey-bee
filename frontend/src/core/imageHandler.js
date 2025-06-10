import noImage from '@/assets/images/no-image.jpg'
import { ref, onMounted, watch } from 'vue'

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

export function useReactiveImage(objRef, getImageId) {
    const img = ref('')

    console.log(objRef);
    console.log(objRef.value);
    

    onMounted(async () => {
        img.value = await getImageRes(getImageId(objRef.value))
    })

    watch(() => getImageId(objRef.value), async (newImg) => {
        console.log("newImg: " + newImg);
        img.value = await getImageRes(newImg)
    })

    return { img }
}
