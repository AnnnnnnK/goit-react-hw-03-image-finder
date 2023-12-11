import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images }) => {
  return (
    <ul>
      {images.map(image => {
        <ImageGalleryItem image={image}></ImageGalleryItem>;
      })}
    </ul>
  );
};

export default ImageGallery;
