import React from 'react';
import { X, MapPin, ShoppingBag, Check } from 'lucide-react';
import { Language } from '../types';

interface TableModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTable: string;
  onSelectTable: (tableNum: string) => void;
  language: Language;
}

export const TableModal: React.FC<TableModalProps> = ({
  isOpen,
  onClose,
  currentTable,
  onSelectTable,
  language,
}) => {
  if (!isOpen) return null;

  const isAr = language === 'ar';
  const tables = Array.from({ length: 16 }, (_, i) => String(i + 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div
        id="table-picker-modal"
        className="w-full max-w-md bg-[#faf8f5] rounded-3xl shadow-2xl overflow-hidden border border-[#e3dbcd] p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#b38520]" />
            <h3 className="font-bold text-lg text-[#05261d] font-arabic-title">
              {isAr ? 'اختر مكان الطلب' : 'Select Order Location'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#ede5d8] text-[#55675e] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Takeaway Option */}
        <div className="mb-5">
          <button
            onClick={() => {
              onSelectTable('');
              onClose();
            }}
            className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
              currentTable === ''
                ? 'bg-[#05261d] text-white border-[#05261d] shadow-sm'
                : 'bg-white text-[#22332a] border-[#ded4c3] hover:border-[#0a382a]'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#e6c579]" />
              <div className="text-start">
                <div className="font-bold text-sm">
                  {isAr ? 'طلب خارجي (سفري)' : 'Takeaway / Pick-up'}
                </div>
                <div className={`text-xs ${currentTable === '' ? 'text-[#c6d7ce]' : 'text-[#708076]'}`}>
                  {isAr ? 'الاستلام من كاونتر الباريستا' : 'Pick up from barista bar'}
                </div>
              </div>
            </div>
            {currentTable === '' && <Check className="w-5 h-5 text-[#e6c579]" />}
          </button>
        </div>

        {/* Dine-in Table Selection */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-[#55675e] uppercase tracking-wider">
            {isAr ? 'جلسة داخلية • رقم الطاولة' : 'Dine-In • Table Number'}
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            {tables.map((tbl) => {
              const isSelected = currentTable === tbl;
              return (
                <button
                  key={tbl}
                  onClick={() => {
                    onSelectTable(tbl);
                    onClose();
                  }}
                  className={`py-3 rounded-xl font-bold text-sm transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#05261d] text-[#e6c579] border-[#05261d] shadow-sm scale-105'
                      : 'bg-white text-[#1a2b22] border-[#ded4c3] hover:border-[#b38520] hover:bg-[#f5eee2]'
                  }`}
                >
                  {isAr ? `طاولة ${tbl}` : `T-${tbl}`}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
