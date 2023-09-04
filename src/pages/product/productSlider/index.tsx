import { useState } from 'react';
import ReactModal from 'react-modal';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './productSlider.scss';

import Slider from '../../../features/slider/slider';
import ModalSlider from '../modalSlider';
import { CrossIcon } from '../../../app/layouts/images';

const CustomPaging = (links: string[]) => {
  return function Custom(i: number): JSX.Element {
    return <img src={links[i]} alt="img" className="custom-pagination" />;
  };
};

function ProductSlider({ linksArr }: { linksArr: string[] }): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const openModal: () => void = () => {
    setIsOpen(true);
  };

  const closeModal: () => void = () => {
    setIsOpen(false);
  };
  function modal(): JSX.Element {
    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel=""
        style={{
          overlay: {
            position: 'fixed',
            inset: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            cursor: 'pointer',
          },
          content: {
            position: 'absolute',
            inset: '0%',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '30px 10px',
            margin: 'auto',
            width: '80%',
            height: '80%',
            cursor: 'default',
          },
        }}
      >
        <button type="button" onClick={closeModal} className="buttonCloseModal">
          <CrossIcon />
        </button>
        <ModalSlider linksArr={linksArr} />
      </ReactModal>
    );
  }

  const settings = {
    customPaging: CustomPaging(linksArr),
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="productSliderContainer">
      <Slider
        settings={settings}
        slides={linksArr.map((item: string) => {
          return (
            <button type="button" onClick={openModal} className="custom-slide" key={item}>
              <img src={item} alt="img" />
            </button>
          );
        })}
        modal={modal()}
      />
    </div>
  );
}

export default ProductSlider;
