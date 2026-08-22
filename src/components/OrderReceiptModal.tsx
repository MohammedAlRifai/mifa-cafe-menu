import React from 'react';
import { OrderDetails, Language } from '../types';
import { MIFA_LOGO_URL } from '../data/menuData';

interface OrderReceiptModalProps {
  order: OrderDetails | null;
  language: Language;
  onClose: () => void;
}

export const OrderReceiptModal: React.FC<OrderReceiptModalProps> = ({
  order,
  language,
  onClose,
}) => {
  if (!order) return null;

  const isAr = language === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div
        id="order-receipt-modal"
        className="w-full max-w-md bg-[#f7faf5] rounded-3xl shadow-2xl overflow-hidden border border-[#c0c9c3]/30 p-6 flex flex-col items-center text-center"
      >
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#013220] flex items-center justify-center text-[#ffdf90] mb-4 shadow-md ring-4 ring-[#f7faf5]">
          <span className="material-symbols-outlined text-[32px]">
            check_circle
          </span>
        </div>

        <img
          src={MIFA_LOGO_URL}
          alt="MIFA"
          className="w-12 h-12 rounded-full object-cover mb-2 border border-[#c0c9c3]/40"
        />

        <h3 className="text-xl font-bold text-[#013220]">
          {isAr ? 'تم استلام طلبك بنجاح!' : 'Order Received Successfully!'}
        </h3>
        <p className="text-xs text-[#707974] mt-1 mb-4">
          {isAr
            ? 'يقوم فريق الباريستا بتحضير طلبك بشغف وعناية فائقة'
            : 'Our baristas are preparing your order with passion'}
        </p>

        {/* Order Info Card */}
        <div className="w-full bg-white rounded-2xl p-4 border border-[#c0c9c3]/30 text-start space-y-2.5 text-xs mb-5">
          <div className="flex justify-between items-center pb-2 border-b border-[#c0c9c3]/20">
            <span className="text-[#707974]">{isAr ? 'رقم الطلب:' : 'Order ID:'}</span>
            <span className="font-bold text-[#013220]">{order.orderId}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#707974]">{isAr ? 'نوع الطلب:' : 'Order Type:'}</span>
            <span className="font-semibold text-[#013220]">
              {order.orderType === 'dine-in'
                ? isAr
                  ? `محلي - طاولة ${order.tableNumber || '-'}`
                  : `Dine-in (Table ${order.tableNumber || '-'})`
                : isAr
                ? 'استلام سفري'
                : 'Takeaway'}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#707974]">{isAr ? 'وقت الطلب:' : 'Order Time:'}</span>
            <span className="font-medium text-[#404945]">{order.createdAt}</span>
          </div>

          {/* Items Summary */}
          <div className="pt-2 border-t border-[#c0c9c3]/20 space-y-1.5">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs text-[#191d19]">
                <span>
                  {item.quantity}x {isAr ? item.item.nameAr : item.item.nameEn}
                </span>
                <span className="font-bold text-[#D4AF37]">
                  {item.totalPrice} {isAr ? 'ر.س' : 'SAR'}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-[#c0c9c3]/20 font-bold text-sm text-[#013220]">
            <span>{isAr ? 'الإجمالي المدفوع:' : 'Total Paid:'}</span>
            <span className="text-[#D4AF37] text-base">{order.total.toFixed(2)} {isAr ? 'ر.س' : 'SAR'}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-[#013220] hover:bg-[#003c2d] text-white font-bold text-sm transition-all shadow-md active:scale-98 cursor-pointer"
        >
          {isAr ? 'العودة للقائمة' : 'Back to Menu'}
        </button>
      </div>
    </div>
  );
};
