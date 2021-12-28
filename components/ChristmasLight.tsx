import Image from 'next/image'

interface ChristmasLightProps {
  color?: string
}

export const ChristmasLight = ({ color }: ChristmasLightProps) => {
  const src = !color ? '/images/unlit-light.svg' : color === "blue" ? '/images/blue-light.svg' : color === "red" ? '/images/red-light.svg' : '/images/green-light.svg'
  return(
    <Image src={src} width={25} height={25}/>
  )
}
