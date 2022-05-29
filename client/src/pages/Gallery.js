import styled from 'styled-components'
import { useEffect, useState } from 'react'

import { getImages } from '../api'

import StyledButton from '../components/StyledButton'
import { ReactComponent as MoreIcon } from '../svg/more.svg'
import Navigation from '../components/Navigation'
import StyledTitle from '../components/StyledTitle'

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
    <GridContatiner>
      <StyledTitle>PyP - Your Gallery</StyledTitle>
      <GalleryGrid>
        {imageList.map(image => (
          <img key={image.asset_id} src={image.url} alt={image.publicId} />
        ))}
      </GalleryGrid>
      {nextCursor && (
        <StyledButton onClick={handleLoadMoreButtonClick} variant="more">
          <MoreIcon aria-hidden="true" /> Load More
        </StyledButton>
      )}
      <Navigation />
    </GridContatiner>
  )

  async function handleLoadMoreButtonClick() {
    const responseJson = await getImages(nextCursor)
    setImageList(currentImageList => [
      ...currentImageList,
      ...responseJson.resources,
    ])
    setNextCursor(responseJson.next_cursor)
  }
}

const GalleryGrid = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  overflow-y: auto;
  margin: 0 16px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const GridContatiner = styled.div`
  display: grid;
  grid-template-rows: 48px auto 48px 88px;
`
