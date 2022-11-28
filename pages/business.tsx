import { Main } from 'components/business/Main'
import { PricingPlans } from 'components/business/PricingPlans'
import { Description } from 'components/business/Description'
import { Enquiry } from 'components/business/Enquiry'
import styles from 'styles/Business.module.css'
import { VisitorLayout } from 'components/VisitorLayout'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { AuthUtils } from '../lib/AuthUtils'
import loginStyles from 'styles/LoginSignup.module.css'
import classNames from 'classnames'

export default function Page() {
  const router = useRouter()
  // Modal either "login" or "signup"
  const [modal, setModal] = useState<string>('login')
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [terms, setTerms] = useState<boolean>(false)
  const [termsError, setTermsError] = useState<string | null>(null)
  const [generalError, setGeneralError] = useState<string | null>(null)

  const [loading, setLoading] = useState<boolean>(false)

  const [rememberMe, setRememberMe] = useState<boolean>(true)

  const handleLogin = async () => {
    setEmailError(null)
    setPasswordError(null)
    setGeneralError(null)

    setLoading(true)
    const result = await AuthUtils.login(email, password)

    if (result.error === undefined) {
      router.push('/business-account/home')
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

  const handleSignupInit = async () => {
    setEmailError(null)
    setPasswordError(null)
    setTermsError(null)
    setGeneralError(null)
    if (password !== passwordConfirm) {
      setPasswordError('Passwords do not match.')
    } else if (!terms) {
      setTermsError('You must agree to the Visitable Terms of Use to create an account.')
    } else {
      setLoading(true)
      // Context will automatically update localStorage/cookies
      // with userCredential and token from firebase.
      const result = await AuthUtils.signup(email, password, 'business')

      if (result.error === undefined) {
        router.push({
          pathname: '/create-business-account',
          query: {},
        })
      } else {
        if (result.error === 'auth/email-already-in-use') {
          setEmailError('This email already belongs to an account')
        } else if (result.error === 'auth/invalid-email') {
          setEmailError('Invalid email')
        } else if (result.error === 'auth/operation-not-allowed') {
          setEmailError('Operation not allowed. Please contact Visitable support.')
        } else if (result.error === 'auth/weak-password') {
          setPasswordError('Password must be at least six characters')
        } else {
          setGeneralError('Unable to create user credentials. Please contact Visitable support.')
        }
      }
      setLoading(false)
    }
  }
  const [forgot, setForgot] = useState<boolean>(false)
  const handleForgot = async () => {
    setGeneralError('')
    const result = await AuthUtils.forgotPassword(email)
    if (result) {
      if (result.error === undefined) {
        setGeneralError('Email sent!')
      } else {
        if (result.error === 'auth/invalid-email') {
          setGeneralError('Invalid email')
        } else if (result.error === 'auth/user-disabled') {
          setGeneralError('User has been disabled. Please contact Visitable support.')
        } else if (result.error === 'auth/user-not-found') {
          setGeneralError('Account does not exist. Create a new account.')
        } else if (result.error === 'auth/wrong-password') {
          setGeneralError('Incorrect password')
        } else if (result.error === 'auth/unverified-email') {
          setGeneralError('Please verify your email')
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

  const termsErrorStyles = classNames({
    'text-red-600': true,
    'mt-1': true,
    'mb-2': true,
    'text-s': true,
    hidden: termsError === null,
  })

  const generalErrorStyles = classNames({
    'text-red-600': true,
    'mt-1': true,
    'mb-2': true,
    'text-s': true,
    hidden: generalError === null,
  })

  const modalDisplay = (state: string) => {
    if (state == 'signup') {
      return (
        <div className={loginStyles.loginCard}>
          <h2 style={{ fontSize: 'xx-large' }}>Create a Visitable Business Account</h2>
          <input
            className='h-10 w-full p-3 mt-3 bg-white rounded'
            name='user-email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={'Email'}
          />
          <div className={emailErrorStyles}>{emailError ?? ''}</div>
          <input
            className='h-10 w-full p-3 mt-3 bg-white rounded'
            name='user-password'
            type={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={'Password'}
          />
          <input
            className='h-10 w-full p-3 mt-3 bg-white rounded'
            name='user-password-confirm'
            type={'password'}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder={'Confirm Password'}
          />
          <div className={passwordErrorStyles}>{passwordError ?? ''}</div>
          <div className='mt-3'>
            <input
              type='checkbox'
              id='agree-to-terms'
              checked={terms}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTerms(e.target.checked)}
            />
            <label className='ml-2' htmlFor='agree-to-terms'>
              {"I agree to Visitable"}
            </label>
            <a target='_blank' href='/info/terms-of-use'>
              Terms of Use
            </a>
          </div>
          <div className={termsErrorStyles}>{termsError ?? ''}</div>
          <button
            className='h-10 mt-4 w-full shadow text-sm text-stress font-bold
              text-center bg-white hover:bg-purple-900 hover:text-white rounded-full'
            onClick={handleSignupInit}
            disabled={loading}
          >
            Create Account
          </button>
          <div className={generalErrorStyles}>{generalError ?? ''}</div>
          <div className='mt-4'>
            {'Already have an account? '}
            <button
              className='inline text-blue-500 hover:underline'
              onClick={() => setModal('login')}
            >
              Log in.
            </button>
          </div>
        </div>
      )
    } else if (state == 'login') {
      return (
        <div className={loginStyles.loginCard}>
          <h2 style={{ fontSize: 'xx-large' }}>{forgot ? 'Reset Password' : 'Business Log In'}</h2>
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
            <button
              className='inline text-blue-500 hover:underline'
              onClick={() => setModal('signup')}
            >
              Create a new Business account.
            </button>
          </div>
        </div>
      )
    } else {
      return <div>Invalid modal state</div>
    }
  }

  return (
    <VisitorLayout>
      <div className="w-full">
        <div className="flex justify-center">
          <div className={loginStyles.loginCardAndImage}>
            {modalDisplay(modal)}
            <div className={loginStyles.loginImageAndTextContainer}>
              <div
                className={loginStyles.loginImage}
                style={{
                  backgroundImage: `url(/Office-space-pic.jpeg)`,
                }}
                />
              <div className={loginStyles.loginImageText}>Find new talent everyday.</div>
            </div>
          </div>
        </div>
        <Main />
        {/* <PricingPlans /> */}
        <Description />
        <Enquiry />
      </div>
    </VisitorLayout>
  )
}
