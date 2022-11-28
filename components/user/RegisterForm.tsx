import { Auth } from 'lib/api'
import { useEffect, useState } from 'react'
import { ContinueWithGoogle } from './AuthButtons'

export function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')
  const [policyChecked, setPolicyChecked] = useState<boolean>(true)

  useEffect(() => {
    // TODO: compare confirmation password and label error if applicable
  }, [password, password2])

  const register = async () => {
    setLoading(true)
    const { errorMessage } = await Auth.login(email, password)
    if (errorMessage === undefined){
      onSuccess()
    } else {
      alert(errorMessage)
      console.log(errorMessage)
    }
    setLoading(false)
  }

  return (
    <>
      <h2 className="text-center text-xl my-1">Sign up for Visitable</h2>
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

      <input
        className="h-10 w-full p-3 mt-3 bg-white rounded"
        name="password"
        type="password"
        placeholder="Confirmation"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />

      <div className="mt-3 text-xs text-gray-500">
        <input
        title="input"
          className="mx-1 align-middle"
          type="checkbox"
          checked={policyChecked}
          onChange={(e) => setPolicyChecked(e.target.checked)}
        />
        By signing up, I agree to the Privacy Policy and the Terms of Services.
      </div>
      <button
        className="h-10 mt-3 w-full shadow text-sm text-stress font-bold
        text-center bg-white hover:bg-purple-900 hover:text-white rounded-full"
        onClick={(e) => register()}
        disabled={loading}
      >Sign up</button>
      {/* <ContinueWithGoogle onSuccess={onSuccess} /> */}
    </>
  )
}