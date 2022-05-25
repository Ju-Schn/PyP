import StyledButton from './components/StyledButton'
import { ReactComponent as UploadIcon } from './svg/upload.svg'
import { ReactComponent as ChooseIcon } from './svg/choose.svg'

import { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

export default function Upload() {
  const [previewSource, setPreviewSource] = useState('')

  return (
    <>
      <StyledTitle>PyP - Post your Pictures</StyledTitle>
      <FlexContainer arialabbeledby="form-title" onSubmit={handleSubmitFile}>
        <StyledLabel id="form-title" htmlFor="file">
          <ChooseIcon aria-hidden="true" /> Choose a file
        </StyledLabel>
        <HiddenInput
          id="file"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileInputChange}
        />
        <StyledButton variant="submit">
          <UploadIcon aria-hidden="true" /> upload
        </StyledButton>
      </FlexContainer>
      {previewSource && (
        <FlexWrapper>
          <StyledText>Preview</StyledText>
          <img src={previewSource} alt="chosen" style={{ width: '250px' }} />
        </FlexWrapper>
      )}
    </>
  )

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
    setPreviewSource('')
  }
}

const StyledTitle = styled.h1`
  margin-bottom: 16px;
  text-align: center;
`

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
`

const FlexContainer = styled.form`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
`

const StyledText = styled.span`
  font-weight: 600;
  font-size: 24px;
`

const HiddenInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 30px;
  background-color: #223240;
  color: #93d94e;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
`
