import React, { useState } from 'react'
import NavBar from './Navbar'
import Head from 'next/head'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import { Footer } from '../Footer/Footer'

export const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <Navbar />
        <div className="relative bg-pink-600 md:pt-32 pb-32 pt-12"></div>

        <div className=" md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap">{children}</div>
        </div>

        <Footer />
      </div>
    </>
  )
}
