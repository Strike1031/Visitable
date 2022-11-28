import { RegisterForm } from 'components/user/RegisterForm'
import { LoginForm } from 'components/user/LoginForm'
import { Dialog, Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'

export type AuthType = 'login' | 'signUp'
export type AuthModalProps = {
  open: boolean
  handleClose: () => void
  authType: AuthType
  setAuthType: (authType: AuthType) => void
}

export const AuthModal = ({ open, handleClose, authType, setAuthType }: AuthModalProps) => {
  const paperStyle = { padding: 20, width: 298 }
  return (
    <Dialog open={open} onClose={handleClose}>
      <div style={paperStyle} className="bg-primary">
        {authType === 'login' ? (
          <LoginForm onSuccess={handleClose} />
        ) : (
          <RegisterForm onSuccess={handleClose} />
        )}
        <br />

        <hr className="mt-10" />
        <div className="mt-1 flex justify-evenly">
          {authType === 'login' ? (
            <>
              <div className="inline-block w-1/2">
                <text className="text-sm">Don't have an account?</text>
              </div>
              <button
                className="text-blue-500"
                onClick={() => setAuthType('signUp')}
                children="Sign Up"
              />
            </>
          ) : (
            <>
              <div className="inline-block w-1/2">
                <text className="text-sm">Already have an account?</text>
              </div>
              <button
                className="text-blue-500"
                onClick={() => setAuthType('login')}
                children="Log In"
              />
            </>
          )}
        </div>
      </div>
    </Dialog>
  )
}
