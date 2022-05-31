import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { getImages, getTags, searchImages } from '../api';

import StyledButton from '../components/StyledButton';
import { ReactComponent as MoreIcon } from '../svg/more.svg';
import Navigation from '../components/Navigation';
import StyledTitle from '../components/StyledTitle';
import ScreenReaderOnly from '../components/ScreenReaderOnly';

export default function Gallery() {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

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
      <DropdownWrapper>
        <label htmlFor="tagsFilter">
          <ScreenReaderOnly>Filter by tag:</ScreenReaderOnly>
        </label>
        <StyledDropdown
          onChange={handleChange}
          id="tagsFilter"
          name="tags"
          type="text"
          value={selectedTag}
        >
          <option value="">Choose a tag to filter:</option>
          {allTags?.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </StyledDropdown>
        <StyledButton onClick={handleFilterImages}>filter</StyledButton>
        <StyledButton onClick={handleResetFilter}>reset</StyledButton>
      </DropdownWrapper>
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

  function handleChange(event) {
    event.preventDefault();
    setSelectedTag(event.target.value);
  }

  async function handleFilterImages() {
    const responseJson = await searchImages(selectedTag, nextCursor);
    setImageList(responseJson.resources);
  }

  async function handleResetFilter() {
    const responseJson = await getImages();
    setSelectedTag('');
    setImageList(responseJson.resources);
  }

  async function handleLoadMoreButtonClick() {
    const responseJson = await getImages(nextCursor);
    setImageList(currentImageList => [
      ...currentImageList,
      ...responseJson.resources,
    ]);
    setNextCursor(responseJson.next_cursor);
  }
}

const DropdownWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;

`;

const StyledDropdown = styled.select`
width: 60%;
background-color: #223240;
color: #60BF81;
font-size:100%;
font-weight: 600;
border:none;
border-radius: 30px;
padding: 8px;
`

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
  grid-template-rows: 64px 56px auto 48px 88px;
`;
