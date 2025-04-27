import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './Footer.module.css';

const Footer = () => {

    const mapContainer = useRef(null);

    useEffect(() => {
        const map = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        center: [-58.3816, -34.6037],
        zoom: 13
        });

        new maplibregl.Marker()
        .setLngLat([-58.3816, -34.6037])
        .addTo(map);

        return () => map.remove();
    }, []);

    return (
      <footer id='footer' className={styles['Footer']}>
        <div id='footer-links' className={styles['Footer-Links']}>
          <a href='/about'>Sobre nosotros</a>
          <a href='/contact'>Contacto</a>
        </div>
        <div className={styles['Map']} ref={mapContainer}>
        </div>
      </footer>
    )
}

export default Footer;