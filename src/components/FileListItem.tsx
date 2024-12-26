import { UploadFile } from 'antd'
import FileSizeHelper from '../helpers/FileSizeHelper'
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import FileNameFormatter from '../helpers/FileNameFormatter';

type FileListItemProps = {
    file: UploadFile<any>,
    newSize: number,
    deleteFile: Function
}

export const FileListItem = ({ file, newSize, deleteFile }: FileListItemProps) => {
  return (
    <div className='file-upload-list-item'>
        <div className='details'>
            <img className='file-thumb' src={file.thumbUrl} />
            <p className='file-name'>{FileNameFormatter.format(file.name)}</p>
            <p className='file-size'>({FileSizeHelper.formatBytes(file.size ?? 0)} <FaLongArrowAltRight /> ~{FileSizeHelper.formatBytes(newSize, 0)})</p>
        </div>
        <div className='actions'>
            <FaRegTrashCan className='delete' onClick={() => deleteFile(file)} />
        </div>
    </div>
  )
}
