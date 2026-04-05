import { Airplane } from '@phosphor-icons/react'

export default function Header() {
  return (
    <header className="pt-6 pb-2 text-center">
      <div className="flex items-center justify-center gap-2">
        <Airplane size={28} weight="duotone" className="text-[var(--blue)]" />
        <h1 className="text-[28px] font-[900] text-[var(--text)] m-0">
          Shabero
        </h1>
      </div>
      <p className="font-jp text-[13px] text-[var(--text-2)] opacity-70 mt-1">
        しゃべろう — Japonais parlé pour voyageurs
      </p>
    </header>
  )
}
