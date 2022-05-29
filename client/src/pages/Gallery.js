import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { getImages, getTags } from '../api';

import StyledButton from '../components/StyledButton';
import { ReactComponent as MoreIcon } from '../svg/more.svg';
import Navigation from '../components/Navigation';
import StyledTitle from '../components/StyledTitle';
import ScreenReaderOnly from '../components/ScreenReaderOnly';

export default function Gallery() {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseJson = await getImages();
      setImageList(responseJson.resources);
      setNextCursor(responseJson.next_cursor);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const responseJson = await getTags();
      setAllTags(responseJson.tags);
    };

    fetchData();
  }, []);

  return (
    <GridContatiner>
      <StyledTitle>PyP - Your Gallery</StyledTitle>
      <label htmlFor='tagsFilter'>
        <ScreenReaderOnly>Filter by tag:</ScreenReaderOnly>
      </label>
      <select id='tagsFilter'>
        <option>Choose a tag to filter:</option>
        {allTags?.map(tag => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
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
  );

  async function handleLoadMoreButtonClick() {
    const responseJson = await getImages(nextCursor);
    setImageList(currentImageList => [
      ...currentImageList,
      ...responseJson.resources,
    ]);
    setNextCursor(responseJson.next_cursor);
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
`;

const GridContatiner = styled.div`
  display: grid;
  grid-template-rows: 64px 0 40px auto 48px 88px;
`;
