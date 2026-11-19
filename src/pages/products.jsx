import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, RotateCcw, ArrowUpDown } from "lucide-react";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { getProducts } from "../services/productService";

const CATEGORIES = ["All", "Clothings", "Bags", "Flowers", "Toys", "Accessories"];

const PRICE_FILTERS = [
  { label: "All Prices", value: "All" },
  { label: "Under ₹300", value: "under300" },
  { label: "Under ₹500", value: "under500" },
  { label: "Under ₹1000", value: "under1000" },
  { label: "₹1000+", value: "above1000" },
];

const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating: High to Low", value: "rating-desc" },
  { label: "Name: A to Z", value: "name-asc" },
];

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const category = searchParams.get("category") || selectedCategory;
  const gender = searchParams.get("gender") || selectedGender;

  // Debounce search input for silky-smooth responsiveness
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 250);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch products from JSON Server
  const fetchProductList = () => {
    setLoading(true);
    setError("");

    getProducts()
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setError("Unable to load products. Please check if the server is running.");
        setLoading(false);
      });
  };

  useEffect(() => {
    let isMounted = true;

    getProducts()
      .then((data) => {
        if (isMounted) {
          setProducts(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        if (isMounted) {
          setError("Unable to load products. Please check if the server is running.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((product) => {
      // Search filter (case-insensitive)
      const matchesSearch = debouncedSearch
        ? product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        : true;

      // Category filter
      const matchesCategory =
        category === "All" ||
        product.category?.toLowerCase() === category.toLowerCase();

      // Gender filter (specifically for Clothings / Men / Women)
      const matchesGender =
        gender === "All" ||
        (product.gender &&
          product.gender.toLowerCase() === gender.toLowerCase()) ||
        product.name.toLowerCase().includes(gender.toLowerCase());

      // Price filter
      let matchesPrice = true;
      if (priceRange === "under300") {
        matchesPrice = product.price < 300;
      } else if (priceRange === "under500") {
        matchesPrice = product.price < 500;
      } else if (priceRange === "under1000") {
        matchesPrice = product.price < 1000;
      } else if (priceRange === "above1000") {
        matchesPrice = product.price >= 1000;
      }

      return matchesSearch && matchesCategory && matchesGender && matchesPrice;
    });

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-desc") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, debouncedSearch, category, gender, priceRange, sortBy]);

  const handleResetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setSelectedCategory("All");
    setSelectedGender("All");
    setPriceRange("All");
    setSortBy("default");
    setSearchParams({});
  };

  // Loading state
  if (loading) {
    return <Loader fullScreen message="Loading handcrafted pieces..." />;
  }

  // Error state
  if (error) {
    return (
      <section className="min-h-[60vh] bg-background flex items-center justify-center py-20">
        <Container>
          <div className="text-center max-w-md mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-text">
              Unable to Load Products
            </h2>
            <p className="text-muted mt-3 text-sm">{error}</p>
            <button
              onClick={fetchProductList}
              className="
                mt-6
                bg-primary
                text-white
                px-6
                py-2.5
                rounded-lg
                text-xs
                font-semibold
                tracking-[0.15em]
                uppercase
                hover:bg-primary-dark
                transition
              "
            >
              Try Again
            </button>
          </div>
        </Container>
      </section>
    );
  }

  const hasActiveFilters =
    search || category !== "All" || priceRange !== "All" || sortBy !== "default";

  return (
    <section className="py-16 md:py-24 bg-background min-h-screen">
      <Container>
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
            Handcrafted with Care
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-text mt-3">
            Our Crochet Collection
          </h1>

          <p className="text-muted mt-4 text-sm md:text-base leading-relaxed">
            Explore unique handmade crochet pieces designed with passion,
            timeless beauty, and attention to detail.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mt-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search crochet bags, flowers, toys..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                bg-white
                text-text
                text-sm
                border border-text/15
                rounded-full
                pl-12
                pr-6
                py-3.5
                outline-none
                focus:border-primary
                focus:ring-2
                focus:ring-primary/20
                shadow-sm
                transition
              "
            />
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-7">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                if (cat === "All") {
                  searchParams.delete("category");
                  setSearchParams(searchParams);
                } else {
                  setSearchParams({ category: cat });
                }
              }}
              className={`
                px-5
                py-2
                rounded-full
                text-xs
                font-semibold
                tracking-[0.1em]
                uppercase
                border
                transition-all
                duration-200
                ${
                  category === cat
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white border-text/15 text-text hover:border-primary hover:text-primary"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gender Filter Options when Clothing is active */}
        {(category.toLowerCase() === "clothings" || gender !== "All") && (
          <div className="flex items-center justify-center gap-2 mt-4 animate-in fade-in duration-200">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-muted mr-1">
              Clothing for:
            </span>
            {["All", "Men", "Women"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => {
                  setSelectedGender(g);
                  if (g === "All") {
                    searchParams.delete("gender");
                  } else {
                    searchParams.set("gender", g);
                  }
                  setSearchParams(searchParams);
                }}
                className={`
                  px-4 py-1 rounded-full text-xs font-semibold tracking-wide uppercase transition-all
                  ${
                    gender === g
                      ? "bg-text text-white shadow-sm"
                      : "bg-white text-muted border border-text/15 hover:text-text hover:border-text/30"
                  }
                `}
              >
                {g === "All" ? "All Styles" : g}
              </button>
            ))}
          </div>
        )}

        {/* Filters and Sorting Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pb-6 border-b border-text/10">
          {/* Left: Product Count */}
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="font-semibold text-text">
              {filteredAndSortedProducts.length}
            </span>
            <span>
              {filteredAndSortedProducts.length === 1
                ? "piece found"
                : "pieces found"}
            </span>
          </div>

          {/* Right: Controls (Price filter + Sorting + Reset) */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Price Filter */}
            <div className="flex items-center gap-1.5 bg-white border border-text/15 rounded-lg px-3 py-1.5 text-xs">
              <SlidersHorizontal size={14} className="text-muted" />
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="bg-transparent text-text outline-none cursor-pointer"
                aria-label="Filter by price"
              >
                {PRICE_FILTERS.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-1.5 bg-white border border-text/15 rounded-lg px-3 py-1.5 text-xs">
              <ArrowUpDown size={14} className="text-muted" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-text outline-none cursor-pointer"
                aria-label="Sort products"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="
                  flex items-center gap-1.5
                  text-xs font-semibold
                  tracking-wide
                  text-primary hover:text-primary-dark
                  px-2 py-1.5
                  transition
                "
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 rounded-2xl border border-text/10 mt-8 max-w-md mx-auto p-8">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 text-primary">
              <Search size={24} />
            </div>

            <h3 className="font-serif text-2xl text-text">
              No products found
            </h3>

            <p className="text-muted text-sm mt-2 leading-relaxed">
              We couldn&apos;t find any items matching your current filters. Try
              adjusting your search terms or clearing filters.
            </p>

            <button
              type="button"
              onClick={handleResetFilters}
              className="
                mt-6
                bg-primary
                text-white
                px-6
                py-2.5
                rounded-lg
                text-xs
                font-semibold
                tracking-[0.15em]
                uppercase
                hover:bg-primary-dark
                transition
              "
            >
              View All Products
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

export default Products;
