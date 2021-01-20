import React, { useState } from 'react'

export const Footer = () => {
  if (1 === 1) {
    return <></>
  }

  return (
    <>
      <footer className="absolute bottom-0 left-0 h-16 ">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-gray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-gray-600 font-semibold py-1">
                Copyright © {new Date().getFullYear()}{' '}
                <a
                  href="https://www.mahotaservicos.com"
                  className="text-gray-600 hover:text-gray-800 text-sm font-semibold py-1"
                >
                  Mahota Serviços
                </a>
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <li>
                  <a
                    href="https://www.mahotaservicos.com"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                  >
                    Mahota Serviços
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.mahotaservicos.com/presentation"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="http://blog.www.mahotaservicos.com"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/gmahota/nextjs-invoice-order/blob/main/License.md"
                    className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                  >
                    MIT License
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
