import React from 'react';

// Image management utility for MIFA Cafe
// Handles local uploaded images with graceful fallback

export const LOCAL_IMAGE_MAP: Record<string, { localPaths: string[]; fallback: string }> = {
  // Tea & Warm Drinks
  'red-tea-glass': {
    localPaths: ['/images/شاي احمر.webp', '/images/شاي_احمر.webp', '/images/red-tea.webp'],
    fallback: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&q=80&auto=format&fit=crop',
  },
  'red-tea-paper': {
    localPaths: ['/images/شاي احمر.webp', '/images/شاي_احمر.webp', '/images/red-tea.webp'],
    fallback: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=800&q=80&auto=format&fit=crop',
  },
  'green-tea': {
    localPaths: ['/images/شاي اخضر.webp', '/images/شاي_اخضر.webp', '/images/green-tea.webp'],
    fallback: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800&q=80&auto=format&fit=crop',
  },
  'taifi-tea': {
    localPaths: ['/images/طايفي.webp', '/images/شاي طايفي.webp', '/images/taifi.webp'],
    fallback: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80&auto=format&fit=crop',
  },
  'moroccan-tea': {
    localPaths: ['/images/مغربي.webp', '/images/شاي مغربي.webp', '/images/moroccan.webp'],
    fallback: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80&auto=format&fit=crop',
  },
  'adeni-tea': {
    localPaths: ['/images/عدني.webp', '/images/شاي عدني.webp', '/images/adeni.webp', '/images/karak.webp'],
    fallback: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=800&q=80&auto=format&fit=crop',
  },
  'ginger-milk': {
    localPaths: ['/images/عدني.webp', '/images/حليب زنجبيل.webp', '/images/ginger-milk.webp'],
    fallback: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80&auto=format&fit=crop',
  },

  // Saudi Coffee
  'saudi-coffee-dallah': {
    localPaths: ['/images/قهوه سعوديه دله.webp', '/images/قهوة سعودية.webp', '/images/saudi-coffee.webp'],
    fallback: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80&auto=format&fit=crop',
  },
  'saudi-coffee-cup': {
    localPaths: ['/images/قهوه سعوديه دله.webp', '/images/saudi-coffee-cup.webp'],
    fallback: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80&auto=format&fit=crop',
  },

  // Cold Drinks
  'karkadeh-cold': {
    localPaths: ['/images/كركديه.webp', '/images/كركدية.webp', '/images/karkadeh.webp'],
    fallback: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80&auto=format&fit=crop',
  },
  'iced-hibiscus': {
    localPaths: ['/images/كركديه.webp', '/images/karkadeh.webp'],
    fallback: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80&auto=format&fit=crop',
  },
  'iced-tea-lemon': {
    localPaths: ['/images/كركديه.webp', '/images/iced-tea.webp'],
    fallback: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80&auto=format&fit=crop',
  },
  'iced-spanish-latte': {
    localPaths: ['/images/كابتشينو.webp', '/images/iced-latte.webp'],
    fallback: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&q=80&auto=format&fit=crop',
  },
  'iced-americano': {
    localPaths: ['/images/اسبريسو.webp', '/images/V60.webp', '/images/iced-americano.webp'],
    fallback: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&q=80&auto=format&fit=crop',
  },

  // Coffee & Espresso
  'v60-coffee': {
    localPaths: ['/images/V60.webp', '/images/V60.webp', '/images/v60.webp'],
    fallback: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80&auto=format&fit=crop',
  },
  'espresso-single': {
    localPaths: ['/images/اسبريسو.webp', '/images/espresso.webp'],
    fallback: 'https://images.unsplash.com/photo-1510707577719-eaef21005169?w=800&q=80&auto=format&fit=crop',
  },
  'espresso-double': {
    localPaths: ['/images/اسبريسو.webp', '/images/espresso.webp'],
    fallback: 'https://images.unsplash.com/photo-1510707577719-eaef21005169?w=800&q=80&auto=format&fit=crop',
  },
  'cortado': {
    localPaths: ['/images/كرتادو.webp', '/images/كورتادو.webp', '/images/cortado.webp'],
    fallback: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&q=80&auto=format&fit=crop',
  },
  'cappuccino': {
    localPaths: ['/images/كابتشينو.webp', '/images/cappuccino.webp'],
    fallback: 'https://images.unsplash.com/photo-1572442388796-11668ba67e53?w=800&q=80&auto=format&fit=crop',
  },
  'flat-white': {
    localPaths: ['/images/كابتشينو.webp', '/images/flat-white.webp'],
    fallback: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=800&q=80&auto=format&fit=crop',
  },
  'latte': {
    localPaths: ['/images/كابتشينو.webp', '/images/latte.webp'],
    fallback: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=800&q=80&auto=format&fit=crop',
  },
  'spanish-latte-hot': {
    localPaths: ['/images/كابتشينو.webp', '/images/spanish-latte.webp'],
    fallback: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80&auto=format&fit=crop',
  },
  'hot-chocolate': {
    localPaths: ['/images/كابتشينو.webp', '/images/hot-chocolate.webp'],
    fallback: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=800&q=80&auto=format&fit=crop',
  },

  // Bakery & Bread
  'khobz-hali-plain': {
    localPaths: ['/images/خبز حالي ساده.webp', '/images/خبز_حالي_ساده.webp', '/images/khobz-plain.webp'],
    fallback: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80&auto=format&fit=crop',
  },
  'khobz-hali-liquid-cheese': {
    localPaths: ['/images/جبنه سايل.webp', '/images/جبنة_سائلة.webp', '/images/khobz-liquid-cheese.webp'],
    fallback: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&q=80&auto=format&fit=crop',
  },
  'khobz-hali-cheddar': {
    localPaths: ['/images/جبنه شيدر.webp', '/images/جبنة_شيدر.webp', '/images/khobz-cheddar.webp'],
    fallback: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=800&q=80&auto=format&fit=crop',
  },
  'khobz-hali-mix-cheese': {
    localPaths: ['/images/جبنه مكس بالاجبان.webp', '/images/مكس_اجبان.webp', '/images/khobz-mix-cheese.webp'],
    fallback: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80&auto=format&fit=crop',
  },
  'khobz-hali-nutella': {
    localPaths: ['/images/بانكيك.webp', '/images/khobz-nutella.webp'],
    fallback: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&q=80&auto=format&fit=crop',
  },
  'khobz-hali-honey-cream': {
    localPaths: ['/images/بسبوسه.webp', '/images/khobz-honey.webp'],
    fallback: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80&auto=format&fit=crop',
  },
  'mifa-breakfast-plate': {
    localPaths: ['/images/جبنه مكس بالاجبان.webp', '/images/mifa-breakfast.webp'],
    fallback: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80&auto=format&fit=crop',
  },

  // Desserts
  'basbousa-cream': {
    localPaths: ['/images/بسبوسه.webp', '/images/بسبوسة.webp', '/images/basbousa.webp'],
    fallback: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80&auto=format&fit=crop',
  },
  'tiramisu': {
    localPaths: ['/images/تراميسو.webp', '/images/تيراميسو.webp', '/images/tiramisu.webp'],
    fallback: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80&auto=format&fit=crop',
  },
  'crunchy-cheese': {
    localPaths: ['/images/كرانشي تشيز.webp', '/images/كرانشي_تشيز.webp', '/images/crunchy-cheese.webp'],
    fallback: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80&auto=format&fit=crop',
  },
  'pancake-mini': {
    localPaths: ['/images/بانكيك.webp', '/images/بان كيك.webp', '/images/pancake.webp'],
    fallback: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80&auto=format&fit=crop',
  },
  'saffron-cake': {
    localPaths: ['/images/بسبوسه.webp', '/images/saffron-cake.webp'],
    fallback: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&q=80&auto=format&fit=crop',
  },
  'san-sebastian': {
    localPaths: ['/images/كرانشي تشيز.webp', '/images/san-sebastian.webp'],
    fallback: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80&auto=format&fit=crop',
  },
  'dates-tahini-plate': {
    localPaths: ['/images/قهوه سعوديه دله.webp', '/images/dates.webp'],
    fallback: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&q=80&auto=format&fit=crop',
  },
};

/**
 * Returns primary local image candidate and fallback URL
 */
export function getProductImage(itemId: string, defaultImage?: string): string {
  const mapping = LOCAL_IMAGE_MAP[itemId];
  if (mapping && mapping.localPaths.length > 0) {
    // Primary path to local uploaded image
    return mapping.localPaths[0];
  }
  return defaultImage || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80&auto=format&fit=crop';
}

/**
 * Helper to handle image fallback on error
 */
export function handleImageFallback(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  itemId: string,
  _currentFallback?: string
) {
  const target = e.currentTarget;
  // Prevent infinite loop if fallback image also fails
  target.onerror = null;

  const mapping = LOCAL_IMAGE_MAP[itemId];
  const fallbackUrl = (mapping && mapping.fallback)
    ? mapping.fallback
    : 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80&auto=format&fit=crop';

  if (target.src !== fallbackUrl) {
    target.src = fallbackUrl;
  }
}
