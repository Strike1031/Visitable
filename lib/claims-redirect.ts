import firebase from 'firebase/app'
import { NextRouter } from 'next/router'
import { customClaimsType } from 'types/custom-claims-type'

// Redirect user to appropriate page according to custom claims.
export default async function claimsRedirect(
  router: NextRouter,
  customClaims: customClaimsType | null,
  intendedPath: string,
) {
  if (customClaims !== null) {
    if (customClaims.guest && customClaims.business) {
      // If this user has both a guest and business account signed up:
      if (customClaims.guestInit && customClaims.businessInit) {
        // If this user has both a guest and business account initialised:
        router.push(intendedPath ?? '/user-account/home')
      } else if (customClaims.guestInit) {
        // If this user has only a guest account initialised:
        if (intendedPath.includes('user-account')) {
        } else {
          router.push('/user-account/home')
        }
      } else if (customClaims.businessInit) {
        // If this user has only a business account initialised:
        if (intendedPath.includes('business-account')) {
        } else {
          router.push('/business-account/home')
        }
      } else {
        // Else this user has neither a guest nor business account initialised:
        router.push('/')
      }
    } else if (customClaims.guest) {
      // If this user has only a guest account signed up:
      if (customClaims.guestInit) {
        // If this guest account has already been initialised:
        if (intendedPath.includes('user-account')) {
        } else {
          router.push('/user-account/home')
        }
      } else {
        // Else this guest account has not yet been initialised:
        router.push('/create-user-account')
      }
    } else if (customClaims.business) {
      // If this user has only a business account signed up:
      if (customClaims.businessInit) {
        // If business data has already been initialised:
        if (intendedPath.includes('business-account')) {
        } else {
          router.push('/business-account/home')
        }
      } else {
        // If business data not yet been initialised:
        router.push('/create-business-account')
      }
    } else {
      // Else this user has neither a guest nor business account signed up.
    }
  }
}
