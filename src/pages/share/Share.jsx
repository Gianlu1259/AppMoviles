import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetProductById } from '../../Services/Fake_Store';
import './Share.css';

const Share = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    sender: '',
    recipient: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    GetProductById(id).then((res) => {
      if (res) {
        setProduct(res);
      }
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.sender) newErrors.sender = 'El correo del emisor es requerido.';
    if (!formData.recipient) newErrors.recipient = 'El correo del destinatario es requerido.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const subject = encodeURIComponent(`¡Mira este producto que encontré!`);
    const body = encodeURIComponent(
      `Hola,\n\nTe comparto este producto:\n\n` +
      `Título: ${product.title}\n` +
      `Precio: $${product.price}\n` +
      `Categoría: ${product.category}\n\n` +
      `${formData.message ? `Mensaje adicional:\n${formData.message}\n\n` : ''}` +
      `¡Espero que te guste!`
    );

    window.location.href = `mailto:${formData.recipient}?subject=${subject}&body=${body}`;
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!product) return <div>Cargando producto...</div>;

  return (
    <section className="share-container">
      <h1 className="share-title">Compartir Producto</h1>
      <form onSubmit={handleSubmit} className="share-form">
        <div className="form-group">
          <label>Producto:</label>
          <input
            type="text"
            value={product.title}
            disabled
            required
            className="share-input"
          />
        </div>

        <div className="form-group">
          <label>Correo emisor:</label>
          <input
            type="email"
            name="sender"
            value={formData.sender}
            onChange={handleChange}
            required
            className="share-input"
          />
          {errors.sender && <p className="error-text">{errors.sender}</p>}
        </div>

        <div className="form-group">
          <label>Correo destinatario:</label>
          <input
            type="email"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            required
            className="share-input"
          />
          {errors.recipient && <p className="error-text">{errors.recipient}</p>}
        </div>

        <div className="form-group">
          <label>Mensaje opcional:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="share-textarea"
          />
        </div>

        <div className="buttons-container">
          <button type="submit" className="btn btn-send">
            Enviar mail
          </button>
          <button type="button" onClick={handleCancel} className="btn btn-cancel">
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
};

export default Share;
