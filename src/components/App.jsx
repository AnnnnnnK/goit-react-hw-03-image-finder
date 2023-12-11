import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { getAllImages } from 'api/images';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    images: null,
    g: '',
    page: 1,
  };
  // componentDidUpdate() {
  //   this.getImages();
  //   // this.setState({
  //   //   images,
  //   // });
  // }

  componentDidUpdate(_, prevState) {
    if (this.state.page !== prevState.page || this.state.q !== prevState.q) {
      this.getImages();
    }
  }

  getImages = async () => {
    const response = await getAllImages(this.state.q);

    console.log(response.hits);
    return response.hits;
  };

  onSubmit = e => {
    e.preventDefault();
    const q = e.target.search.value;
    this.setState({
      q,
    });
  };
  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit}></Searchbar>
        {this.state.images && (
          <ImageGallery images={this.state.images}></ImageGallery>
        )}
      </>
    );
  }
}

export default App;
