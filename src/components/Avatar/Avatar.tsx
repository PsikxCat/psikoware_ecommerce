import Image from 'next/image'

interface AvatarProps {
  src: string | undefined | null
}

export default function Avatar({ src }: AvatarProps) {
  if (!src) {
    return (
      <Image
        className="rounded-full"
        src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Angel"
        alt="avatar"
        height={28}
        width={28}
      />
    )
  }

  return (
    <Image
      className="rounded-full"
      src={src}
      alt="avatar"
      height={28}
      width={28}
      />
  )
}
