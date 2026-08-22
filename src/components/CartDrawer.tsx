import React from 'react';
import { CartItem, Language } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  language: Language;
  orderType: 'dine-in' | 'takeaway';
  setOrderType: (type: 'dine-in' | 'takeaway') => void;
  tableNumber: string;
  setTableNumber: (val: string) => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  language,
  orderType,
  setOrderType,
  tableNumber,
  setTableNumber,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const isAr = language === 'ar';
  const subtotal = cart.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const tax = subtotal * 0.15;
  const total = subtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 end-0 max-w-full flex">
        <div
          id="cart-drawer"
          className="w-screen max-w-md bg-[#f7faf5] shadow-2xl flex flex-col border-s border-[#c0c9c3]/20"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#c0c9c3]/20 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px] text-[#D4AF37]">
                shopping_bag
              </span>
              <h2 className="text-lg font-bold text-[#013220]">
                {isAr ? 'حقيبة الطلب' : 'Your Order Bag'}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#f1f4ef] text-xs font-bold text-[#013220]">
                {cart.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#e0e3de]/60 text-[#404945] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Dining / Takeaway Option Switch */}
            <div className="p-1.5 rounded-2xl bg-white border border-[#c0c9c3]/30 grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => setOrderType('dine-in')}
                className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  orderType === 'dine-in'
                    ? 'bg-[#013220] text-white shadow-xs'
                    : 'text-[#404945] hover:text-[#013220]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  table_restaurant
                </span>
                <span>{isAr ? 'تناول محلي (طاولة)' : 'Dine In'}</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  orderType === 'takeaway'
                    ? 'bg-[#013220] text-white shadow-xs'
                    : 'text-[#404945] hover:text-[#013220]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  takeout_dining
                </span>
                <span>{isAr ? 'طلب سفري' : 'Takeaway'}</span>
              </button>
            </div>

            {/* Table Number if Dine In */}
            {orderType === 'dine-in' && (
              <div className="p-3 bg-white rounded-2xl border border-[#c0c9c3]/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#D4AF37] text-[20px]">
                    meeting_room
                  </span>
                  <span className="text-xs font-bold text-[#013220]">
                    {isAr ? 'رقم الطاولة:' : 'Table Number:'}
                  </span>
                </div>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder={isAr ? 'مثال: 7' : 'e.g. 7'}
                  className="w-24 text-center px-3 py-1.5 rounded-xl border border-[#c0c9c3]/40 bg-[#f7faf5] text-xs font-bold text-[#013220] focus:outline-none focus:border-[#013220]"
                />
              </div>
            )}

            {/* Items List */}
            {cart.length === 0 ? (
              <div className="py-16 text-center text-[#707974]">
                <span className="material-symbols-outlined text-[48px] text-[#D4AF37] mb-3">
                  shopping_cart
                </span>
                <p className="text-sm font-semibold">
                  {isAr ? 'حقيبة الطلبات فارغة' : 'Your order is empty'}
                </p>
                <p className="text-xs mt-1">
                  {isAr
                    ? 'استمتع باختيار أشهى المشروبات والحلويات من القائمة'
                    : 'Explore the menu to add delicious items'}
                </p>
              </div>
            ) : (
              cart.map((cartItem) => (
                <div
                  key={cartItem.cartItemId}
                  className="p-3.5 bg-white rounded-2xl border border-[#c0c9c3]/30 shadow-xs flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={cartItem.item.image}
                        alt={isAr ? cartItem.item.nameAr : cartItem.item.nameEn}
                        className="w-14 h-14 rounded-xl object-cover bg-[#f1f4ef]"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-[#013220]">
                          {isAr ? cartItem.item.nameAr : cartItem.item.nameEn}
                        </h4>
                        <div className="text-xs font-bold text-[#D4AF37]">
                          {cartItem.totalPrice} {isAr ? 'ر.س' : 'SAR'}
                        </div>
                      </div>
                    </div>

                    {/* Delete item */}
                    <button
                      onClick={() => onRemoveItem(cartItem.cartItemId)}
                      className="text-[#707974] hover:text-red-500 p-1 cursor-pointer transition-colors"
                      aria-label="Remove item"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        delete
                      </span>
                    </button>
                  </div>

                  {/* Customizations tags */}
                  {cartItem.selectedCustomizations.length > 0 && (
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#404945]">
                      {cartItem.selectedCustomizations.map((c, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-[#f1f4ef] rounded-md font-medium"
                        >
                          {isAr ? c.optionNameAr : c.optionNameEn}
                        </span>
                      ))}
                    </div>
                  )}

                  {cartItem.specialInstructions && (
                    <div className="text-[11px] text-[#707974] italic">
                      "{cartItem.specialInstructions}"
                    </div>
                  )}

                  {/* Quantity bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#c0c9c3]/15">
                    <span className="text-xs text-[#707974]">
                      {isAr ? 'الكمية' : 'Quantity'}
                    </span>
                    <div className="flex items-center rounded-lg border border-[#c0c9c3]/30 bg-[#f7faf5] px-1 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartItemId, -1)}
                        className="w-6 h-6 flex items-center justify-center text-[#013220] hover:bg-white rounded cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          remove
                        </span>
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#013220]">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartItemId, 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#013220] hover:bg-white rounded cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          add
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#c0c9c3]/20 shadow-lg space-y-3">
              <div className="space-y-1.5 text-xs text-[#404945]">
                <div className="flex justify-between">
                  <span>{isAr ? 'المجموع' : 'Subtotal'}</span>
                  <span className="font-semibold">{subtotal.toFixed(2)} {isAr ? 'ر.س' : 'SAR'}</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#707974]">
                  <span>{isAr ? 'شامل ضريبة القيمة المضافة (15%)' : 'Includes 15% VAT'}</span>
                  <span>{tax.toFixed(2)} {isAr ? 'ر.س' : 'SAR'}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#013220] pt-2 border-t border-[#c0c9c3]/20">
                  <span>{isAr ? 'الإجمالي النهائي' : 'Total'}</span>
                  <span className="text-[#D4AF37] text-base">{total.toFixed(2)} {isAr ? 'ر.س' : 'SAR'}</span>
                </div>
              </div>

              <button
                id="checkout-order-btn"
                onClick={onCheckout}
                className="w-full py-3.5 px-6 rounded-full bg-[#013220] hover:bg-[#003c2d] text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">
                  check_circle
                </span>
                <span>{isAr ? 'تأكيد وإرسال الطلب' : 'Complete Order'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
