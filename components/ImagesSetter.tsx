import DeleteIcon from '@material-ui/icons/Delete'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import { TextField } from '@material-ui/core'
import { FileInfoType } from 'types/file-info-type'

type PropTypes = {
  filesInfo: FileInfoType[]
  setFilesInfo: (fileInfo: FileInfoType[]) => void
  disabled: boolean
}

export default function ImagesSetter(props: PropTypes) {
  return (
    <div className="flex flex-col items-center w-full">
      {props.filesInfo.map((fileInfo, idx) => {
        return (
          <div key={idx} className="mt-10 flex flex-col w-full max-w-2xl">
            <div style={{ maxHeight: '800px' }}>
              <img src={URL.createObjectURL(fileInfo.fileObj)} alt={`Uploaded image ${idx}`} />
            </div>
            <div className="mt-4 flex flex-wrap">
              <div style={{ flex: '1 0 5rem' }}>{'File name'}</div>
              <div style={{ flex: '1 0 26rem', color: '#696969' }}>{fileInfo.fileObj.name}</div>
            </div>
            <div className="mt-4 flex flex-wrap">
              <div style={{ flex: '1 0 5rem' }}>{'Title'}</div>
              <div style={{ flex: '1 0 26rem' }}>
                <TextField
                  defaultValue={fileInfo.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let newFilesInfo = [...props.filesInfo]
                    newFilesInfo[idx] = { ...props.filesInfo[idx], title: e.target.value }
                    props.setFilesInfo(newFilesInfo)
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled={props.disabled}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap">
              <div style={{ flex: '1 0 5rem' }}>{'Description'}</div>
              <div style={{ flex: '1 0 26rem' }}>
                <TextField
                  defaultValue={fileInfo.desc}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let newFilesInfo = [...props.filesInfo]
                    newFilesInfo[idx] = { ...props.filesInfo[idx], desc: e.target.value }
                    props.setFilesInfo(newFilesInfo)
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled={props.disabled}
                  multiline={true}
                  rows={3} // Only displays multiple rows when multiline is true
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap justify-end">
              <div>
                <input
                  id={`file-${idx}-change-button`}
                  style={{ display: 'none' }}
                  accept="image/*"
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                      let newFilesInfo = [...props.filesInfo]
                      newFilesInfo[idx] = { ...props.filesInfo[idx], fileObj: e.target.files[0] }
                      props.setFilesInfo(newFilesInfo)
                    }
                  }}
                />
                <label htmlFor={`file-${idx}-change-button`}>
                  <Button
                    variant="contained"
                    color="default"
                    component="span"
                    startIcon={<EditIcon />}
                  >
                    Change image
                  </Button>{' '}
                </label>
              </div>
              <div className="ml-4">
                <Button
                  onClick={() => {
                    let newFilesInfo = [...props.filesInfo]
                    newFilesInfo.splice(idx, 1)
                    props.setFilesInfo(newFilesInfo)
                  }}
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )
      })}
      <div className="mt-10 w-full max-w-2xl">
        <input
          id="file-upload-button"
          style={{ display: 'none' }}
          accept="image/*"
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
              props.setFilesInfo([
                ...props.filesInfo,
                { fileObj: e.target.files[0], title: '', desc: '' },
              ])
            }
          }}
        />
        <div className="ml-4">
          <label htmlFor="file-upload-button">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<CloudUploadIcon />}
              disabled={props.disabled}
            >
              Upload image
            </Button>
          </label>
        </div>
      </div>
    </div>
  )
}
