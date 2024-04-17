import Image from 'next/image'

export default function NatFound() {
  return (
    <div className="h-screen flex items-center justify-center flex-col bg-background space-y-8">
      <h1 className="font-bold text-2xl ">Página não encontrada</h1>
      <Image
        src="/assets/images/confused.gif"
        alt="Página não encontrada"
        width={400}
        height={400}
      />
    </div>
  )
}
