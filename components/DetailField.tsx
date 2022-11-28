import { TextField } from '@material-ui/core'
import styles from '../styles/DetailField.module.css'

type propTypes = {
  fieldLabel: string
  fieldValue: string | number
  editStatus: boolean
  multiline?: boolean
  handleChange: (event: any) => void
}
function DetailField(props: propTypes) {
  return (
    <div className={styles.fieldContainer}>
      <div className={styles.fieldLabel}>{props.fieldLabel}</div>
      <div className={styles.fieldValue}>
          <TextField
            id="first-name"
            defaultValue={props.fieldValue}
            onChange={props.handleChange}
            variant="outlined"
            size="small"
            fullWidth
            disabled={!props.editStatus}
            multiline={props.multiline ?? false}
            rows={3} // Only displays multiple rows when multiline is true
          />
      </div>
    </div>
  )
}

export default DetailField
