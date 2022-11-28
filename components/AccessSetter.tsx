import styles from 'styles/AccessibilityPrefs.module.css'
import AccessibilityCheckbox from './user-account/AccessibilityCheckbox'
import { accessDetails } from 'types/access-details'
import { AccessFormType } from 'types/access-type'
import { v4 as uuidv4 } from 'uuid'
import { AccountType } from 'types/account-type'
import { AccessOptionType } from 'types/access-type'

type propTypes = {
  accessSelections: AccessFormType
  setAccessSelections: (changedAccessSelections: AccessFormType) => void
  disabled: boolean
  accountType?: AccountType
}

const renderDetailsFormat = (
  idx: string | number,
  accountType: AccountType | undefined,
): string => {
  if (accountType === undefined) {
    return accessDetails[idx]['display']
  } else if (accountType === 'guest') {
    return accessDetails[idx]['queryGuest']
  } else if (accountType === 'business') {
    return accessDetails[idx]['queryBusiness']
  } else {
    // This should never happen
    return 'Unknown accessibility feature'
  }
}

export default function AccessSetter(props: propTypes) {
  return (
    <>
      <div className={styles.userAccessibilitiesSectionContainer}>
        <div className={styles.userAccessibilitiesSectionHeading}></div>
        {Object.entries(accessDetails).map(([key, details]) => (
          <AccessibilityCheckbox
            key={uuidv4()}
            checked={props.accessSelections[key]}
            handleChange={() =>
              props.setAccessSelections({
                ...props.accessSelections,
                [key]: !props.accessSelections[key],
              })
            }
            editStatus={!props.disabled}
          >
            {renderDetailsFormat(key, props.accountType)}
          </AccessibilityCheckbox>
        ))}
        {/* <AccessibilityCheckbox
          checked={optionA}
          handleChange={() => setOptionA(!optionA)}
          editStatus={!disabled}
        >
          {props.accessSelections['0']['queryGuest']}
        </AccessibilityCheckbox>

        <AccessibilityCheckbox
          checked={optionB}
          handleChange={() => setOptionB(!optionB)}
          editStatus={!disabled}
        >
          {props.accessSelections['1']['queryGuest']}
        </AccessibilityCheckbox>

        <AccessibilityCheckbox
          checked={optionC}
          handleChange={() => setOptionC(!optionC)}
          editStatus={!disabled}
        >
          {props.accessSelections['2']['queryGuest']}
        </AccessibilityCheckbox>

        <AccessibilityCheckbox
          checked={optionD}
          handleChange={() => setOptionD(!optionD)}
          editStatus={!disabled}
        >
          {props.accessSelections['3']['queryGuest']}
        </AccessibilityCheckbox>

        <AccessibilityCheckbox
          checked={optionE}
          handleChange={() => setOptionE(!optionE)}
          editStatus={!disabled}
        >
          {props.accessSelections['4']['queryGuest']}
        </AccessibilityCheckbox>

        <AccessibilityCheckbox
          checked={optionF}
          handleChange={() => setOptionF(!optionF)}
          editStatus={!disabled}
        >
          {props.accessSelections['5']['queryGuest']}
        </AccessibilityCheckbox> */}
      </div>
    </>
  )
}
