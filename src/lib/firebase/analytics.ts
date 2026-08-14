import { logEvent as firebaseLogEvent } from 'firebase/analytics';
import { getFirebaseAnalytics } from './config';

/**
 * Safe generic event tracker
 */
export async function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  try {
    const analytics = await getFirebaseAnalytics();
    if (analytics) {
      firebaseLogEvent(analytics, eventName, eventParams);
    }
  } catch (error) {
    console.debug(`[Analytics] Could not log event: ${eventName}`, error);
  }
}

/**
 * Pageview event tracker
 */
export async function trackPageView(pageTitle?: string, pageLocation?: string) {
  return trackEvent('page_view', {
    page_title: pageTitle || (typeof document !== 'undefined' ? document.title : ''),
    page_location: pageLocation || (typeof window !== 'undefined' ? window.location.href : ''),
  });
}

/**
 * Product view event tracker
 */
export async function trackViewItem(product: {
  id?: string;
  name: string;
  category?: string;
  price?: number | string;
  sku?: string;
}) {
  return trackEvent('view_item', {
    currency: 'INR',
    value: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
    items: [
      {
        item_id: product.id || product.sku,
        item_name: product.name,
        item_category: product.category,
        price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      },
    ],
  });
}

/**
 * Add to cart event tracker
 */
export async function trackAddToCart(item: {
  id?: string;
  name: string;
  price?: number | string;
  category?: string;
  quantity?: number;
}) {
  const itemPrice = typeof item.price === 'string' ? parseFloat(item.price) : (item.price || 0);
  const qty = item.quantity || 1;

  return trackEvent('add_to_cart', {
    currency: 'INR',
    value: itemPrice * qty,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: itemPrice,
        quantity: qty,
      },
    ],
  });
}

/**
 * Begin checkout event tracker
 */
export async function trackBeginCheckout(items: any[], totalValue: number) {
  return trackEvent('begin_checkout', {
    currency: 'INR',
    value: totalValue,
    items: items.map((it) => ({
      item_id: it.id || it.productId,
      item_name: it.title || it.name,
      price: it.price,
      quantity: it.quantity,
    })),
  });
}

/**
 * Purchase completion event tracker
 */
export async function trackPurchase(orderId: string, items: any[], totalValue: number) {
  return trackEvent('purchase', {
    transaction_id: orderId,
    currency: 'INR',
    value: totalValue,
    items: items.map((it) => ({
      item_id: it.id || it.productId,
      item_name: it.title || it.name,
      price: it.price,
      quantity: it.quantity,
    })),
  });
}
