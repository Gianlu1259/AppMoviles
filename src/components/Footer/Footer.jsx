import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './Footer.module.css';
import Modal from '../Modal';
import Contact from '../contact/Contact';


const Footer = () => {
    const mapContainer = useRef(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            center: [-57.95, -34.933333],
            zoom: 13
        });

        new maplibregl.Marker()
            .setLngLat([-57.95, -34.933333])
            .addTo(map);

        return () => map.remove();
    }, []);

    return (
      <footer id='footer' className={styles['Footer']}>
        <div id='footer-links' className={styles['Footer-Links']}>
          <button onClick={() => setShowModal(true)}>Contacto</button>
        </div>
        <div className={styles['Map']} ref={mapContainer}></div>

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <Contact />
          </Modal>
        )}
      </footer>
    );
};

export default Footer;
