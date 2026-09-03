'use client';

import React, { useState } from 'react';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Download,
  MapPin,
  Phone,
  ChevronDown,
  ChevronUp,
  XCircle,
  PackageCheck,
  MessageSquare,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

export interface OrderItem {
  id: string;
  product_title: string;
  variant_title?: string | null;
  sku?: string | null;
  quantity: number;
  unit_price: string | number;
  line_total?: string | number;
}

export interface ShipmentRecord {
  id: string;
  carrier_name?: string | null;
  tracking_number?: string | null;
  tracking_url?: string | null;
  delivery_type?: 'courier' | 'direct' | string;
  driver_name?: string | null;
  driver_phone?: string | null;
  status?: string;
  shipped_at?: string | null;
  delivered_at?: string | null;
}

export interface ShippingAddress {
  full_name?: string | null;
  phone?: string | null;
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
}

export interface CustomerOrder {
  id: string;
  order_number?: string | null;
  status: string;
  placed_at?: string | null;
  updated_at?: string | null;
  total_amount?: string | number;
  totalAmount?: string | number;
  subtotal?: string | number;
  discount_amount?: string | number;
  shipping_amount?: string | number;
  customer_note?: string | null;
  shipping_address?: ShippingAddress | null;
  shipments?: ShipmentRecord[];
  items?: OrderItem[];
}

interface Props {
  order: CustomerOrder;
}

export function CustomerOrderCard({ order }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const orderNum = order.order_number || `#${order.id.slice(0, 8)}`;
  const latestShipment = order.shipments && order.shipments.length > 0 ? order.shipments[0] : null;
  const items = order.items || [];
  const address = order.shipping_address;
  const totalVal = parseFloat(String(order.total_amount || order.totalAmount || '0'));

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // Status mapping & step calculation
  const getStatusDetails = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return {
          label: 'Order Confirmed',
          step: 2,
          badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: CheckCircle2,
          summaryText: 'Payment verified & order confirmed. Preparing for warehouse dispatch.',
        };
      case 'processing':
        return {
          label: 'Processing & Packing',
          step: 2,
          badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          icon: PackageCheck,
          summaryText: 'Your standing desk is being verified, packaged, and labelled.',
        };
      case 'shipped':
        return {
          label: 'Dispatched / In Transit',
          step: 3,
          badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
          icon: Truck,
          summaryText: latestShipment?.carrier_name
            ? `Dispatched via ${latestShipment.carrier_name}. Package is in transit to your doorstep.`
            : 'Dispatched and currently in transit to your delivery destination.',
        };
      case 'out_for_delivery':
        return {
          label: 'Out for Delivery',
          step: 3,
          badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: Truck,
          summaryText: 'Package is out with the delivery courier for doorstep delivery today.',
        };
      case 'delivered':
        return {
          label: 'Delivered',
          step: 4,
          badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: CheckCircle2,
          summaryText: 'Successfully delivered to your doorstep. Thank you for choosing Fittrock!',
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          step: 0,
          badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
          icon: XCircle,
          summaryText: 'This order was cancelled. Please contact customer support if you have questions.',
        };
      case 'pending':
      default:
        return {
          label: 'Order Placed',
          step: 1,
          badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-200',
          icon: Clock,
          summaryText: 'Order received. Awaiting confirmation and dispatch processing.',
        };
    }
  };

  const statusInfo = getStatusDetails(order.status || 'pending');
  const StatusIcon = statusInfo.icon;

  // Build formatted text for sharing
  const buildShareText = () => {
    let text = `📦 *Fittrock Ergonomics — Order Update*\n`;
    text += `Order ID: ${orderNum}\n`;
    text += `Status: ${statusInfo.label}\n\n`;

    if (items.length > 0) {
      text += `*Items:*\n`;
      items.forEach((item) => {
        text += `• ${item.product_title}${item.variant_title ? ` (${item.variant_title})` : ''} x${item.quantity}\n`;
      });
      text += `\n`;
    }

    text += `Total Amount: ${formatPrice(totalVal, { maximumFractionDigits: 0 })}\n`;

    if (latestShipment) {
      text += `\n🚚 *Shipping Details:*\n`;
      if (latestShipment.delivery_type === 'direct') {
        text += `Delivery: Direct Fittrock Delivery${latestShipment.driver_name ? ` (Driver: ${latestShipment.driver_name})` : ''}\n`;
      } else {
        text += `Carrier: ${latestShipment.carrier_name || 'Courier Partner'}\n`;
        if (latestShipment.tracking_number) {
          text += `Tracking / AWB: ${latestShipment.tracking_number}\n`;
        }
        if (latestShipment.tracking_url) {
          text += `Track Package: ${latestShipment.tracking_url}\n`;
        }
      }
    }

    if (address?.city) {
      text += `Delivery Destination: ${address.city}, ${address.state || ''} - ${address.postal_code || ''}\n`;
    }

    text += `\nNeed assistance? Visit www.fittrock.com or call +91 86055 91550`;
    return text;
  };

  // WhatsApp Share
  const handleShareWhatsApp = () => {
    const text = buildShareText();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Native Web Share API (Mobile)
  const handleNativeShare = async () => {
    const text = buildShareText();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Fittrock Order ${orderNum}`,
          text: text,
        });
      } catch (err) {
        // User dismissed share dialog
      }
    } else {
      handleCopy(text, 'Order Summary');
    }
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 shadow-sm transition-all hover:border-zinc-300 space-y-6">
      {/* Top Bar: Order Identifier, Status Badge, and Date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-mono font-black text-sm sm:text-base text-zinc-900 tracking-tight">
              {orderNum}
            </span>

            <button
              onClick={() => handleCopy(orderNum, 'Order Number')}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
              title="Copy Order ID"
            >
              {copiedField === 'Order Number' ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-xs ${statusInfo.badgeColor}`}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              <span>{statusInfo.label}</span>
            </span>
          </div>

          <p className="text-xs text-zinc-400 font-medium">
            Placed on{' '}
            {order.placed_at
              ? new Date(order.placed_at).toLocaleString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Recent Order'}
          </p>
        </div>

        {/* Total Price */}
        <div className="text-left sm:text-right">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
            Order Total
          </span>
          <div className="text-lg sm:text-xl font-black text-zinc-950 font-mono">
            {formatPrice(totalVal, { maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>

      {/* Visual Order Progress Stepper */}
      {statusInfo.step > 0 && (
        <div className="py-2">
          <div className="relative flex items-center justify-between max-w-xl mx-auto">
            {/* Connecting Track Background */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-zinc-200 -translate-y-1/2 z-0 rounded-full" />

            {/* Connecting Active Fill */}
            <div
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 -translate-y-1/2 z-0 rounded-full transition-all duration-500"
              style={{
                width:
                  statusInfo.step === 1
                    ? '10%'
                    : statusInfo.step === 2
                    ? '40%'
                    : statusInfo.step === 3
                    ? '75%'
                    : '100%',
              }}
            />

            {[
              { stepNum: 1, label: 'Placed', icon: Clock },
              { stepNum: 2, label: 'Confirmed', icon: CheckCircle2 },
              { stepNum: 3, label: 'Dispatched', icon: Truck },
              { stepNum: 4, label: 'Delivered', icon: CheckCircle2 },
            ].map((st) => {
              const StepIcon = st.icon;
              const isCompleted = statusInfo.step >= st.stepNum;
              const isCurrent = statusInfo.step === st.stepNum;

              return (
                <div key={st.stepNum} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-zinc-900 text-white shadow-md'
                        : 'bg-white text-zinc-400 border-2 border-zinc-200'
                    } ${isCurrent ? 'ring-4 ring-amber-400/30 ring-offset-2' : ''}`}
                  >
                    <StepIcon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs mt-2 font-bold tracking-tight ${
                      isCompleted ? 'text-zinc-900' : 'text-zinc-400'
                    }`}
                  >
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-zinc-50 border border-zinc-200/80 rounded-2xl text-xs text-zinc-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
            <span>{statusInfo.summaryText}</span>
          </div>
        </div>
      )}

      {/* Shipment & Live Tracking Card (If dispatched) */}
      {latestShipment && (
        <div className="p-4 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-emerald-500/5 border border-purple-200/60 rounded-2xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-md inline-block">
                {latestShipment.delivery_type === 'direct' ? 'Direct Fittrock Dispatch' : 'Courier Partner Allocated'}
              </span>

              <div className="flex items-center gap-2 font-bold text-zinc-900 text-sm">
                <Truck className="w-4 h-4 text-purple-600" />
                <span>
                  {latestShipment.delivery_type === 'direct'
                    ? `Direct Delivery (${latestShipment.driver_name || 'Driver Assigned'})`
                    : latestShipment.carrier_name || 'Courier Logistics'}
                </span>
              </div>

              {latestShipment.tracking_number && (
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-700">
                  <span>AWB: {latestShipment.tracking_number}</span>
                  <button
                    onClick={() => handleCopy(latestShipment.tracking_number!, 'Tracking Number')}
                    className="p-1 rounded text-zinc-400 hover:text-zinc-700"
                    title="Copy Tracking Number"
                  >
                    {copiedField === 'Tracking Number' ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {latestShipment.tracking_url && (
              <a
                href={latestShipment.tracking_url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 inline-flex items-center justify-center gap-1.5 transition-all self-start sm:self-auto"
              >
                <span>Track Package Live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Customer Action Bar: Share Details with Customers, Download Invoice & Expand Details */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {/* Share Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* WhatsApp Direct Share Button */}
          <button
            onClick={handleShareWhatsApp}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
            title="Share complete order details via WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white/20" />
            <span>Share via WhatsApp</span>
          </button>

          {/* Copy Full Details Button */}
          <button
            onClick={() => handleCopy(buildShareText(), 'Order Summary')}
            className="px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Copy full summary text to clipboard"
          >
            {copiedField === 'Order Summary' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Copied Details</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-500" />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          {/* Native Mobile Share if available */}
          {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
            <button
              onClick={handleNativeShare}
              className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200 text-xs transition-colors"
              title="Share Order"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          )}

          {/* GST Invoice PDF Download */}
          <a
            href={`/api/checkout/orders/${order.order_number || order.id}/invoice`}
            download
            className="px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
            title="Download GST Tax Invoice PDF"
          >
            <Download className="w-3.5 h-3.5 text-zinc-600" />
            <span>Tax Invoice</span>
          </a>
        </div>

        {/* Expand / Collapse Details Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-bold text-zinc-600 hover:text-zinc-900 inline-flex items-center gap-1 cursor-pointer py-1.5 px-2.5 rounded-lg hover:bg-zinc-100 transition-colors ml-auto"
        >
          <span>{isExpanded ? 'Hide Itemized Details' : 'View Products & Address'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expandable Section: Line Items and Destination Address */}
      {isExpanded && (
        <div className="pt-4 border-t border-zinc-100 space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Products Breakdown */}
            <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">
                Purchased Products ({items.length})
              </span>

              {items.length === 0 ? (
                <p className="text-xs text-zinc-500 italic">Custom Standing Desk Order</p>
              ) : (
                <div className="space-y-2">
                  {items.map((it) => (
                    <div
                      key={it.id}
                      className="p-2.5 bg-white border border-zinc-200 rounded-xl flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-zinc-900">{it.product_title}</div>
                        {it.variant_title && (
                          <div className="text-zinc-500 text-[11px]">Finish / Config: {it.variant_title}</div>
                        )}
                        <div className="text-[10px] text-zinc-400 font-mono">Qty: {it.quantity}</div>
                      </div>
                      <div className="font-mono font-bold text-zinc-900 text-right">
                        {formatPrice(parseFloat(String(it.line_total || it.unit_price || '0')), {
                          maximumFractionDigits: 0,
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Destination Address */}
            <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">
                Delivery Destination
              </span>

              {address ? (
                <div className="space-y-1.5 text-xs text-zinc-700">
                  <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{address.full_name || 'Customer'}</span>
                  </div>
                  {address.phone && (
                    <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[11px]">
                      <Phone className="w-3 h-3" />
                      <span>{address.phone}</span>
                    </div>
                  )}
                  <p className="text-zinc-600 leading-relaxed pt-1">
                    {address.line1}
                    {address.line2 ? `, ${address.line2}` : ''}
                    <br />
                    {address.city}, {address.state} - {address.postal_code}
                    <br />
                    {address.country || 'India'}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-zinc-500 italic">
                  Address details verified via direct delivery contact.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
