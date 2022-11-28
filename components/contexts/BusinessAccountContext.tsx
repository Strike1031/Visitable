import { useAuth } from 'config/auth'
import { getAccountHandler } from 'lib/account-crud'
import { createContext, useContext, useEffect, useState } from 'react'
import { BusinessType } from 'types/business-type'

type BusinessAccountContextType = {
  data: BusinessType | null
  getData: () => void
  loading: boolean
}
export const BusinessAccountContext = createContext<BusinessAccountContextType>({
  data: null,
  getData: async () => {},
  loading: true,
})

export const BusinessAccountProvider = ({ children }: any) => {
  const auth = useAuth()
  const [data, setData] = useState<BusinessType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const getBusinessData = async () => {
    setLoading(true)
    if (!auth.userState) {
      console.log('No firebase user in auth context. Set guest data to null.')
      setData(null)
    } else if (!auth.customClaims?.businessInit) {
      console.log(
        'Firebase user has not initialised business account according \
            to firebase custom claims. Set business data to null.',
      )
      setData(null)
    } else {
      try {
        const accountData = await getAccountHandler(auth.userState.uid)
        console.log(
          `Business data received. Set BusinessAccountProvider data: ${JSON.stringify(
            accountData,
            null,
            1,
          )}`,
        )
        setData(accountData)
      } catch (error) {
        console.log(`An error occurred while attempting to retrieve business data: ${error}`)
        setData(null)
      }
    }
    setLoading(false)
  }

  // Callback is run after first render and on every change to auth.userState
  useEffect(() => {
    getBusinessData()
  }, [auth.userState, auth.customClaims?.businessInit])

  return (
    <BusinessAccountContext.Provider value={{ data, getData: getBusinessData, loading }}>
      {children}
    </BusinessAccountContext.Provider>
  )
}

// To use this context, call useContext React hook
// const businessCx = React.useContext(BusinessAccountContext)
// const businessData = businessCx.data
