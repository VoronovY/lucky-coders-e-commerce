import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slider.scss';

import Slider from '../../../features/slider/slider';

const CustomPaging = (links: string[]) => {
  return function Custom(i: number): JSX.Element {
    return <img src={links[i]} alt="img" className="custom-pagination" />;
  };
};
function ProductSlider({ linksArr }: { linksArr: string[] }): JSX.Element {
  return (
    <Slider
      customPaging={CustomPaging(linksArr)}
      slides={linksArr.map((item: string) => {
        return <img className="custom-slide" src={item} alt="img" key={item} />;
      })}
    />
  );
}

export default ProductSlider;
