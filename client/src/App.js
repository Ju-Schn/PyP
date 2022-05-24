import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import getImages from './api'
import StyledButton from './components/StyledButton'

function App() {
  const [imageList, setImageList] = useState([])
  const [nextCursor, setNextCursor] = useState(null)
  const [previewSource, setPreviewSource] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const responseJson = await getImages()
      setImageList(responseJson.resources)
      setNextCursor(responseJson.next_cursor)
    }

    fetchData()
  }, [])

  return (
    <>
      <div>
        <form onSubmit={handleSubmitFile}>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileInputChange}
          />
          <StyledButton>upload</StyledButton>
        </form>
      </div>
      {previewSource && (
        <>
          <span>Preview</span>
          <img
            src={previewSource}
            alt="chosen"
            style={{ height: '300px', display: 'block' }}
          />
        </>
      )}
      <StyledButton onClick={synchronizeData}>synchronize</StyledButton>
      <GridContainer>
        {imageList.map(image => (
          <img key={image.asset_id} src={image.url} alt={image.publicId} />
        ))}
      </GridContainer>
      <div>
        {nextCursor && (
          <StyledButton onClick={handleLoadMoreButtonClick}>
            Load More
          </StyledButton>
        )}
      </div>
    </>
  )

  async function handleLoadMoreButtonClick() {
    const responseJson = await getImages(nextCursor)
    setImageList(currentImageList => [
      ...currentImageList,
      ...responseJson.resources,
    ])
    setNextCursor(responseJson.next_cursor)
  }

  function handleFileInputChange(event) {
    const file = event.target.files[0]
    previewFile(file)
  }

  function previewFile(file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  function handleSubmitFile(event) {
    event.preventDefault()
    if (!previewSource) return
    uploadImage()
  }

  function uploadImage() {
    console.log(previewSource)
    const formData = new FormData()
    formData.append('file', previewSource)
    formData.append('upload_preset', 'rkqvotof')

    axios.post(
      'https://api.cloudinary.com/v1_1/dkti3sjec/image/upload/',
      formData
    )
  }

  function synchronizeData() {
    window.location.reload()
  }
}

const GridContainer = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default App
