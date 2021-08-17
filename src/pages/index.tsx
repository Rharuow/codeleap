import type { NextPage } from 'next'
import Image from 'next/image'

import codeleapLogo from "../assets/images/codeleap_logo_black 1.svg"

const Home: NextPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <Image width={607.5} height={167} className="pulse" layout="fixed" src={codeleapLogo} alt="main logo codeleap" />
    </div>
  )
}

export default Home
