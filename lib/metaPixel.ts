// lib/metaPixel.ts
export const fbq = {
  pageView: () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }
  },
  viewContent: (payload: {
    content_ids: string[];
    content_name?: string;
    value?: number;
    currency?: string;
  }) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "ViewContent", payload);
    }
  },
  addToCart: (payload: {
    content_ids: string[];
    value: number;
    currency: string;
  }) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "AddToCart", payload);
    }
  },
  initiateCheckout: (payload: { value: number; currency: string }) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout", payload);
    }
  },
  purchase: (payload: {
    value: number;
    currency: string;
    order_id: string;
    content_ids?: string[];
  }) => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Purchase", payload);
    }
  },
};
