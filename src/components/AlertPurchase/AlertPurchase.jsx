import React from 'react'
import check_circle from '../../logos/check_circle.svg';
import close_icon from '../../logos/close_icon.svg';
import './AlertPurchase.css'

const AlertPurchase = ({onClose}) => {
    return (
        <div className="popup-overlay">
            <div className="popup">
                <img src={close_icon} alt="" className="Popup-Close" onClick={onClose} />
                <h2>Thanks for your purchase!</h2>
                <img src={check_circle} alt="" className='Icon-PopUp'/>
            </div>
        </div>
    );
};

export default AlertPurchase;