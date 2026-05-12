import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart';
import { ItemOption, CartItem } from '../../models/product';

@Component({
  selector: 'app-order',
  imports: [],
  templateUrl: './order.html',
  styleUrl: './order.scss'
})
export class OrderComponent {
  // Conectamos con nuestro cerebro del carrito
  cartService = inject(CartService);

  // ==========================================
  // 1. LOS DATOS DEL MENÚ (Según tu imagen)
  // ==========================================
  sizes: ItemOption[] = [
    { name: 'Fresas Chicas', price: 65 },
    { name: 'Fresas Grandes', price: 85 },
    { name: 'Fresas Jumbo', price: 195 }
  ];

  bases: ItemOption[] = [
    { name: 'Sin Base', price: 0 },
    { name: 'Nutella', price: 0 },
    { name: 'Lechera', price: 0 },
    { name: 'Cajeta', price: 0 },
    { name: 'Lotus', price: 15 } // Esta cobra $15 extra
  ];

  freeToppingsList: ItemOption[] = [
    { name: 'Chispas de chocolate', price: 0 },
    { name: 'Nuez', price: 0 },
    { name: 'Granola', price: 0 },
    { name: 'Lunetas', price: 0 },
    { name: 'Panditas', price: 0 },
    { name: 'Bombones', price: 0 }
  ];

  premiumToppingsList: ItemOption[] = [
    { name: 'Galleta Oreo', price: 10 },
    { name: 'Mazapán', price: 10 },
    { name: 'Gansito', price: 15 },
    { name: 'Kinder', price: 20 },
    { name: 'Queso de bola', price: 15 }
  ];

  // ==========================================
  // 2. LO QUE EL CLIENTE ESTÁ ELIGIENDO AHORITA
  // ==========================================
  selectedSize: ItemOption | undefined;
  selectedBase: ItemOption | undefined;
  selectedFreeToppings: ItemOption[] = [];
  selectedPremiumToppings: ItemOption[] = [];

  // ==========================================
  // 3. LÓGICA DE LOS BOTONES
  // ==========================================
  selectSize(size: ItemOption) { this.selectedSize = size; }
  
  selectBase(base: ItemOption) { this.selectedBase = base; }

  toggleFreeTopping(topping: ItemOption) {
    const index = this.selectedFreeToppings.indexOf(topping);
    if (index > -1) {
      this.selectedFreeToppings.splice(index, 1); // Si ya estaba, lo quita
    } else if (this.selectedFreeToppings.length < 3) {
      this.selectedFreeToppings.push(topping); // Si hay menos de 3, lo agrega
    } else {
      alert('Solo puedes elegir hasta 3 toppings de barra.'); // Límite de tu menú
    }
  }

  togglePremiumTopping(topping: ItemOption) {
    const index = this.selectedPremiumToppings.indexOf(topping);
    if (index > -1) {
      this.selectedPremiumToppings.splice(index, 1);
    } else {
      this.selectedPremiumToppings.push(topping);
    }
  }

  // ==========================================
  // 4. CALCULAR Y ENVIAR
  // ==========================================
  getCurrentUnitPrice(): number {
    let total = 0;
    if (this.selectedSize) total += this.selectedSize.price;
    if (this.selectedBase) total += this.selectedBase.price;
    this.selectedPremiumToppings.forEach(t => total += t.price);
    return total;
  }

  addCurrentItemToCart() {
    // Validamos que mínimo haya elegido el tamaño y la base
    if (!this.selectedSize || !this.selectedBase) {
      alert('Por favor, selecciona un tamaño y una base para tu vaso.');
      return;
    }

    const newItem: CartItem = {
      id: Date.now(), 
      productType: 'Fresas con Crema', 
      size: this.selectedSize,
      base: this.selectedBase,
      freeToppings: [...this.selectedFreeToppings],
      premiumToppings: [...this.selectedPremiumToppings],
      quantity: 1,
      unitPrice: this.getCurrentUnitPrice()
    };

    // Lo mandamos al servicio (cerebro)
    this.cartService.addToCart(newItem);
    
    // Limpiamos la selección para armar un vaso nuevo
    this.selectedSize = undefined;
    this.selectedBase = undefined;
    this.selectedFreeToppings = [];
    this.selectedPremiumToppings = [];
  }
}