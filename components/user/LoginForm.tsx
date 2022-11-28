/* TODO
1. Forgot Password?
2. Remember me
*/
import { Auth } from 'lib/api'
import { useState } from 'react'
import { ContinueWithGoogle } from './AuthButtons'

export function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [rememberMe, setRememberMe] = useState<boolean>(true)

  const login = async (e: any) => {
    setLoading(true)
    const { errorMessage } = await Auth.login(email, password)
    if (errorMessage === undefined) onSuccess()
    else {
      alert(errorMessage)
      console.log('errorMessage', errorMessage)
    }
    setLoading(false)
  }

  return (
    <>
      <h2 className="text-center text-xl my-1">Log in to Visitable</h2>
      <input
        className="h-10 w-full p-3 mt-3 bg-white rounded"
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="h-10 w-full p-3 mt-3 bg-white rounded"
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="mt-3 px-1 flex justify-between items-center">
        <input
          title="input"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <p className="inline text-sm">Remember me</p>
        <button
          className="inline text-blue-500 text-sm"
          onClick={() => alert('not implemented yet')}
        >
          Forgot password?
        </button>
      </div>
      <button
        title="button"
        className="h-10 mt-3 w-full shadow text-sm text-stress font-bold
        text-center bg-white hover:bg-purple-900 hover:text-white rounded-full"
        onClick={login}
        disabled={loading}
        children="Log In"
      />
      {/* <ContinueWithGoogle onSuccess={onSuccess} /> */}
    </>
  )
}
