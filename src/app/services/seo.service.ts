import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private defaultImage = '/assets/images/la-rivera-hero.jpg';
  private baseUrl = 'https://larivera.com'; // Update with actual domain

  constructor(
    private meta: Meta,
    private titleService: Title
  ) {}

  updateSEO(data: SEOData) {
    // Update title
    this.titleService.setTitle(data.title);

    // Update meta tags
    this.meta.updateTag({ name: 'description', content: data.description });
    
    if (data.keywords) {
      this.meta.updateTag({ name: 'keywords', content: data.keywords });
    }

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:image', content: data.image || this.defaultImage });
    this.meta.updateTag({ property: 'og:url', content: data.url || this.baseUrl });
    this.meta.updateTag({ property: 'og:type', content: data.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'La Rivera' });

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: data.image || this.defaultImage });

    // Additional SEO tags
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'author', content: 'La Rivera' });
    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
  }

  updateCanonicalUrl(url: string) {
    // Remove existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Add new canonical link
    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }

  addStructuredData(data: any) {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  generateBusinessStructuredData() {
    return {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": "La Rivera",
      "description": "Hermosos espacios para alquiler en un entorno natural único",
      "url": this.baseUrl,
      "telephone": "+57 300 123 4567",
      "email": "info@larivera.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Vereda La Rivera",
        "addressLocality": "Municipio",
        "addressRegion": "Departamento",
        "addressCountry": "CO"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "3.123456",
        "longitude": "-76.123456"
      },
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Piscina"
        },
        {
          "@type": "LocationFeatureSpecification", 
          "name": "Zona BBQ"
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Estacionamiento"
        }
      ],
      "priceRange": "$$$",
      "starRating": {
        "@type": "Rating",
        "ratingValue": "5"
      }
    };
  }
}
