import React, { useEffect, useRef } from 'react'
import './Contact.css'
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Contact = () => {

    const mapContainer = useRef(null);

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
    <div class="ContactPage">
  <div class="contact-container">
    <h2 class="contact-title">Contáctanos</h2>
    <p class="contact-description">
      Si tienes preguntas, sugerencias o deseas comunicarte con nosotros, puedes hacerlo a través de los siguientes medios:
    </p>

    <div class="contact-info">
      <p><strong>Correo electrónico:</strong> contacto@ejemplo.com</p>
      <p><strong>Teléfono:</strong> +52 55 1234 5678</p>
      <p><strong>Dirección:</strong> Calle Ficticia 123, Ciudad Universitaria, México</p>
    </div>

    <div className={'Map'} ref={mapContainer}></div>

  </div>
</div>

  )
}

export default Contact