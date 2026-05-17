import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart';
import { ItemOption, CartItem } from '../../models/product';

@Component({
  selector: 'app-order',
  standalone: true, // Importante si estás usando Angular 17+
  imports: [],
  templateUrl: './order.html',
  styleUrl: './order.scss'
})
export class OrderComponent {
  // Conectamos con nuestro cerebro del carrito
  cartService = inject(CartService);

  // ==========================================
  // 1. LOS DATOS DEL MENÚ (Inventario Completo)
  // ==========================================
  
  // Categorías de Frutas y Tamaños
  sizes: ItemOption[] = [
    // Fresas
    { name: 'Fresas Chicas', price: 65 },
    { name: 'Fresas Grandes', price: 85 },
    { name: 'Fresas Jumbo', price: 195 },
    // Duraznos
    { name: 'Duraznos Chicos', price: 70 },
    { name: 'Duraznos Grandes', price: 85 },
    { name: 'Duraznos Jumbo', price: 200 },
    // Uvas
    { name: 'Uvas Chicas', price: 75 },
    { name: 'Uvas Grandes', price: 95 },
    { name: 'Uvas Jumbo', price: 205 },
    // Combinadas Chicas
    { name: 'Fresa y Duraznos Chicas', price: 75 },
    { name: 'Fresa y Uvas Chicas', price: 75 },
    { name: 'Uva y Duraznos Chicas', price: 75 },
    { name: 'Fresa, Durazno y Uvas Chicas', price: 80 },
    // Combinadas Grandes
    { name: 'Fresa y Duraznos Grandes', price: 90 },
    { name: 'Fresa y Uvas Grandes', price: 95 },
    { name: 'Uva y Duraznos Grandes', price: 95 },
    { name: 'Fresa, Durazno y Uvas Grandes', price: 95 }
  ];

  bases: ItemOption[] = [
    { name: 'Sin Base', price: 0 },
    { name: 'Nutella', price: 0 },
    { name: 'Lechera', price: 0 },
    { name: 'Cajeta', price: 0 },
    { name: 'Chocolate (Hershey)', price: 0 },
    { name: 'Lotus', price: 15 } // Esta cobra $15 extra
  ];

  freeToppingsList: ItemOption[] = [
    { name: 'Chispas de chocolate', price: 0 },
    { name: 'Chispas de chocolate blanco', price: 0 },
    { name: 'Chispas de colores', price: 0 },
    { name: 'Chispas de café con leche', price: 0 },
    { name: 'Coco Rayado', price: 0 },
    { name: 'Krankys', price: 0 },
    { name: 'Granola', price: 0 },
    { name: 'Nuez', price: 0 },
    { name: 'Lunetas', price: 0 },
    { name: 'Panditas', price: 0 },
    { name: 'Gusanitos de goma', price: 0 },
    { name: 'Bombones', price: 0 }
  ];

  premiumToppingsList: ItemOption[] = [
    { name: 'Galleta Oreo', price: 10 },
    { name: 'Galleta Canelitas', price: 10 },
    { name: 'Galleta Maria', price: 10 },
    { name: 'Mazapán', price: 10 },
    { name: 'Galleta Lotus', price: 15 },
    { name: 'Bubulubu', price: 15 },
    { name: 'Chocolate Ferrero', price: 15 },
    { name: 'Chocorrol', price: 15 },
    { name: 'Gansito', price: 15 },
    { name: 'Pingüinos', price: 15 },
    { name: 'Queso de bola', price: 15 },
    { name: 'Hershey Blanco', price: 20 },
    { name: 'Kinder', price: 20 },
    { name: 'Paleta Magnum', price: 30 },
    { name: 'Huevo Kinder', price: 30 }
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
      alert('Solo puedes elegir hasta 3 toppings de barra.'); 
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