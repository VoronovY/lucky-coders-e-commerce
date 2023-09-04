import Slider from 'react-slick';

function MySlider({
  customPaging,
  slides,
}: {
  customPaging?: (index: number) => JSX.Element;
  slides: JSX.Element[];
}): JSX.Element {
  const settings = {
    customPaging,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider">
      <Slider {...settings}> {...slides}</Slider>
    </div>
  );
}

export default MySlider;
