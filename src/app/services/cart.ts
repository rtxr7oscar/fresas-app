import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Usamos 'signals' para que la página se actualice sola cuando cambie el carrito
  cartItems = signal<CartItem[]>([]);
  
  // El número de WhatsApp del negocio en Xalapa (Cámbialo por el real)
  private businessPhone = '522281883438'; 

  // Función para agregar un vaso al carrito
  addToCart(item: CartItem) {
    this.cartItems.update(prev => [...prev, item]);
  }

  // Función para calcular el gran total de toda la orden
  getTotal() {
    return this.cartItems().reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  }

  // El "Gran Final": Generar el mensaje y abrir WhatsApp
  sendOrder() {
    const items = this.cartItems();
    if (items.length === 0) return;

    let message = `🍓 *¡Hola! Nuevo pedido de Fresas Xalapa:*\n\n`;

    items.forEach((item, index) => {
      message += `*Vaso ${index + 1}: ${item.productType} (${item.size?.name})*\n`;
      message += `  - Base: ${item.base?.name}\n`;
      
      if (item.freeToppings.length > 0) {
        message += `  - Toppings: ${item.freeToppings.map(t => t.name).join(', ')}\n`;
      }
      
      if (item.premiumToppings.length > 0) {
        message += `  - Extras: ${item.premiumToppings.map(t => t.name).join(', ')}\n`;
      }
      
      message += `  *Subtotal:* $${item.unitPrice * item.quantity}\n\n`;
    });

    message += `💰 *TOTAL A PAGAR: $${this.getTotal()}*`;

    // Codificamos el texto para que sea un link válido
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${this.businessPhone}?text=${encodedMessage}`;

    // Abrimos WhatsApp en una pestaña nueva
    window.open(whatsappUrl, '_blank');
  }
}