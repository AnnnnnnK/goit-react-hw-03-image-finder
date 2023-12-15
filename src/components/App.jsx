import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { getAllImages } from 'api/images';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class App extends Component {
  state = {
    images: null,
    q: '',
    page: 1,
    perPage: 12,
    loadMore: false,
    isShowModal: false,
    largeImgUrl: null,
    tag: null,
    loader: false,
    allPages: 0,
  };

  componentDidUpdate(_, prevState) {
    if (this.state.page !== prevState.page || this.state.q !== prevState.q) {
      this.getImages();
    }
  }

  getImages = async () => {
    try {
      this.setState({
        loader: true,
      });

      const response = await getAllImages(this.state.q, this.state.page);
      const { totalHits, hits } = response;
      const allPages = Math.floor(totalHits / this.state.perPage);
      if (totalHits === 0) {
        Notify.info(`There is no such images like ${this.state.q}`);
        this.setState({
          loadMore: false,
        });
      }

      const newImages = hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        })
      );
      console.log(newImages);

      this.setState(prevState => ({
        images: prevState.images
          ? [...prevState.images, ...newImages]
          : newImages,
        loadMore: true,
      }));
    } catch {
      console.log('error');
    } finally {
      this.setState({
        loader: false,
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const q = e.target.search.value;
    if (q === '') {
      Notify.warning('Please enter your request');
      return;
    }
    this.setState({
      q,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  hideModal = () => {
    this.setState(() => ({
      isShowModal: false,
    }));
  };

  openModal = (largeImgUrl, tag) => {
    this.setState({ isShowModal: true, largeImgUrl, tag });
  };

  render() {
    const allPagesLoaded = this.state.page >= this.state.allPages;

    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.loader && <Loader />}
        {this.state.images && (
          <ImageGallery images={this.state.images} openModal={this.openModal} />
        )}
        {this.state.loadMore && !allPagesLoaded && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {this.state.isShowModal && (
          <Modal
            hideModal={this.hideModal}
            largeImgUrl={this.state.largeImgUrl}
            tag={this.state.tag}
          />
        )}
      </>
    );
  }
}

export default App;
