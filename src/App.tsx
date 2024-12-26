import './App.scss'
import './mobile.scss'
import { Header } from './components/Header'
import { Button, Slider, Upload, UploadFile } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/es/upload';
import React from 'react';
import { FileListItem } from './components/FileListItem';
import Compress from './helpers/Compress';
import Downloader from './helpers/Downloader';

const Dragger = Upload.Dragger

function App() {

  const [ files, setFiles ] = React.useState<UploadFile<any>[]>([])
  const [ compressAmount, setCompressAmount ] = React.useState<number>(50)

  const handleUpload = (file: UploadChangeParam<UploadFile<any>>) => {
    
    // console.log(file)
    setFiles([ ...file.fileList ])
  }

  const compressImages = () => {
    files.forEach(async (file) => {
      const compressed = await Compress.compress(file.originFileObj, compressAmount/100)
      console.log("Image compressed: ", compressed)
      Downloader.download(compressed, file.name)
    })
  }

  const deleteFile = (file: any) => {
    console.log("delete", file)
    setFiles((p: any) => p.filter((f: any) => f.uid !== file.uid))
  }

  return (
    <div>
      <Header />
      <main>
        <div className='card'>
          <Dragger
            onChange={handleUpload}
            style={{ width: '100%' }}
            accept='image/*'
            beforeUpload={() => false}
            listType="picture"
            fileList={files}
            itemRender={(_originNode, file, _currFileList) => 
              <FileListItem 
                file={file} 
                newSize={file.size ? Math.ceil(file.size * (compressAmount/100)) : 0} 
                deleteFile={deleteFile}
              />
            }
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p> 
            <p className="ant-upload-hint">Click or drag file to this area to upload</p>
          </Dragger>

          <Slider min={20} max={80} value={compressAmount} onChange={(e) => setCompressAmount(e)} disabled={!files.length}  />
          <Button type='primary' className='compress-btn' onClick={compressImages} disabled={!files.length}>Compress</Button>
        </div>
      </main>
    </div>
  )
}

export default App
