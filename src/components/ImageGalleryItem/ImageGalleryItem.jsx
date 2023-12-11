const ImageGalleryItem = ({ image: id, webformatURL }) => {
  return (
    <li class="gallery-item" key={id}>
      <img src={webformatURL} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
