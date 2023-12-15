const ImageGalleryItem = ({ image, openModal }) => {
  const { tags, webformatURL, largeImageURL } = image;

  const handleClick = () => {
    openModal(largeImageURL, tags);
  };

  return (
    <li onClick={handleClick}>
      <img src={webformatURL} alt="tags" loading="lazy" />
    </li>
  );
};

export default ImageGalleryItem;
//
