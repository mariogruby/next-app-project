export function formatPrice(price: number) {
    const priceFormatted = new Intl.NumberFormat('es-Es', {
        style: "currency",
        currency: "EUR"
    })

    const finalPrice = priceFormatted.format(price)

    return finalPrice
}