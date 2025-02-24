import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost', 'images.unsplash.com'], // Agrega aquí el dominio desde el cual se cargarán las imágenes
  },
};

export default nextConfig;
