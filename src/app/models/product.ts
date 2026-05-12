// Esta interfaz nos sirve para cualquier opción (tamaño, base o topping)
export interface ItemOption {
  name: string;
  price: number;
}

// Así se verá un "vaso" armado dentro de nuestro carrito
export interface CartItem {
  id: number;                  // Un número para identificar el vaso en el carrito
  productType: string;         // Ej: "Fresas", "Duraznos", "Combinada", o "Favorita: Fresas Lotus"
  size?: ItemOption;           // Tamaño elegido (precio base)
  base?: ItemOption;           // Nutella, Lechera, Lotus (+15), etc.
  freeToppings: ItemOption[];  // Arreglo para guardar máximo 3
  premiumToppings: ItemOption[]; // Arreglo para los que cuestan extra
  quantity: number;            // Cuántos vasos idénticos quiere de este armado
  unitPrice: number;           // La suma total de este vaso (tamaño + base extra + toppings extra)
}