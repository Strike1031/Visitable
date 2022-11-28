import { Auth } from 'lib/api'
export function ContinueWithGoogle({ onSuccess }: { onSuccess: () => void }) {
  const login = async (e: any) => {
    const { errorMessage } = await Auth.authWithGoogle()
    if (errorMessage === undefined) onSuccess()
    else {
      alert(errorMessage)
      console.log('errorMessage', errorMessage)
    }
  }
  return (
    <button
      className="h-10 mt-3 w-full shadow text-sm text-stress font-bold
        text-center bg-white hover:bg-purple-900 hover:text-white rounded-full"
      onClick={login}
    >
      <img
        alt="banner"
        className="inline-block h-6 mr-2"
        src="https://img.icons8.com/color/48/000000/google-logo.png"
      />
      <text>Continue With Google</text>
    </button>
  )
}
