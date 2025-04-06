//@ts-ignore
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY as string)
/**
 * order controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::order.order',({strapi}) => ({
    async create(ctx) {
        //@ts-ignore
        const {products} = ctx.request.body
        
        try {
            const lineItems = await Promise.all(
                products.map(async(product: any) =>{
                    const response = await strapi
                    .service('api::product.product')
                    .find({ 
                        filters: { id: product.id },
                    });
                    const item = response.results[0];

                return {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: item.productName
                        },
                        unit_amount: Math.round(item.price * 100)
                    },
                    quantity: 1
                }
                })
            )
    
            const session = await stripe.checkout.sessions.create({
                shipping_address_collection: {allowed_countries: ['ES']},
                payment_method_types:['card'],
                mode: 'payment',
                success_url: `${process.env.CLIENT_URL}/success`,
                cancel_url: `${process.env.CLIENT_URL}/successError`,
                line_items: lineItems,
            })
    
        await strapi
        .service('api::order.order')
        .create({data: { products, stripeId: session.id } })
    
        return {stripeSession: session}
        } catch (error) {
            console.error("Error creating order:", error);
            ctx.response.status = 500;
        return { error: error.message };
        }
    }
}));
