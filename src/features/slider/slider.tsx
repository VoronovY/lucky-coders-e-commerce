import Slider from 'react-slick';

function MySlider({
  settings,
  slides,
  modal,
}: {
  customPaging?: (index: number) => JSX.Element;
  settings: {
    customPaging?: (i: number) => JSX.Element;
    dots?: boolean;
    arrows?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    initialSlide?: number;
  };
  slides: JSX.Element[];
  modal?: JSX.Element;
}): JSX.Element {
  return (
    <div className="slider">
      <Slider {...settings}> {...slides}</Slider>
      {modal}
    </div>
  );
}

export default MySlider;
