import { VisitorLayout } from 'components/VisitorLayout'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AuthUtils } from '../lib/AuthUtils'
import loginStyles from 'styles/LoginSignup.module.css'
import classNames from 'classnames'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [password, setPassword] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [generalError, setGeneralError] = useState<string | null>(null)

  const [loading, setLoading] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [forgot, setForgot] = useState<boolean>(false)

  const handleLogin = async () => {
    setEmailError(null)
    setPasswordError(null)
    setGeneralError(null)

    setLoading(true)
    const result = await AuthUtils.login(email, password)

    if (result.error === undefined) {
      router.push('/user-account/home')
    } else {
      if (result.error === 'auth/invalid-email') {
        setEmailError('Invalid email')
      } else if (result.error === 'auth/user-disabled') {
        setGeneralError('User has been disabled. Please contact Visitable support.')
      } else if (result.error === 'auth/user-not-found') {
        setGeneralError('Account does not exist. Create a new account.')
      } else if (result.error === 'auth/wrong-password') {
        setPasswordError('Incorrect password')
      } else {
        setGeneralError('Unable to create user credentials. Please contact Visitable support.')
      }
    }
    setLoading(false)
  }

  const handleForgot = async () => {
    setEmailError(null)
    setPasswordError(null)
    setGeneralError(null)
    const result = await AuthUtils.forgotPassword(email)
    if (result) {
      if (result.error === undefined) {
        setGeneralError('Email sent!')
      } else {
        if (result.error === 'auth/invalid-email') {
          setEmailError('Invalid email')
        } else if (result.error === 'auth/user-disabled') {
          setGeneralError('User has been disabled. Please contact Visitable support.')
        } else if (result.error === 'auth/user-not-found') {
          setGeneralError('Account does not exist. Create a new account.')
        } else if (result.error === 'auth/wrong-password') {
          setGeneralError('Incorrect password')
        } else {
          setGeneralError('Unable to create user credentials. Please contact Visitable support.')
        }
      }
    }
  }

  const emailErrorStyles = classNames({
    'text-red-600': true,
    'mt-1': true,
    'mb-2': true,
    'text-s': true,
    hidden: emailError === null,
  })

  const passwordErrorStyles = classNames({
    'text-red-600': true,
    'mt-1': true,
    'mb-2': true,
    'text-s': true,
    hidden: passwordError === null,
  })

  const generalErrorStyles = classNames({
    'text-red-600': true,
    'mt-1': true,
    'mb-2': true,
    'text-s': true,
    hidden: generalError === null,
  })

  return (
    <VisitorLayout>
      <div className="w-full">
        <div className="flex justify-center">
          <div className={loginStyles.loginCardAndImage}>
            <div className={loginStyles.loginCard}>
              <h2 style={{ fontSize: 'xx-large' }}>
                {forgot ? 'Reset Password' : 'Log in to Visitable'}
              </h2>
              <input
                className='h-10 w-full p-3 mt-3 bg-white rounded'
                name='user-email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={'Email'}
              />
              <div className={emailErrorStyles}>{emailError ?? ''}</div>
              {!forgot && (
                <input
                  className='h-10 w-full p-3 mt-3 bg-white rounded'
                  name='user-password'
                  type={'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={'Password'}
                />
              )}
              <div className={passwordErrorStyles}>{passwordError ?? ''}</div>
              <div style={{ width: '100%' }} className='mt-3 px-1 flex justify-between items-center'>
                {!forgot && (
                  <div>
                    <input
                      title="input"
                      type='checkbox'
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <p className='ml-2 inline text-sm'>Remember me</p>
                  </div>
                )}
                <button
                  className='inline text-blue-500 hover:underline text-sm'
                  onClick={() => {
                    setForgot(!forgot)
                    setEmailError(null)
                    setPasswordError(null)
                    setGeneralError(null)
                  }}
                >
                  {!forgot ? 'Forgot password?' : 'Login'}
                </button>
              </div>
              <div className={generalErrorStyles}>{generalError ?? ''}</div>
              <button
                className='h-10 mt-4 w-full shadow text-sm text-stress font-bold
              text-center bg-white hover:bg-purple-900 hover:text-white rounded-full'
                onClick={!forgot ? handleLogin : handleForgot}
                disabled={loading}
              >
                {!forgot ? 'Log In' : 'Send Email'}
              </button>
              <div className='mt-4'>
                {"Don't have an account? "}
                <Link href='/signup'>
                  <button className='inline text-blue-500 hover:underline'>
                    Create a new account.
                  </button>
                </Link>
              </div>
            </div>
            <div className={loginStyles.loginImageAndTextContainer}>
              <div
                className={loginStyles.loginImage}
                style={{
                  backgroundImage: `url(/Office-space-pic.jpeg)`,
                }}
              />
              <div className={loginStyles.loginImageText}></div>
            </div>
          </div>
        </div>
      </div>
    </VisitorLayout>
  )
}
