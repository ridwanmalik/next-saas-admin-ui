"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
  Grid2X2, LayoutList, Search, ShoppingCart, SlidersHorizontal, Star, Heart, SortAsc,
} from "lucide-react"

type Product = {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  badge?: string
  inStock: boolean
}

const PRODUCTS: Product[] = [
  { id: 1,  name: "Wireless Noise-Cancelling Headphones", category: "Electronics",  price: 249, originalPrice: 329, rating: 4.8, reviews: 1240, image: "https://picsum.photos/seed/headphones/400/400",      badge: "Sale",    inStock: true  },
  { id: 2,  name: "Premium Smart Watch Series 5",         category: "Electronics",  price: 399,                    rating: 4.9, reviews: 876,  image: "https://picsum.photos/seed/smartwatch/400/400",    badge: "New",     inStock: true  },
  { id: 3,  name: "Mechanical Gaming Keyboard",           category: "Electronics",  price: 129, originalPrice: 159, rating: 4.7, reviews: 543,  image: "https://picsum.photos/seed/keyboard/400/400",      badge: "Sale",    inStock: true  },
  { id: 4,  name: "Ergonomic Laptop Stand",               category: "Accessories",  price: 79,                     rating: 4.6, reviews: 321,  image: "https://picsum.photos/seed/laptopstand/400/400",                     inStock: true  },
  { id: 5,  name: "Running Shoes Pro Elite",              category: "Footwear",     price: 189, originalPrice: 219, rating: 4.5, reviews: 2100, image: "https://picsum.photos/seed/runningshoe/400/400",   badge: "Sale",    inStock: true  },
  { id: 6,  name: "Minimalist Leather Backpack",          category: "Bags",         price: 149,                    rating: 4.8, reviews: 654,  image: "https://picsum.photos/seed/backpackleather/400/400", badge: "Popular", inStock: true  },
  { id: 7,  name: "Portable Bluetooth Speaker",           category: "Electronics",  price: 89,  originalPrice: 119, rating: 4.4, reviews: 987,  image: "https://picsum.photos/seed/btspeaker/400/400",    badge: "Sale",    inStock: true  },
  { id: 8,  name: "Stainless Steel Water Bottle",         category: "Accessories",  price: 39,                     rating: 4.7, reviews: 3200, image: "https://picsum.photos/seed/waterbottle/400/400",                     inStock: true  },
  { id: 9,  name: "Polarized Sunglasses",                 category: "Accessories",  price: 119,                    rating: 4.5, reviews: 432,  image: "https://picsum.photos/seed/sunglasses/400/400",                      inStock: true  },
  { id: 10, name: "Woolen Winter Jacket",                 category: "Clothing",     price: 299, originalPrice: 399, rating: 4.6, reviews: 287,  image: "https://picsum.photos/seed/winterjacket/400/400", badge: "Sale",    inStock: false },
  { id: 11, name: "Ceramic Coffee Mug Set",               category: "Home",         price: 49,                     rating: 4.9, reviews: 1560, image: "https://picsum.photos/seed/coffeemug/400/400",    badge: "Popular", inStock: true  },
  { id: 12, name: "Yoga Mat Premium Thick",               category: "Sports",       price: 69,  originalPrice: 89,  rating: 4.8, reviews: 812,  image: "https://picsum.photos/seed/yogamat/400/400",     badge: "Sale",    inStock: true  },
]

const CATEGORIES = ["All", "Electronics", "Accessories", "Footwear", "Bags", "Clothing", "Home", "Sports"]
const SORT_OPTIONS = [
  { label: "Newest",          value: "newest"     },
  { label: "Price: Low–High", value: "price-asc"  },
  { label: "Price: High–Low", value: "price-desc" },
  { label: "Top Rated",       value: "rating"     },
  { label: "Most Reviews",    value: "reviews"    },
]
const PRICE_RANGES = [
  { label: "All Prices",  min: 0,   max: Infinity },
  { label: "Under $50",   min: 0,   max: 50       },
  { label: "$50 – $100",  min: 50,  max: 100      },
  { label: "$100 – $200", min: 100, max: 200      },
  { label: "Over $200",   min: 200, max: Infinity },
]

const StarRow = ({ rating }: { rating: number }) => (
  <span className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={cn("h-3.5 w-3.5", i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30")} />
    ))}
  </span>
)

const FilterPanel = ({
  category, setCategory, priceRange, setPriceRange, minRating, setMinRating, onClear,
}: {
  category: string
  setCategory: (v: string) => void
  priceRange: number
  setPriceRange: (v: number) => void
  minRating: number
  setMinRating: (v: number) => void
  onClear: () => void
}) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</p>
      <div className="space-y-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors",
              category === cat
                ? "bg-primary text-primary-foreground font-medium"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <span>{cat}</span>
            <span className="text-xs opacity-70">
              {cat === "All" ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat).length}
            </span>
          </button>
        ))}
      </div>
    </div>

    <Separator />

    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price Range</p>
      <div className="space-y-1">
        {PRICE_RANGES.map((range, i) => (
          <button
            key={range.label}
            onClick={() => setPriceRange(i)}
            className={cn(
              "flex w-full items-center rounded-md px-2 py-1.5 text-sm transition-colors",
              priceRange === i
                ? "bg-primary text-primary-foreground font-medium"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>

    <Separator />

    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Min Rating</p>
      <div className="space-y-1">
        {[0, 3, 4, 4.5].map(r => (
          <button
            key={r}
            onClick={() => setMinRating(r)}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
              minRating === r
                ? "bg-primary text-primary-foreground font-medium"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {r === 0 ? <span>All Ratings</span> : <><StarRow rating={r} /><span>& up</span></>}
          </button>
        ))}
      </div>
    </div>

    <Separator />

    <Button variant="outline" size="sm" className="w-full" onClick={onClear}>
      Clear Filters
    </Button>
  </div>
)

const ProductsPage = () => {
  const [search, setSearch]       = useState("")
  const [category, setCategory]   = useState("All")
  const [priceRange, setPriceRange] = useState(0)
  const [minRating, setMinRating] = useState(0)
  const [sort, setSort]           = useState("newest")
  const [view, setView]           = useState<"grid" | "list">("grid")
  const [wishlist, setWishlist]   = useState<Set<number>>(new Set())

  const activeFilterCount = (category !== "All" ? 1 : 0) + (priceRange !== 0 ? 1 : 0) + (minRating !== 0 ? 1 : 0)

  const clearFilters = () => { setCategory("All"); setPriceRange(0); setMinRating(0); setSearch("") }

  const filtered = useMemo(() => {
    const range = PRICE_RANGES[priceRange]
    let result = PRODUCTS.filter(p =>
      (category === "All" || p.category === category) &&
      p.price >= range.min && p.price <= range.max &&
      p.rating >= minRating &&
      (search === "" || p.name.toLowerCase().includes(search.toLowerCase()))
    )
    if (sort === "price-asc")  result = [...result].sort((a, b) => a.price - b.price)
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price)
    if (sort === "rating")     result = [...result].sort((a, b) => b.rating - a.rating)
    if (sort === "reviews")    result = [...result].sort((a, b) => b.reviews - a.reviews)
    return result
  }, [search, category, priceRange, minRating, sort])

  const toggleWishlist = (id: number) =>
    setWishlist(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Shop</h2>
          <p className="text-muted-foreground">Browse our collection of {PRODUCTS.length} products.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Filter drawer trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 overflow-y-auto">
            <SheetHeader className="mb-4">
              <SheetTitle className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </SheetTitle>
            </SheetHeader>
            <FilterPanel
              category={category} setCategory={setCategory}
              priceRange={priceRange} setPriceRange={setPriceRange}
              minRating={minRating} setMinRating={setMinRating}
              onClear={clearFilters}
            />
          </SheetContent>
        </Sheet>

        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <SortAsc className="h-4 w-4" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="rounded-md border bg-background px-2 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center rounded-md border">
          <button
            onClick={() => setView("grid")}
            className={cn("rounded-l-md p-2 transition-colors", view === "grid" ? "bg-muted" : "hover:bg-muted/50")}
          >
            <Grid2X2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={cn("rounded-r-md p-2 transition-colors", view === "list" ? "bg-muted" : "hover:bg-muted/50")}
          >
            <LayoutList className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground ml-auto">{filtered.length} products</p>
      </div>

      {/* Grid View */}
      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map(product => (
            <Card key={product.id} className="group overflow-hidden gap-0 p-0">
              <div className="relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.badge && (
                  <Badge className="absolute left-3 top-3 text-xs" variant={product.badge === "Sale" ? "destructive" : "default"}>
                    {product.badge}
                  </Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                    <Badge variant="secondary">Out of Stock</Badge>
                  </div>
                )}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute right-3 top-3 rounded-full bg-background/80 p-1.5 backdrop-blur-sm transition-colors hover:bg-background"
                >
                  <Heart className={cn("h-4 w-4", wishlist.has(product.id) ? "fill-rose-500 text-rose-500" : "text-muted-foreground")} />
                </button>
              </div>
              <CardContent className="p-4 pb-3 space-y-1.5">
                <p className="text-xs text-muted-foreground">{product.category}</p>
                <p className="font-semibold leading-tight line-clamp-2">{product.name}</p>
                <div className="flex items-center gap-1.5">
                  <StarRow rating={product.rating} />
                  <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>
                <Button size="sm" disabled={!product.inStock}>
                  <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                  Add
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filtered.map(product => (
            <Card key={product.id} className="group overflow-hidden gap-0 p-0">
              <div className="flex items-center gap-4 p-3">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.badge && (
                    <Badge className="absolute left-1 top-1 text-[10px] px-1 py-0" variant={product.badge === "Sale" ? "destructive" : "default"}>
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                  <p className="font-semibold leading-tight">{product.name}</p>
                  <div className="flex items-center gap-1.5">
                    <StarRow rating={product.rating} />
                    <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
                  </div>
                  {!product.inStock && <Badge variant="secondary" className="text-xs">Out of Stock</Badge>}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleWishlist(product.id)}>
                      <Heart className={cn("h-4 w-4", wishlist.has(product.id) ? "fill-rose-500 text-rose-500" : "text-muted-foreground")} />
                    </button>
                    <Button size="sm" disabled={!product.inStock}>
                      <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Search className="h-10 w-10 mb-3 opacity-30" />
          <p className="text-sm">No products match your filters.</p>
          <Button variant="link" size="sm" onClick={clearFilters}>Clear all filters</Button>
        </div>
      )}
    </div>
  )
}

export default ProductsPage
