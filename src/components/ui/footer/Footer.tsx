import { titleFont } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="flex w-full justify-center text-xs mb-10 gap-3">
        <Link href={'/'} className="flex items-center gap-2">
            <span className={`${titleFont.className} antialiased font-bold`}>CTG</span>
            <span className="antialiased">| shop</span>
            <span className="antialiased">© {new Date().getFullYear()}</span>
        </Link>
        <Link href={'/'} >
            Privacy and legal
        </Link>
        <Link href={'/'} >
            Ubications
        </Link>
    </footer>
  )
}
