import React from 'react'
import UserDropdown from '../UserDropdown/UserDropdown'
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown'

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState('hidden')
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <a
            className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
            href="/"
          >
            AGNUS INVOICE MAN
          </a>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <a
                    className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                    href="/"
                  >
                    Tailwind Starter Kit
                  </a>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-3 py-2 h-12 border border-solid  border-gray-600 placeholder-gray-400 text-gray-700 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <a
                  className="text-pink-500 hover:text-pink-600 text-xs uppercase py-3 font-bold block"
                  href="/dashboard"
                >
                  <i className="fas fa-tv opacity-75 mr-2 text-sm"></i>{' '}
                  Dashboard
                </a>
              </li>

              <li className="items-center">
                <a
                  className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                  href="/"
                >
                  <i className="fas fa-user-circle text-gray-500 mr-2 text-sm"></i>{' '}
                  Profile Page
                </a>
              </li>

              <li className="items-center">
                <a
                  className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block"
                  href="/"
                >
                  <i className="fas fa-fingerprint text-gray-500 mr-2 text-sm"></i>{' '}
                  Login
                </a>
              </li>

              <li className="items-center">
                <a
                  className="text-gray-400 text-xs uppercase py-3 font-bold block"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-clipboard-list text-gray-400 mr-2 text-sm"></i>{' '}
                  Register (soon)
                </a>
              </li>

              <li className="items-center">
                <a
                  className="text-gray-400 text-xs uppercase py-3 font-bold block"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-tools text-gray-400 mr-2 text-sm"></i>{' '}
                  Settings (soon)
                </a>
              </li>
            </ul>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Order
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="inline-flex">
                <a
                  className="text-gray-800 hover:text-gray-600 text-sm block mb-4 no-underline font-semibold"
                  href="/order/create"
                >
                  <i className="fas fa-plus-circle mr-2 text-gray-500 text-base"></i>{' '}
                  New
                </a>
              </li>
              <li className="inline-flex">
                <a
                  className="text-gray-800 hover:text-gray-600 text-sm block mb-4 no-underline font-semibold"
                  href="/order"
                >
                  <i className="fas fa-clipboard-list mr-2 text-gray-500 text-base"></i>{' '}
                  List
                </a>
              </li>

              <li className="inline-flex">
                <a
                  className="text-gray-800 hover:text-gray-600 text-sm block mb-4 no-underline font-semibold"
                  href="/Order/Aproval"
                >
                  <i className="fas fa-thumbs-up mr-2 text-gray-500 text-base"></i>{' '}
                  Approval
                </a>
              </li>

              <li className="inline-flex">
                <a
                  className="text-gray-800 hover:text-gray-600  text-sm block mb-4 no-underline font-semibold"
                  href="/PO"
                >
                  <i className="fas fa-external-link-alt mr-2 text-gray-500 text-base"></i>{' '}
                  PO'S
                </a>
              </li>

              <li className="inline-flex">
                <a
                  className="text-gray-800 hover:text-gray-600  text-sm block mb-4 no-underline font-semibold"
                  href="/order"
                >
                  <i className="fas fa-file-invoice-dollar mr-2 text-gray-500 text-base"></i>{' '}
                  Invoice's
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
