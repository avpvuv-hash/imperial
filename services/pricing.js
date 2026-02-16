// Function to calculate price based on input parameters

function calculatePrice(basePrice, taxRate, discount) {
    const tax = basePrice * (taxRate / 100);
    const discountAmount = basePrice * (discount / 100);
    const finalPrice = basePrice + tax - discountAmount;
    return finalPrice;
}

// Example usage:
const price = calculatePrice(100, 5, 10);
console.log(price); // Outputs the final price after tax and discount