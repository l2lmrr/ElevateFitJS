// script.js
document.addEventListener('DOMContentLoaded', function() {
  const cartItems = document.querySelectorAll('.cart-item');
  const subtotalElem = document.getElementById('subtotal');
  const taxElem = document.getElementById('tax');
  const totalElem = document.getElementById('total');
  const TAX_RATE = 0.15;

  function updateCartTotals() {
    let subtotal = 0;
    cartItems.forEach(item => {
      const price = parseFloat(item.querySelector('.price').textContent);
      const quantity = parseInt(item.querySelector('.quantity-input').value);
      const itemSubtotal = price * quantity;
      item.querySelector('.item-subtotal').textContent = itemSubtotal.toFixed(2);
      subtotal += itemSubtotal;
    });
    subtotalElem.textContent = subtotal.toFixed(2);
    const tax = subtotal * TAX_RATE;
    taxElem.textContent = tax.toFixed(2);
    totalElem.textContent = (subtotal + tax).toFixed(2);
  }

  cartItems.forEach(item => {
    const decreaseBtn = item.querySelector('.decrease');
    const increaseBtn = item.querySelector('.increase');
    const quantityInput = item.querySelector('.quantity-input');
    const removeBtn = item.querySelector('.remove-btn');

    decreaseBtn.addEventListener('click', () => {
      if (quantityInput.value > 1) {
        quantityInput.value--;
        updateCartTotals();
      }
    });

    increaseBtn.addEventListener('click', () => {
      quantityInput.value++;
      updateCartTotals();
    });

    quantityInput.addEventListener('input', updateCartTotals);

    removeBtn.addEventListener('click', () => {
      item.remove();
      updateCartTotals();
    });
  });

  updateCartTotals();
});
