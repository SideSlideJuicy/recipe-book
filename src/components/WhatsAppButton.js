import React from 'react';

const WhatsAppButton = ({ ingredients }) => {
  const handleWhatsAppClick = () => {
    // Construct the WhatsApp message with ingredients
    // const message = `Check out this recipe!\n\nIngredients:\n${ingredients}`;
    const message = `${ingredients}`;

    // Create a link to open WhatsApp with the pre-filled message
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappLink, '_blank');
  };

  return (
    <button className="whatsapp-button" onClick={handleWhatsAppClick}>
      {/* Optional WhatsApp icon or text here */}
      WhatsApp
    </button>
  );
};

export default WhatsAppButton;
