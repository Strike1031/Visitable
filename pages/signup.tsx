import { VisitorLayout } from 'components/VisitorLayout'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AccessibilityNeeds } from '../types/access-details'
import { AuthUtils } from 'lib/AuthUtils'
import loginStyles from 'styles/LoginSignup.module.css'
import { colors } from '@material-ui/core'
import classNames from 'classnames'

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [terms, setTerms] = useState<boolean>(false)
  const [termsError, setTermsError] = useState<string | null>(null)
  const [generalError, setGeneralError] = useState<string | null>(null)

  const [loading, setLoading] = useState<boolean>(false)

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
      const result = await AuthUtils.signup(email, password, 'guest')

      if (result.error === undefined) {
        router.push({
          pathname: '/create-user-account',
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

  const emailErrorStyles = classNames({
    'text-red-600': true,
    'mt-1': true,
    'mb-2': true,
    'text-s': true,
    'hidden': emailError === null,
  })

  const passwordErrorStyles = classNames({
    'text-red-600': true,
    'mt-1': true,
    'mb-2': true,
    'text-s': true,
    'hidden': passwordError === null,
  })

  const termsErrorStyles = classNames({
    'text-red-600': true,
    'mt-1': true,
    'mb-2': true,
    'text-s': true,
    'hidden': termsError === null,
  })

  const generalErrorStyles = classNames({
    'text-red-600': true,
    'mt-1': true,
    'mb-2': true,
    'text-s': true,
    'hidden': generalError === null,
  })

  return (
    <VisitorLayout>
      <div className="w-full">
        <div className="flex justify-center">
          <div className={loginStyles.loginCardAndImage}>
            <div className={loginStyles.loginCard}>
              <h2 style={{ fontSize: 'xx-large' }}>Create your Visitable account</h2>
              <input
                className="h-10 w-full p-3 mt-3 bg-white rounded"
                name="user-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={'Email'}
              />
              <div className={emailErrorStyles}>{emailError ?? ''}</div>
              <input
                className="h-10 w-full p-3 mt-3 bg-white rounded"
                name="user-password"
                type={'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={'Password'}
              />
              <input
                className="h-10 w-full p-3 mt-3 bg-white rounded"
                name="user-password-confirm"
                type={'password'}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder={'Confirm Password'}
              />
              <div className={passwordErrorStyles}>{passwordError ?? ''}</div>
              <div className="mt-3">
                <input
                  type="checkbox"
                  id="agree-to-terms"
                  checked={terms}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTerms(e.target.checked)}
                />
                <label className="ml-2" htmlFor="agree-to-terms">
                  {"I agree to Visitable "}
                </label>
                <a target="_blank" href="/info/terms-of-use">
                  Terms of Use
                </a>
              </div>
              <div className={termsErrorStyles}>{termsError ?? ''}</div>
              <button
                className="h-10 mt-4 w-full shadow text-sm text-stress font-bold
                text-center bg-white hover:bg-purple-900 hover:text-white rounded-full"
                onClick={handleSignupInit}
                disabled={loading}
              >
                Create Account
              </button>
              <div className={generalErrorStyles}>{generalError ?? ''}</div>
              <div className="mt-4">
                {'Already have an account? '}
                <Link href="/login">
                  <a>Log in.</a>
                </Link>
              </div>
            </div>
            <div className={loginStyles.loginImageAndTextContainer}>
              <div
                className={loginStyles.loginImage}
                style={{
                  backgroundImage: `url(/start-up-desk.jpeg)`,
                }}
              />
              <div className={loginStyles.loginImageText}>A smarter way of searching.</div>
            </div>
          </div>
        </div>
      </div>
    </VisitorLayout>
  )
}
