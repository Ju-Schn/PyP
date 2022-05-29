import StyledButton from '../components/StyledButton'
import { ReactComponent as UploadIcon } from '../svg/upload.svg'
import { ReactComponent as ChooseIcon } from '../svg/choose.svg'
import Navigation from '../components/Navigation'
import StyledTitle from '../components/StyledTitle'

import { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

export default function Upload() {
  const [previewSource, setPreviewSource] = useState('')
  const [tagsList, setTagsList] = useState([])

  return (
    <>
      <StyledTitle>PyP - Upload your Pictures</StyledTitle>
      <FlexForm arialabbeledby="form-title" onSubmit={handleSubmitFile}>
        <StyledFileLabel id="form-title" htmlFor="file">
          <ChooseIcon aria-hidden="true" /> Choose a file
        </StyledFileLabel>
        <HiddenInput
          id="file"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileInputChange}
        />
        {previewSource && (
          <FlexWrapper>
            <StyledText>Preview</StyledText>
            <img src={previewSource} alt="chosen" style={{ width: '250px' }} />
          </FlexWrapper>
        )}
        <StyledLabel htmlFor="tags">
          Place up to three tags, devided by comma:
        </StyledLabel>
        <StyledInput
          id="tags"
          type="text"
          name="tags"
          placeholder="e.g. Bali, 2022, Vacation"
          onChange={handleChange}
        />
        <StyledButton variant="submit">
          <UploadIcon aria-hidden="true" /> upload
        </StyledButton>
      </FlexForm>
      <Navigation />
    </>
  )

  function handleChange(event) {
    const rawTags = event.target.value
    const tags = rawTags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length)
    setTagsList(tags)
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
    const form = event.target
    if (!previewSource) return
    uploadImage()
    form.reset()
  }

  function uploadImage() {
    const formData = new FormData()
    formData.append('file', previewSource)
    formData.append('upload_preset', 'rkqvotof')
    formData.append('tags', tagsList)

    axios.post(
      'https://api.cloudinary.com/v1_1/dkti3sjec/image/upload/',
      formData
    )
    setPreviewSource('')
    setTagsList([])
  }
}

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
`

const FlexForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  margin: 16px;
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

const StyledFileLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 30px;
  background-color: #223240;
  color: #93d94e;
  padding: 8px 16px;
  margin-bottom: 16px;
  font-weight: 600;
  cursor: pointer;
`

const StyledInput = styled.input`
  margin: 0 16px 16px 16px;
  padding: 16px;
  border-radius: 30px;
  border: none;
  height: 50px;
  background-color: rgb(34, 50, 64, 0.9);
  color: #93d94e;
  box-shadow: inset 0px -4px 4px rgba(147, 217, 78, 1);
`

const StyledLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
`
