import Body from '@/components/Body'
import Head from '@/components/Head'
import Sidebar from '@/components/Sidebar'
import '@/styles/globals.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast, { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(false)

  async function getUser() {
    try {
      const response = await axios.get('https://vexelapi.discordz.net/profile', {
        withCredentials: true
      });
      setUser(response.data.auth == true ? response.data : false);
    } catch (error) {
      setUser(false);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerpolicy="no-referrer" />
      <script src="https://cdn.jsdelivr.net/npm/markdown-it@12.0.4/dist/markdown-it.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/wowjs@1.1.3/dist/wow.min.js"></script>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />

      <script>
        new WOW().init();
      </script>
      <div className='mt-[6rem] w-full h-full animate__animated animate__fadeIn'>
        <Component {...pageProps} user={user} />
      </div>
      <Toaster />

      <div className="sm:opacity-100 lg:opacity-100 fixed z-[-1] top-[50%] left-[50%] flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]"></div>
    </>
  )
}
