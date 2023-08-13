import styles from './AboutStore.module.scss';

import StoreImg from '../../../../../public/assets/store.png';

function AboutStore(): JSX.Element {
  return (
    <div className={styles.aboutStoreContainer}>
      <h2>About &quot;Stones Fall&quot; Store</h2>
      <div className={styles.aboutStoreContent}>
        <div className={styles.aboutStoreText}>
          <p>
            &quot;Stones Fall&quot; is a store where you can purchase a wide variety of gemstones, faceted stones,
            beads, crystals, pebbles, and other stone products.
          </p>
          <p>
            Our store offers a diverse range of stones in different shapes, colors, and sizes. You will find precious
            and semi-precious gemstones, natural and lab-created stones, cut and uncut specimens. &quot;Stones
            Fall&quot; provides stones for collecting, creating jewelry, using in meditation and rituals, as well as for
            decorative and esoteric purposes.
          </p>
          <p>
            &quot;Stones Fall&quot; is not just a gem store, but also a place where you can gain knowledge about stones
            and their properties. We organize educational seminars, workshops, and consultations with experienced
            specialists to help you better understand and utilize stones in your everyday life.
          </p>
          <p>
            &quot;Stones Fall&quot;, you can explore a delightful selection of stones, learn about their history,
            properties, and ways to incorporate them into your life. We strive to provide a unique experience of
            immersing yourself in the world of stones and their energy.
          </p>
        </div>
        <div className={styles.aboutStoreImg}>
          <img src={StoreImg} alt="Store" />
        </div>
      </div>
    </div>
  );
}

export default AboutStore;
