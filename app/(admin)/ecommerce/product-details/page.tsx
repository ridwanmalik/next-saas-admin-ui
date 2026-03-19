"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  ArrowLeft, Heart, Minus, Plus, ShoppingCart, Star, ChevronDown, ChevronUp, Truck, Shield, RefreshCw,
} from "lucide-react"

const PRODUCT = {
  name: "Apple Series 4 GPS A38 MM Space",
  subtitle: "Apple Watch SE Smartwatch",
  status: "In Stock",
  badge: "New",
  price: 275,
  originalPrice: 329,
  rating: 3.5,
  reviews: 4,
  description: "The Apple Watch Series 4 features an all-new design with a larger display, faster performance, and advanced health monitoring including electrical heart sensor.",
  colors: ["#ef4444", "#dc2626", "#7c3aed"],
  sizes: ["XS", "S", "M", "L", "XL"],
  images: [
    "https://picsum.photos/seed/watch-main/600/600",
    "https://picsum.photos/seed/watch-alt1/600/600",
    "https://picsum.photos/seed/watch-alt2/600/600",
    "https://picsum.photos/seed/watch-alt3/600/600",
  ],
  specs: {
    general: [
      { label: "Type",           value: "Smartwatch" },
      { label: "Display",        value: "Retina LTPO OLED" },
      { label: "Case Size",      value: "38mm / 44mm" },
      { label: "Water Resistance", value: "50 metres" },
      { label: "Connectivity",   value: "Wi-Fi, Bluetooth 5.0" },
      { label: "Compatibility",  value: "iPhone 6s or later" },
      { label: "Battery Life",   value: "Up to 18 hours" },
      { label: "OS",             value: "watchOS 7" },
    ],
    inTheBox: [
      { label: "Sales Package",    value: "1 Unit" },
      { label: "Charging Cable",   value: "Magnetic USB" },
      { label: "Band",             value: "Sport Band" },
      { label: "Documentation",    value: "Quick Start Guide" },
    ],
  },
  reviews_list: [
    { author: "Alex Kim",    avatar: "https://i.pravatar.cc/40?img=3",  rating: 5, date: "Jan 28, 2026", body: "Absolutely love this watch. The display is stunning and the health features are top-notch." },
    { author: "Maria Ortiz", avatar: "https://i.pravatar.cc/40?img=9",  rating: 4, date: "Jan 15, 2026", body: "Great product overall. Battery life is decent but could be better for heavy users." },
    { author: "Tom Nguyen",  avatar: "https://i.pravatar.cc/40?img=12", rating: 3, date: "Dec 30, 2025", body: "Good watch but pricey. The setup was straightforward and the UI is smooth." },
    { author: "Sarah Lee",   avatar: "https://i.pravatar.cc/40?img=6",  rating: 4, date: "Dec 12, 2025", body: "Exactly as described. Looks premium and the fitness tracking is accurate." },
  ],
  related: [
    { name: "Boat On-Ear Wireless",   price: 81.99,                    rating: 4.5, reviews: 82,  image: "https://picsum.photos/seed/boat-headphone/400/400" },
    { name: "Apple iPhone 13 Mini",   price: 86.99,                    rating: 4.5, reviews: 87,  image: "https://picsum.photos/seed/iphone13mini/400/400"  },
    { name: "Apple iPhone 13 Pro",    price: 100,   originalPrice: 129, rating: 4.5, reviews: 100, image: "https://picsum.photos/seed/iphone13pro/400/400"   },
    { name: "Sony WH-1000XM4",        price: 279,                      rating: 4.8, reviews: 215, image: "https://picsum.photos/seed/sony-headphone/400/400" },
  ],
}

const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) => {
  const cls = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5"
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn(cls, i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : i < rating ? "fill-amber-200 text-amber-400" : "text-muted-foreground/30")} />
      ))}
    </span>
  )
}

const ProductDetailsPage = () => {
  const [selectedImage, setSelectedImage]   = useState(0)
  const [selectedColor, setSelectedColor]   = useState(0)
  const [selectedSize, setSelectedSize]     = useState("")
  const [quantity, setQuantity]             = useState(1)
  const [wishlisted, setWishlisted]         = useState(false)
  const [activeTab, setActiveTab]           = useState<"description" | "reviews">("description")
  const [specsOpen, setSpecsOpen]           = useState(true)
  const [washOpen, setWashOpen]             = useState(false)
  const [addonsOpen, setAddonsOpen]         = useState(false)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/ecommerce/products"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Product Details</h2>
          <p className="text-muted-foreground">View and manage product information</p>
        </div>
      </div>

      {/* Main product card */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left — Images */}
            <div className="space-y-3">
              <div className="relative overflow-hidden rounded-xl bg-muted aspect-square">
                <Image
                  src={PRODUCT.images[selectedImage]}
                  alt={PRODUCT.name}
                  fill
                  className="object-cover transition-opacity duration-200"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setWishlisted(p => !p)}
                  className="absolute right-3 top-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                >
                  <Heart className={cn("h-5 w-5", wishlisted ? "fill-rose-500 text-rose-500" : "text-muted-foreground")} />
                </Button>
              </div>
              <div className="flex gap-2">
                {PRODUCT.images.map((img, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 p-0 transition-colors",
                      selectedImage === i ? "border-primary" : "border-transparent hover:border-muted-foreground/30"
                    )}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Right — Info */}
            <div className="space-y-5">
              {/* Status + badge */}
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-emerald-600 border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20">
                  {PRODUCT.status}
                </Badge>
                {PRODUCT.badge && <Badge>{PRODUCT.badge}</Badge>}
              </div>

              {/* Title */}
              <div className="space-y-1">
                <h1 className="text-2xl font-bold leading-tight">{PRODUCT.name}</h1>
                <p className="text-muted-foreground text-sm">{PRODUCT.subtitle}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <StarRating rating={PRODUCT.rating} size="md" />
                <span className="text-sm text-muted-foreground">({PRODUCT.reviews})</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">${PRODUCT.price}</span>
                {PRODUCT.originalPrice && (
                  <span className="text-base text-muted-foreground line-through">${PRODUCT.originalPrice}</span>
                )}
                <span className="text-xs text-muted-foreground">(Inclusive of all taxes)</span>
              </div>

              <Separator />

              {/* Colors */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Colors <span className="text-destructive">*</span></p>
                <div className="flex items-center gap-2">
                  {PRODUCT.colors.map((color, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedColor(i)}
                      style={{ backgroundColor: color }}
                      className={cn(
                        "h-7 w-7 rounded-full p-0 transition-all",
                        selectedColor === i ? "ring-2 ring-offset-2 ring-foreground" : "hover:scale-110"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Size <span className="text-destructive">*</span></p>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs">Size Chart?</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT.sizes.map(size => (
                    <Button
                      key={size}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        selectedSize === size && "border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                      )}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Quantity</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-md border">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="h-9 w-9 rounded-r-none"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(q => q + 1)}
                      className="h-9 w-9 rounded-l-none"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <span className="text-xs text-muted-foreground">Only 12 items left</span>
                </div>
              </div>

              <Separator />

              {/* CTA buttons */}
              <div className="flex gap-3">
                <Button className="flex-1 gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="secondary" className="flex-1">
                  Buy Now
                </Button>
              </div>

              {/* Perks */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                {[
                  { icon: Truck,      label: "Free Delivery",   sub: "Orders over $100"  },
                  { icon: Shield,     label: "1 Year Warranty", sub: "Full coverage"      },
                  { icon: RefreshCw,  label: "Easy Returns",    sub: "30-day policy"      },
                ].map(perk => (
                  <div key={perk.label} className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 p-3 text-center">
                    <perk.icon className="h-4 w-4 text-primary" />
                    <p className="text-xs font-medium leading-tight">{perk.label}</p>
                    <p className="text-[10px] text-muted-foreground">{perk.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description / Reviews tabs */}
      <Card className="gap-0">
        {/* Tab bar */}
        <div className="flex border-b px-6">
          {(["description", "reviews"] as const).map(tab => (
            <Button
              key={tab}
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative h-auto rounded-none py-3 pr-6 text-sm font-medium capitalize transition-colors",
                activeTab === tab
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-6 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
              {tab === "reviews" && (
                <span className="ml-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                  {PRODUCT.reviews_list.length}
                </span>
              )}
            </Button>
          ))}
        </div>

        <CardContent className="p-6">
          {activeTab === "description" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{PRODUCT.description}</p>

              {/* Specification accordion */}
              {[
                {
                  label: "Specification",
                  open: specsOpen,
                  toggle: () => setSpecsOpen(p => !p),
                  content: (
                    <div className="grid gap-6 sm:grid-cols-2 pt-4">
                      <div>
                        <p className="text-sm font-semibold mb-3">General</p>
                        <div className="space-y-2">
                          {PRODUCT.specs.general.map(row => (
                            <div key={row.label} className="grid grid-cols-2 gap-2 text-sm">
                              <span className="text-muted-foreground">{row.label}</span>
                              <span className="font-medium">{row.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-3">In The Box</p>
                        <div className="space-y-2">
                          {PRODUCT.specs.inTheBox.map(row => (
                            <div key={row.label} className="grid grid-cols-2 gap-2 text-sm">
                              <span className="text-muted-foreground">{row.label}</span>
                              <span className="font-medium">{row.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  label: "Material and Wash Instruction",
                  open: washOpen,
                  toggle: () => setWashOpen(p => !p),
                  content: (
                    <p className="text-sm text-muted-foreground pt-4">
                      Hand wash cold with similar colors. Do not bleach. Tumble dry low. Cool iron if needed. Do not dry clean.
                    </p>
                  ),
                },
                {
                  label: "Add-on Data",
                  open: addonsOpen,
                  toggle: () => setAddonsOpen(p => !p),
                  content: (
                    <p className="text-sm text-muted-foreground pt-4">
                      Extended warranty available at checkout. Compatible accessories sold separately. Gift wrapping option available.
                    </p>
                  ),
                },
              ].map(section => (
                <div key={section.label} className="rounded-lg border">
                  <Button
                    variant="ghost"
                    onClick={section.toggle}
                    className="flex w-full items-center justify-between px-4 py-3 h-auto text-sm font-medium rounded-lg"
                  >
                    {section.label}
                    {section.open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                  </Button>
                  {section.open && (
                    <div className="px-4 pb-4">
                      <Separator className="mb-0" />
                      {section.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="flex items-center gap-6 rounded-lg bg-muted/40 p-4">
                <div className="text-center">
                  <p className="text-5xl font-bold">{PRODUCT.rating}</p>
                  <StarRating rating={PRODUCT.rating} size="md" />
                  <p className="text-xs text-muted-foreground mt-1">{PRODUCT.reviews} reviews</p>
                </div>
                <Separator orientation="vertical" className="h-16" />
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map(star => {
                    const count = PRODUCT.reviews_list.filter(r => r.rating === star).length
                    const pct = PRODUCT.reviews_list.length ? (count / PRODUCT.reviews_list.length) * 100 : 0
                    return (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <span className="w-3 text-right text-muted-foreground">{star}</span>
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-4 text-muted-foreground">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Review list */}
              <div className="space-y-5">
                {PRODUCT.reviews_list.map((r, i) => (
                  <div key={i}>
                    <div className="flex gap-3">
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                        <Image src={r.avatar} alt={r.author} fill className="object-cover" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold">{r.author}</span>
                          <StarRating rating={r.rating} />
                          <span className="text-xs text-muted-foreground">{r.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{r.body}</p>
                      </div>
                    </div>
                    {i < PRODUCT.reviews_list.length - 1 && <Separator className="mt-5" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Related Products */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Related Products</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT.related.map((p, i) => (
            <Link key={i} href="/ecommerce/product-details">
              <Card className="group overflow-hidden gap-0 p-0 hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <CardContent className="p-4 space-y-2">
                  <p className="text-sm font-semibold leading-tight line-clamp-1">{p.name}</p>
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={p.rating} />
                    <span className="text-xs text-muted-foreground">({p.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-bold">${p.price}</span>
                      {"originalPrice" in p && p.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">${p.originalPrice}</span>
                      )}
                    </div>
                    <Button size="icon" variant="outline" className="h-7 w-7">
                      <ShoppingCart className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage
