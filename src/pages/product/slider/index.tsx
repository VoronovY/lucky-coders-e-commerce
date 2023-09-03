import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.scss';

function MySlider({ linksArr }: { linksArr: string[] }): JSX.Element {
  const settings = {
    // eslint-disable-next-line react/no-unstable-nested-components
    customPaging: (i: number): JSX.Element => {
      return <img src={linksArr[i + 1]} alt="img" className="custom-pagination" />;
    },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider">
      <Slider {...settings}>
        {linksArr.map((item: string) => {
          return (
            <div className="custom-slide" key={item}>
              <img src={item} alt="img" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default MySlider;
