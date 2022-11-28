import { Checkbox, Card, CardActionArea, CardContent } from '@material-ui/core'
import styles from 'styles/AccessibilityCheckbox.module.css'

type propTypes = {
  children: string
  checked: boolean
  handleChange: () => void
  editStatus: boolean
}

function AccessibilityCheckbox(props: propTypes) {
  return (
    <Card className={styles.disabilityItemCard}>
      <CardActionArea onClick={props.handleChange} disabled={!props.editStatus}>
        <CardContent className={styles.disabilityItemContent}>
          <div className='sm:px-6'>
            <Checkbox
              checked={props.checked}
              onChange={props.handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
              disabled={!props.editStatus}
            />
          </div>
          <div className='pl-4 sm:px-8 text-center sm:text-left'>{props.children}</div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default AccessibilityCheckbox
