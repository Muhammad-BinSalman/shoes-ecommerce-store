// Utility to clear cartId cookie on the client (browser)
export function clearCartCookie() {
  document.cookie = 'cartId=; Max-Age=0; path=/;';
}
