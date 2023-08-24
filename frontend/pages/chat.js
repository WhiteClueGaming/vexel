import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from '@/components/Head'
import Sidebar from '@/components/Sidebar'
import Body from '@/components/Body'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ user }) {

  return (
    <>
      <Head user={user} />
      <Sidebar user={user} />
      <Body user={user} />
    </>
  )
}
