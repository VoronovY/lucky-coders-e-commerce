import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './modalSlider.scss';

import Slider from '../../../features/slider/slider';

function ModalSlider({ index, linksArr }: { index: number; linksArr: string[] }): JSX.Element {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: index,
  };
  return (
    <div className="modalSliderContainer">
      <Slider
        settings={settings}
        slides={linksArr.map((item: string) => {
          return (
            <div className="custom-slide" key={item}>
              <img src={item} alt="img" />
            </div>
          );
        })}
      />
    </div>
  );
}

export default ModalSlider;
