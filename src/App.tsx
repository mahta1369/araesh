import { useState, useMemo, useCallback } from 'react';

// ==================== TYPES ====================
interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  price: number;
  weight: string;
  roast: string;
  description: string;
  flavorNotes: string[];
  image: string;
  rating: number;
  inStock: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// ==================== DATA ====================
const products: Product[] = [
  {
    id: 1,
    name: 'Ethiopian Yirgacheffe',
    origin: 'Ethiopia',
    category: 'Light Roast',
    price: 18.50,
    weight: '250g',
    roast: 'Light',
    description: 'A vibrant and complex coffee from the birthplace of coffee itself. Grown at high elevations in the Yirgacheffe region, this lot delivers an extraordinary cup with floral aromatics and a silky body that dances on the palate.',
    flavorNotes: ['Blueberry', 'Jasmine', 'Citrus', 'Honey'],
    image: '☕',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 2,
    name: 'Colombian Supremo',
    origin: 'Colombia',
    category: 'Medium Roast',
    price: 16.00,
    weight: '250g',
    roast: 'Medium',
    description: 'From the lush mountains of Huila, this Supremo grade coffee represents the pinnacle of Colombian excellence. Perfectly balanced with a sweet caramel finish and clean acidity that makes it ideal for any brewing method.',
    flavorNotes: ['Caramel', 'Red Apple', 'Cocoa', 'Almond'],
    image: '☕',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 3,
    name: 'Sumatra Mandheling',
    origin: 'Indonesia',
    category: 'Dark Roast',
    price: 19.00,
    weight: '250g',
    roast: 'Dark',
    description: 'A bold and full-bodied coffee from the volcanic soils of northern Sumatra. Wet-hulled processing gives this coffee its signature earthy character, with a velvety mouthfeel and lingering finish that satisfies the darkest roast lovers.',
    flavorNotes: ['Dark Chocolate', 'Cedar', 'Tobacco', 'Spice'],
    image: '☕',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 4,
    name: 'Guatemala Antigua',
    origin: 'Guatemala',
    category: 'Medium Roast',
    price: 17.50,
    weight: '250g',
    roast: 'Medium',
    description: 'Grown in the shadow of three volcanoes, this Antigua coffee benefits from rich volcanic soil and ideal microclimate conditions. The result is a remarkably smooth cup with chocolate undertones and a pleasant smoky sweetness.',
    flavorNotes: ['Dark Chocolate', 'Vanilla', 'Brown Sugar', 'Smoke'],
    image: '☕',
    rating: 4.5,
    inStock: true,
  },
  {
    id: 5,
    name: 'Kenya AA Nyeri',
    origin: 'Kenya',
    category: 'Light Roast',
    price: 21.00,
    weight: '250g',
    roast: 'Light',
    description: 'The AA grade denotes the largest and most flavorful beans from Kenya\'s prestigious Nyeri region. This washed coffee bursts with bright acidity and wine-like complexity, offering an unforgettable tasting experience for adventurous palates.',
    flavorNotes: ['Blackcurrant', 'Grapefruit', 'Tomato', 'Brown Sugar'],
    image: '☕',
    rating: 4.9,
    inStock: true,
  },
  {
    id: 6,
    name: 'Brazil Santos Natural',
    origin: 'Brazil',
    category: 'Medium Roast',
    price: 14.50,
    weight: '250g',
    roast: 'Medium',
    description: 'A crowd-pleasing classic from the sunny hills of Minas Gerais. Natural processing enhances its inherent sweetness, creating a smooth and approachable cup with nutty warmth that makes it perfect for everyday enjoyment.',
    flavorNotes: ['Peanut', 'Milk Chocolate', 'Toffee', 'Dried Fruit'],
    image: '☕',
    rating: 4.4,
    inStock: true,
  },
];

const categories = ['All', 'Light Roast', 'Medium Roast', 'Dark Roast'];

// ==================== COMPONENTS ====================

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${star <= Math.round(rating) ? 'text-accent' : 'text-warm-200'}`}
        >
          ★
        </span>
      ))}
      <span className="text-xs text-warm-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
}: {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}) {
  const roastColor =
    product.roast === 'Light'
      ? 'bg-amber-100 text-amber-800'
      : product.roast === 'Medium'
      ? 'bg-orange-100 text-orange-800'
      : 'bg-warm-800 text-cream';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md card-hover border border-warm-100">
      <div
        className="relative h-48 bg-gradient-to-br from-warm-100 to-warm-200 flex items-center justify-center cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <span className="text-7xl">{product.image}</span>
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${roastColor}`}>
          {product.roast} Roast
        </span>
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
          <span className="text-xs text-warm-600 font-medium">{product.origin}</span>
        </div>
      </div>
      <div className="p-5">
        <h3
          className="font-bold text-lg text-warm-900 mb-1 cursor-pointer hover:text-warm-600 transition-colors"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>
        <StarRating rating={product.rating} />
        <div className="flex flex-wrap gap-1 mt-3">
          {product.flavorNotes.slice(0, 3).map((note) => (
            <span key={note} className="text-xs bg-warm-50 text-warm-600 px-2 py-0.5 rounded-full border border-warm-100">
              {note}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl font-bold text-warm-800">${product.price.toFixed(2)}</span>
            <span className="text-sm text-warm-500 ml-1">/ {product.weight}</span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-warm-700 text-cream p-3 rounded-xl hover:bg-warm-800 transition-all active:scale-90 shadow-md"
            aria-label="Add to cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductDetail({
  product,
  onClose,
  onAddToCart,
}: {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-warm-900/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-warm-100 transition-colors"
        >
          <svg className="w-5 h-5 text-warm-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="h-56 bg-gradient-to-br from-warm-100 to-warm-200 flex items-center justify-center rounded-t-3xl">
          <span className="text-9xl">{product.image}</span>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-warm-500 font-medium uppercase tracking-wide">{product.origin}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-warm-900 mt-1">{product.name}</h2>
            </div>
            <span className="text-3xl font-bold text-warm-800 whitespace-nowrap">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="mt-3">
            <StarRating rating={product.rating} />
          </div>

          <p className="mt-4 text-warm-600 leading-relaxed">{product.description}</p>

          <div className="mt-6">
            <h4 className="font-semibold text-warm-800 mb-2">Flavor Notes</h4>
            <div className="flex flex-wrap gap-2">
              {product.flavorNotes.map((note) => (
                <span key={note} className="bg-warm-50 text-warm-700 px-3 py-1.5 rounded-full text-sm border border-warm-100">
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-warm-50 rounded-xl p-3 text-center border border-warm-100">
              <p className="text-xs text-warm-500 uppercase">Roast</p>
              <p className="font-semibold text-warm-800 mt-1">{product.roast}</p>
            </div>
            <div className="bg-warm-50 rounded-xl p-3 text-center border border-warm-100">
              <p className="text-xs text-warm-500 uppercase">Weight</p>
              <p className="font-semibold text-warm-800 mt-1">{product.weight}</p>
            </div>
            <div className="bg-warm-50 rounded-xl p-3 text-center border border-warm-100">
              <p className="text-xs text-warm-500 uppercase">Origin</p>
              <p className="font-semibold text-warm-800 mt-1">{product.origin}</p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-warm-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 hover:bg-warm-100 transition-colors text-warm-700"
              >
                −
              </button>
              <span className="px-4 py-3 font-semibold text-warm-800 min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 hover:bg-warm-100 transition-colors text-warm-700"
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                onAddToCart(product, quantity);
                onClose();
              }}
              className="btn-primary flex-1 text-center"
            >
              Add to Cart — ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartSidebar({
  cart,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-warm-900/50 backdrop-blur-sm z-40" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-warm-100">
            <h2 className="text-xl font-bold text-warm-900">
              Your Cart
              {itemCount > 0 && (
                <span className="ml-2 text-sm font-normal text-warm-500">
                  ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                </span>
              )}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-warm-100 transition-colors"
            >
              <svg className="w-5 h-5 text-warm-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <span className="text-6xl mb-4">🛒</span>
                <p className="text-warm-500 text-lg">Your cart is empty</p>
                <p className="text-warm-400 text-sm mt-1">Add some delicious coffee!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 bg-warm-50 rounded-xl p-4 border border-warm-100">
                    <div className="w-16 h-16 bg-warm-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">{item.product.image}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-warm-800 text-sm truncate">{item.product.name}</h4>
                      <p className="text-warm-500 text-xs">{item.product.weight}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-warm-200 rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.product.id, Math.max(0, item.quantity - 1))
                            }
                            className="px-2 py-1 hover:bg-warm-100 transition-colors text-warm-700 text-sm"
                          >
                            −
                          </button>
                          <span className="px-2 py-1 text-sm font-medium text-warm-800 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-warm-100 transition-colors text-warm-700 text-sm"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-bold text-warm-800 text-sm">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="self-start p-1 text-warm-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-warm-100 bg-warm-50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-warm-500">Subtotal</span>
                <span className="font-semibold text-warm-800">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-warm-500">Shipping</span>
                <span className="font-semibold text-warm-800">{total > 50 ? 'Free' : '$5.00'}</span>
              </div>
              <div className="flex justify-between items-center mb-4 pt-2 border-t border-warm-200">
                <span className="text-lg font-bold text-warm-900">Total</span>
                <span className="text-lg font-bold text-warm-900">
                  ${(total + (total > 50 ? 0 : 5)).toFixed(2)}
                </span>
              </div>
              <button onClick={onCheckout} className="btn-primary w-full text-center">
                Proceed to Checkout
              </button>
              {total < 50 && (
                <p className="text-xs text-warm-500 text-center mt-2">
                  Add ${(50 - total).toFixed(2)} more for free shipping!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function CheckoutModal({
  cart,
  onClose,
  onComplete,
}: {
  cart: CartItem[];
  onClose: () => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    card: '',
  });

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = total > 50 ? 0 : 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-warm-900/60 backdrop-blur-sm" />
        <div className="relative bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-warm-900 mb-2">Order Confirmed!</h2>
          <p className="text-warm-600 mb-2">
            Thank you for your order. Your specialty coffee is on its way!
          </p>
          <p className="text-sm text-warm-500 mb-6">
            Order #EB-{Math.random().toString(36).substr(2, 8).toUpperCase()}
          </p>
          <button onClick={onComplete} className="btn-primary w-full">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-warm-900/60 backdrop-blur-sm" />
        <div className="relative bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl">
          <div className="w-16 h-16 border-4 border-warm-200 border-t-warm-700 rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold text-warm-900 mb-2">Processing your order...</h2>
          <p className="text-warm-500">Please wait while we confirm your payment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-warm-900/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-warm-900">Checkout</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-warm-100 transition-colors">
              <svg className="w-5 h-5 text-warm-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="bg-warm-50 rounded-xl p-4 mb-6 border border-warm-100">
            <h3 className="font-semibold text-warm-800 mb-3 text-sm">Order Summary</h3>
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm py-1">
                <span className="text-warm-600">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="text-warm-800 font-medium">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t border-warm-200 mt-2 pt-2 flex justify-between">
              <span className="text-warm-600 text-sm">Shipping</span>
              <span className="text-warm-800 text-sm font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="border-t border-warm-200 mt-2 pt-2 flex justify-between">
              <span className="font-bold text-warm-900">Total</span>
              <span className="font-bold text-warm-900">${(total + shipping).toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-warm-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:border-warm-500 focus:ring-2 focus:ring-warm-200 outline-none transition-all bg-white text-warm-800"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:border-warm-500 focus:ring-2 focus:ring-warm-200 outline-none transition-all bg-white text-warm-800"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-700 mb-1">Address</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:border-warm-500 focus:ring-2 focus:ring-warm-200 outline-none transition-all bg-white text-warm-800"
                placeholder="123 Coffee Lane"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:border-warm-500 focus:ring-2 focus:ring-warm-200 outline-none transition-all bg-white text-warm-800"
                  placeholder="Portland"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">ZIP Code</label>
                <input
                  type="text"
                  required
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:border-warm-500 focus:ring-2 focus:ring-warm-200 outline-none transition-all bg-white text-warm-800"
                  placeholder="97201"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-warm-700 mb-1">Card Number</label>
              <input
                type="text"
                required
                value={formData.card}
                onChange={(e) => setFormData({ ...formData, card: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:border-warm-500 focus:ring-2 focus:ring-warm-200 outline-none transition-all bg-white text-warm-800"
                placeholder="4242 4242 4242 4242"
                maxLength={19}
              />
            </div>
            <button type="submit" className="btn-primary w-full text-center mt-4">
              Place Order — ${(total + shipping).toFixed(2)}
            </button>
            <p className="text-xs text-warm-400 text-center">
              🔒 This is a simulated checkout. No real payment will be processed.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.flavorNotes.some((note) => note.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const showNotification = useCallback((message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2500);
  }, []);

  const addToCart = useCallback(
    (product: Product, quantity: number = 1) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [...prev, { product, quantity }];
      });
      showNotification(`${product.name} added to cart!`);
    },
    [showNotification]
  );

  const updateCartQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity === 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
      );
    }
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleCheckoutComplete = () => {
    setCheckoutOpen(false);
    setCart([]);
    showNotification('Order placed successfully! 🎉');
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] bg-warm-800 text-cream px-6 py-3 rounded-xl shadow-lg animate-bounce-in">
          <p className="text-sm font-medium">{notification}</p>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">☕</span>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-warm-900 leading-tight">Ember & Bean</h1>
                <p className="text-xs text-warm-500 hidden sm:block">Specialty Coffee Roasters</p>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md hidden md:block">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search coffees, origins, flavors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-200 focus:border-warm-400 focus:ring-2 focus:ring-warm-100 outline-none transition-all bg-warm-50 text-warm-800 placeholder-warm-400"
                />
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-3 rounded-xl bg-warm-50 hover:bg-warm-100 transition-colors border border-warm-100"
            >
              <svg className="w-5 h-5 text-warm-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H5L5 9z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-warm-700 text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Search */}
          <div className="mt-3 md:hidden">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search coffees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-200 focus:border-warm-400 focus:ring-2 focus:ring-warm-100 outline-none transition-all bg-warm-50 text-warm-800 placeholder-warm-400"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-warm-800 via-warm-700 to-warm-900 text-cream">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">☕</div>
          <div className="absolute bottom-10 right-10 text-6xl">🫘</div>
          <div className="absolute top-1/2 left-1/3 text-4xl">✨</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 relative">
          <div className="max-w-2xl">
            <p className="text-warm-300 text-sm font-medium uppercase tracking-widest mb-3">
              Freshly Roasted & Delivered
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Exceptional Coffee,
              <br />
              <span className="text-warm-300">Crafted with Care</span>
            </h2>
            <p className="text-warm-200 text-lg mb-6 leading-relaxed">
              Discover our curated selection of single-origin specialty coffees, 
              roasted to perfection and delivered fresh to your door.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#products" className="bg-cream text-warm-800 px-6 py-3 rounded-xl font-semibold hover:bg-warm-100 transition-all shadow-lg">
                Shop Collection
              </a>
              <span className="flex items-center text-warm-300 text-sm">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free shipping over $50
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12" id="products">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="text-sm font-medium text-warm-600 mr-2">Filter by:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-warm-700 text-cream shadow-md'
                  : 'bg-white text-warm-700 border border-warm-200 hover:bg-warm-100 hover:border-warm-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-warm-500 text-sm">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            {searchQuery && (
              <span>
                {' '}for "<span className="text-warm-700 font-medium">{searchQuery}</span>"
              </span>
            )}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-sm text-warm-500 hover:text-warm-700 underline"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={setSelectedProduct}
                onAddToCart={(p) => addToCart(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-6xl block mb-4">🔍</span>
            <h3 className="text-xl font-bold text-warm-800 mb-2">No coffees found</h3>
            <p className="text-warm-500">Try adjusting your search or filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="btn-secondary mt-4"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-warm-800 text-warm-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">☕</span>
                <h3 className="text-xl font-bold text-cream">Ember & Bean</h3>
              </div>
              <p className="text-warm-300 text-sm leading-relaxed">
                Specialty coffee roasters dedicated to sourcing the finest beans from around the world. 
                Every cup tells a story.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-cream mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-warm-300">
                <li><a href="#" className="hover:text-cream transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-cream transition-colors">Brewing Guides</a></li>
                <li><a href="#" className="hover:text-cream transition-colors">Subscriptions</a></li>
                <li><a href="#" className="hover:text-cream transition-colors">Wholesale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-cream mb-3">Stay Connected</h4>
              <p className="text-warm-300 text-sm mb-3">Get brewing tips and exclusive offers.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-warm-700 border border-warm-600 text-cream placeholder-warm-400 text-sm focus:outline-none focus:border-warm-400"
                />
                <button className="px-4 py-2 bg-warm-600 hover:bg-warm-500 rounded-lg text-cream text-sm font-medium transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-warm-700 mt-8 pt-8 text-center text-sm text-warm-400">
            <p>© 2026 Ember & Bean. All rights reserved. Crafted with ❤️ and ☕</p>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      <CartSidebar
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      {checkoutOpen && (
        <CheckoutModal
          cart={cart}
          onClose={() => setCheckoutOpen(false)}
          onComplete={handleCheckoutComplete}
        />
      )}
    </div>
  );
}
