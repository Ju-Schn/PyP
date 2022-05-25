import styled from 'styled-components'
import { useEffect, useState } from 'react'

import getImages from '../api'

import StyledButton from '../components/StyledButton'
import { ReactComponent as MoreIcon } from './svg/more.svg'
import { ReactComponent as SynchroIcon } from './svg/synchronize.svg'

export default function Gallery() {
  const [imageList, setImageList] = useState([])
  const [nextCursor, setNextCursor] = useState(null)

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
      <GalleryWrapper>
        <StyledButton onClick={synchronizeData} variant="fullWidth">
          <SynchroIcon aria-hidden="true" /> synchronize
        </StyledButton>

        <GridContainer>
          {imageList.map(image => (
            <img key={image.asset_id} src={image.url} alt={image.publicId} />
          ))}
        </GridContainer>
        {nextCursor && (
          <StyledButton onClick={handleLoadMoreButtonClick} variant="center">
            <MoreIcon aria-hidden="true" /> Load More
          </StyledButton>
        )}
      </GalleryWrapper>
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

const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
