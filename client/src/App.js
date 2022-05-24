import { useEffect, useState } from 'react'
import styled from 'styled-components'
import getImages from './api'

function App() {
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

  async function handleLoadMoreButtonClick() {
    const responseJson = await getImages(nextCursor);
    setImageList(currentImageList => [
      ...currentImageList,
      ...responseJson.resources,
    ])
    setNextCursor(responseJson.next_cursor)
  }

  return (
    <>
      <GridContainer>
        {imageList.map(image => (
          <img key={image.asset_id} src={image.url} alt={image.publicId} />
        ))}
      </GridContainer>
      <div>
        {nextCursor && (
          <button onClick={handleLoadMoreButtonClick}>Load More</button>
        )}
      </div>
    </>
  )
}

const GridContainer = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default App
