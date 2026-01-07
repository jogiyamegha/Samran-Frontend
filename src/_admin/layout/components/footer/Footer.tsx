import {useEffect} from 'react'
import {ILayout, useLayout} from '../../core'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const {config} = useLayout()
  useEffect(() => {
    updateDOM(config)
  }, [config])
  const navigate = useNavigate()
  return (
    <>
      <div className='text-gray-900 order-2 order-md-1'>
        {/* <span className='text-muted fw-semibold me-1'>
          {new Date().getFullYear().toString()} @
        </span>
        <span
          className='text-gray-800 text-hover-primary'
        >
          Dunreidy
        </span> */}
      </div>

      <ul className='menu menu-gray-600 menu-hover-primary fw-semibold order-1'>
        {/* <li className='menu-item'>
          <span className='menu-link px-2' onClick={()=>navigate('/cms/contact-us')}>
            Contact Us
          </span>
        </li> */}
        <li className='menu-item'>
          <span className='menu-link px-2' onClick={()=>navigate('/cms/about-us')}>
            About Us
          </span>
        </li>

        <li className='menu-item'>
          <span className='menu-link px-2' onClick={()=> navigate('/cms/terms-and-conditions')}>
            Terms And Condition
          </span>
        </li>
        <li className='menu-item'>
          <span
            className='menu-link px-2'
            onClick={()=>navigate('/cms/privacy-policy')}
          >
            Privacy policy
          </span>
        </li>
      </ul>
    </>
  )
}

const updateDOM = (config: ILayout) => {
  if (config.app?.footer?.fixed?.desktop) {
    document.body.classList.add('data-kt-app-footer-fixed', 'true')
  }

  if (config.app?.footer?.fixed?.mobile) {
    document.body.classList.add('data-kt-app-footer-fixed-mobile', 'true')
  }
}

export {Footer}
