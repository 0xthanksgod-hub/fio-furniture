import { FormEvent, useEffect, useState } from "react";

type Page = "home" | "shop" | "product";
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: string;
  image: string;
  color: string;
};

const photos = {
  hero: "https://images.unsplash.com/photo-1776186243326-1d467b258232?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=88&w=1800",
  room: "https://images.unsplash.com/photo-1750639258774-9a714379a093?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400",
  dining: "https://images.unsplash.com/photo-1770646403987-64cf5c08c870?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  chair: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1000",
  studio: "https://images.unsplash.com/photo-1712668401428-df42b8bd93fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  bench: "https://images.unsplash.com/photo-1765282745950-99c5abe761f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1000",
  wicker: "https://images.unsplash.com/photo-1648993880083-3080b2110bc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1000",
  table: "https://images.unsplash.com/photo-1648994517762-15aae4c01ce7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1000",
  minimal: "https://images.unsplash.com/photo-1764349109503-af3c316f85c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1000",
  bright: "https://images.unsplash.com/photo-1719760518176-e124a5bcd025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
};

const products: Product[] = [
  { id: 1, name: "Onda Lounge Chair", category: "Chair", price: 890, rating: "4.9", image: photos.chair, color: "Natural Bouclé" },
  { id: 2, name: "Forma Modular Sofa", category: "Sofa", price: 2480, rating: "4.8", image: photos.room, color: "Warm Ivory" },
  { id: 3, name: "Luna Side Table", category: "Table", price: 420, rating: "4.9", image: photos.table, color: "Travertine" },
  { id: 4, name: "Arco Reading Chair", category: "Chair", price: 740, rating: "4.7", image: photos.wicker, color: "Natural Weave" },
  { id: 5, name: "Tavola Dining Table", category: "Table", price: 1680, rating: "4.8", image: photos.dining, color: "Smoked Oak" },
  { id: 6, name: "Linea Daybed", category: "Bed", price: 1320, rating: "4.9", image: photos.bench, color: "Oat Linen" },
  { id: 7, name: "Quiet Floor Lamp", category: "Lighting", price: 390, rating: "4.6", image: photos.studio, color: "Brushed Brass" },
  { id: 8, name: "Sera Console", category: "Storage", price: 980, rating: "4.8", image: photos.minimal, color: "Ash Wood" },
];

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    truck: <><path d="M3 6h11v11H3z" /><path d="M14 10h4l3 3v4h-7z" /><circle cx="7" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></>,
    return: <><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 3v6h6" /></>,
    leaf: <><path d="M20 4C12 4 5 8 5 15c0 3 2 5 5 5 7 0 10-8 10-16Z" /><path d="M4 21c3-6 7-9 12-12" /></>,
    pencil: <><path d="m4 16-1 5 5-1L20 8l-4-4L4 16Z" /><path d="m14 6 4 4" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    grid: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" /></>,
    facebook: <path d="M14 8h4V3h-4c-4 0-6 2-6 6v3H4v5h4v7h5v-7h4l1-5h-5V9c0-1 .4-1 1-1Z" />,
    pinterest: <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-1.7 0-3.6.4-5.1l1.3-5.4s-.3-.7-.3-1.8c0-1.7 1-3 2.2-3 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4-.3 1.2.6 2.2 1.8 2.2 2.2 0 3.8-2.3 3.8-5.6 0-2.9-2.1-5-5.1-5-3.5 0-5.5 2.6-5.5 5.3 0 1 .4 2.1.9 2.7.1.1.1.2.1.4l-.3 1.2c-.1.4-.4.5-.8.3-1.9-.9-3-3.5-3-5.6 0-4.6 3.3-8.8 9.6-8.8 5 0 9 3.6 9 8.4 0 5-3.1 9-7.5 9-1.5 0-2.8-.8-3.3-1.7l-.9 3.4c-.3 1.2-1.2 2.8-1.8 3.7.8.2 1.7.3 2.5.3A10 10 0 0 0 12 2Z" />,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Logo({ onClick, light = false }: { onClick: () => void; light?: boolean }) {
  return <button className={`logo ${light ? "logo--light" : ""}`} onClick={onClick} aria-label="Fio home"><span>Fio</span><small>Home Furniture</small></button>;
}

function Button({ children, variant = "dark", onClick, type = "button" }: { children: React.ReactNode; variant?: "dark" | "light" | "outline"; onClick?: () => void; type?: "button" | "submit" }) {
  return <button type={type} className={`button button--${variant}`} onClick={onClick}>{children}<Icon name="arrow" size={17} /></button>;
}

function Navbar({ page, goTo, cartCount }: { page: Page; goTo: (page: Page) => void; cartCount: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const homeTop = page === "home" && !scrolled;
  const navigate = (target: Page) => { setMenuOpen(false); goTo(target); };
  return (
    <>
      <header className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${homeTop ? "navbar--hero" : ""}`}>
        <Logo onClick={() => navigate("home")} light={homeTop} />
        <nav className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
          {[["Home", "home"], ["Shop", "shop"], ["Collections", "home"], ["About", "home"], ["Contact", "home"]].map(([label, target]) => (
            <button key={label} className={page === target && label !== "Collections" ? "active" : ""} onClick={() => {
              navigate(target as Page);
              if (label === "Collections") setTimeout(() => document.querySelector("#categories")?.scrollIntoView(), 50);
              if (label === "About") setTimeout(() => document.querySelector("#collection")?.scrollIntoView(), 50);
              if (label === "Contact") setTimeout(() => document.querySelector("#footer")?.scrollIntoView(), 50);
            }}>{label}</button>
          ))}
        </nav>
        <div className="nav-actions">
          <button aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Icon name="search" /></button>
          <button aria-label={`Cart with ${cartCount} items`} className="bag-button"><Icon name="bag" />{cartCount > 0 && <span>{cartCount}</span>}</button>
          <button className={`menu-toggle ${menuOpen ? "is-open" : ""}`} aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
        </div>
      </header>
      <div className={`search-panel ${searchOpen ? "search-panel--open" : ""}`}>
        <Icon name="search" size={22} /><input autoFocus={searchOpen} placeholder="Search furniture, rooms, collections..." /><button onClick={() => setSearchOpen(false)}>Close</button>
      </div>
    </>
  );
}

function ProductCard({ product, viewProduct, addToCart }: { product: Product; viewProduct: (p: Product) => void; addToCart: () => void }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="product-card">
      <div className="product-image" onClick={() => viewProduct(product)}>
        <img src={product.image} alt={product.name} />
        <span className="product-badge">New</span>
        <button className={`heart ${liked ? "heart--active" : ""}`} onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} aria-label="Add to wishlist"><Icon name="heart" size={18} /></button>
        <button className="add-cart" onClick={(e) => { e.stopPropagation(); addToCart(); }}>Add to cart <Icon name="plus" size={16} /></button>
      </div>
      <div className="product-meta" onClick={() => viewProduct(product)}>
        <div><p>{product.category}</p><h3>{product.name}</h3></div>
        <div className="product-price"><span>★ {product.rating}</span><strong>${product.price.toLocaleString()}</strong></div>
      </div>
    </article>
  );
}

function SectionHeading({ eyebrow, title, action, onAction }: { eyebrow: string; title: string; action?: string; onAction?: () => void }) {
  return <div className="section-heading reveal"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{action && <button className="text-link" onClick={onAction}>{action}<Icon name="arrow" size={17} /></button>}</div>;
}

function HomePage({ goTo, viewProduct, addToCart }: { goTo: (page: Page) => void; viewProduct: (p: Product) => void; addToCart: () => void }) {
  const [testimonial, setTestimonial] = useState(0);
  const testimonials = [
    ["Fio completely changed the feeling of our home. Every piece is quietly beautiful, incredibly comfortable, and feels like it has always belonged here.", "Maya Chen", "Interior stylist"],
    ["The quality is immediately apparent. From the fabric to the joinery, our sofa has the considered detail of something we will keep for decades.", "Amelia Ross", "Fio customer"],
    ["Their design team helped us find exactly the right proportions. The result feels personal, warm, and wonderfully unforced.", "James Bennett", "Architect"],
  ];
  const categories = [
    ["Sofa", photos.room], ["Chair", photos.chair], ["Table", photos.dining],
    ["Bed", photos.bench], ["Storage", photos.minimal], ["Lighting", photos.studio],
  ];
  return (
    <>
      <section className="hero">
        <div className="hero-copy reveal">
          <p className="eyebrow">The considered collection · 2025</p>
          <h1>Furniture That Makes Home <em>Feel Like You</em></h1>
          <p className="hero-description">Thoughtfully designed furniture that brings warmth, character, and quiet beauty into the rhythm of everyday life.</p>
          <div className="hero-buttons"><Button onClick={() => goTo("shop")}>Shop now</Button><Button variant="outline" onClick={() => document.querySelector("#categories")?.scrollIntoView()}>View collection</Button></div>
          <div className="hero-note"><span>Made thoughtfully</span><span>Designed to last</span><span>Delivered with care</span></div>
        </div>
        <div className="hero-visual">
          <img className="parallax-image" src={photos.hero} alt="Warm modern living room with sculptural furniture" />
          <div className="floating-product floating-product--one"><img src={photos.chair} alt="" /><div><small>Most loved</small><strong>Onda Chair</strong><span>$890</span></div></div>
          <div className="floating-product floating-product--two"><span className="material-dot" /><div><small>Natural texture</small><strong>Italian bouclé</strong></div></div>
          <div className="hero-count"><strong>01</strong><span />04</div>
        </div>
      </section>

      <section id="categories" className="section-shell categories-section">
        <SectionHeading eyebrow="Shop your way" title="Made for every room" action="Explore all" onAction={() => goTo("shop")} />
        <div className="category-row">
          {categories.map(([name, image]) => <button className="category-card reveal" key={name} onClick={() => goTo("shop")}><img src={image} alt={`${name} furniture`} /><span>{name}<i><Icon name="chevron" size={14} /></i></span></button>)}
        </div>
      </section>

      <section className="section-shell products-section">
        <SectionHeading eyebrow="Objects of lasting value" title="Featured pieces" action="Shop all furniture" onAction={() => goTo("shop")} />
        <div className="product-grid">{products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} viewProduct={viewProduct} addToCart={addToCart} />)}</div>
      </section>

      <section id="collection" className="collection-highlight">
        <div className="collection-image reveal"><img src={photos.dining} alt="Sunlit oak dining table and chairs" /><span>01 — 08</span></div>
        <div className="collection-copy reveal"><p className="eyebrow">The gathering collection</p><h2>Made for the moments that <em>bring us together.</em></h2><p>Warm timber, softened edges, and generous proportions shape a collection made for long dinners, slow mornings, and everything shared between.</p><button className="text-link" onClick={() => goTo("shop")}>Explore collection <Icon name="arrow" size={17} /></button></div>
        <div className="collection-small-image"><img src={photos.table} alt="Simple table detail with flowers" /></div>
      </section>

      <section className="section-shell why-section">
        <SectionHeading eyebrow="The Fio difference" title="Considered in every detail" />
        <div className="feature-grid">
          {[
            ["leaf", "Quality materials", "Natural, durable materials selected for beauty and longevity."],
            ["truck", "Free shipping", "Complimentary delivery on every order over $500."],
            ["return", "Easy returns", "A simple 30-day return process, made entirely stress-free."],
            ["pencil", "Custom design", "Personalized finishes and guidance for a piece truly your own."],
          ].map(([icon, title, text]) => <div className="feature-card reveal" key={title}><span><Icon name={icon} size={23} /></span><h3>{title}</h3><p>{text}</p></div>)}
        </div>
      </section>

      <section className="inspiration section-shell">
        <SectionHeading eyebrow="Spaces to live in" title="Room inspiration" action="View the journal" />
        <div className="masonry">
          {[photos.room, photos.studio, photos.hero, photos.dining, photos.bright].map((image, i) => <div className={`gallery-item gallery-item--${i + 1} reveal`} key={image}><img src={image} alt={["Soft neutral living room", "Minimal reading corner", "Curved sofa interior", "Warm dining room", "Bright contemporary lounge"][i]} /><div><span>{["Quiet Living", "The Art of Pause", "Soft Geometry", "Gathered Warmth", "Light & Space"][i]}</span><Icon name="arrow" size={18} /></div></div>)}
        </div>
      </section>

      <section className="testimonial-section">
        <div className="testimonial-photo"><img src={photos.wicker} alt="Warm reading chair interior" /></div>
        <div className="testimonial-content">
          <p className="eyebrow">Homes, beautifully lived</p>
          <div className="stars">★★★★★</div>
          <blockquote>“{testimonials[testimonial][0]}”</blockquote>
          <div className="testimonial-footer"><div><strong>{testimonials[testimonial][1]}</strong><span>{testimonials[testimonial][2]}</span></div><div className="slider-controls"><button aria-label="Previous testimonial" onClick={() => setTestimonial((testimonial + 2) % 3)}>←</button><span>{testimonial + 1} / 3</span><button aria-label="Next testimonial" onClick={() => setTestimonial((testimonial + 1) % 3)}>→</button></div></div>
        </div>
      </section>
    </>
  );
}

function ShopPage({ viewProduct, addToCart }: { viewProduct: (p: Product) => void; addToCart: () => void }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Sofa", "Chair", "Table", "Bed", "Storage", "Lighting"];
  const visible = filter === "All" ? products : products.filter(p => p.category === filter);
  return (
    <main className="inner-page">
      <div className="shop-hero reveal"><p className="eyebrow">The Fio collection</p><h1>Objects for <em>everyday living.</em></h1><p>Timeless furniture, considered in every detail and made to live beautifully with you.</p></div>
      <div className="shop-toolbar"><div className="filters">{filters.map(item => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><div className="result-count"><Icon name="grid" size={16} /> {visible.length} pieces</div></div>
      <div className="shop-grid">{visible.map(p => <ProductCard key={p.id} product={p} viewProduct={viewProduct} addToCart={addToCart} />)}</div>
      <div className="shop-editorial"><img src={photos.bright} alt="Serene modern interior" /><div><p className="eyebrow">Complimentary styling</p><h2>Need a little help finding the right piece?</h2><p>Our design team is here to help you shape a home that feels entirely your own.</p><Button variant="light">Book a consultation</Button></div></div>
    </main>
  );
}

function ProductPage({ product, addToCart, goTo }: { product: Product; addToCart: () => void; goTo: (p: Page) => void }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const handleAdd = () => { for (let i = 0; i < quantity; i++) addToCart(); setAdded(true); setTimeout(() => setAdded(false), 1800); };
  return (
    <main className="inner-page product-page">
      <button className="back-link" onClick={() => goTo("shop")}>← Back to shop</button>
      <div className="product-detail">
        <div className="product-gallery"><div className="detail-main"><img src={product.image} alt={product.name} /></div><div className="detail-thumbs"><button className="active"><img src={product.image} alt="" /></button><button><img src={photos.studio} alt="" /></button><button><img src={photos.bright} alt="" /></button></div></div>
        <div className="product-info">
          <p className="eyebrow">{product.category} · New collection</p>
          <h1>{product.name}</h1>
          <div className="detail-price"><strong>${product.price.toLocaleString()}</strong><span>★★★★★ &nbsp; {product.rating} (42 reviews)</span></div>
          <p className="detail-description">A study in gentle curves and lasting comfort. Designed with generous proportions and crafted from honest materials, this is a piece made to become part of your everyday.</p>
          <div className="option"><label>Upholstery <span>{product.color}</span></label><div className="swatches"><button className="active swatch-cream" /><button className="swatch-sage" /><button className="swatch-rust" /><button className="swatch-charcoal" /></div></div>
          <div className="option"><label>Quantity</label><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Icon name="minus" size={14} /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)}><Icon name="plus" size={14} /></button></div></div>
          <button className={`detail-add ${added ? "added" : ""}`} onClick={handleAdd}>{added ? "Added to your cart" : `Add to cart · $${(product.price * quantity).toLocaleString()}`}<Icon name={added ? "bag" : "arrow"} size={18} /></button>
          <div className="detail-benefits"><span><Icon name="truck" /> Free delivery</span><span><Icon name="return" /> 30-day returns</span><span><Icon name="leaf" /> Responsibly made</span></div>
          <div className="accordions">{["Details & dimensions", "Materials & care", "Delivery & returns"].map(item => <button key={item}>{item}<Icon name="plus" size={16} /></button>)}</div>
        </div>
      </div>
      <section className="detail-story"><div><p className="eyebrow">Made with intention</p><h2>Comfort you can see. Craft you can feel.</h2><p>Each piece passes through the hands of skilled makers who understand that the smallest details create the most lasting impressions.</p></div><img src={photos.studio} alt="Furniture crafted in a serene studio" /></section>
      <section className="related"><SectionHeading eyebrow="You may also love" title="Complete the room" /><div className="product-grid">{products.filter(p => p.id !== product.id).slice(0, 3).map(p => <ProductCard key={p.id} product={p} viewProduct={() => window.scrollTo({ top: 0, behavior: "smooth" })} addToCart={addToCart} />)}</div></section>
    </main>
  );
}

function Newsletter() {
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setDone(true); };
  return <section className="newsletter"><div><p className="eyebrow">Notes from home</p><h2>A little inspiration, delivered slowly.</h2></div>{done ? <p className="newsletter-success">Welcome home. You’re on the list.</p> : <form onSubmit={submit}><input required type="email" placeholder="Enter your email address" aria-label="Email address" /><button>Join our world <Icon name="arrow" size={17} /></button></form>}</section>;
}

function Footer({ goTo }: { goTo: (p: Page) => void }) {
  return <footer id="footer"><div className="footer-main"><div className="footer-brand"><Logo onClick={() => goTo("home")} light /><p>Furniture that makes home feel like you. Designed slowly, made thoughtfully.</p><div className="socials"><button aria-label="Instagram"><Icon name="instagram" size={17} /></button><button aria-label="Facebook"><Icon name="facebook" size={17} /></button><button aria-label="Pinterest"><Icon name="pinterest" size={17} /></button></div></div><div className="footer-links"><div><strong>Explore</strong><button onClick={() => goTo("shop")}>New arrivals</button><button onClick={() => goTo("shop")}>Furniture</button><button>Collections</button><button>Journal</button></div><div><strong>About</strong><button>Our story</button><button>Materials</button><button>Craftsmanship</button><button>Design service</button></div><div><strong>Help</strong><button>Delivery</button><button>Returns</button><button>Care guide</button><button>Contact</button></div></div></div><div className="footer-bottom"><span>© 2025 Fio Home Furniture</span><div className="payments"><i>VISA</i><i>MC</i><i>AMEX</i></div><div><button>Privacy</button><button>Terms</button></div></div></footer>;
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selected, setSelected] = useState(products[0]);
  const [cartCount, setCartCount] = useState(0);
  const goTo = (target: Page) => { setPage(target); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const viewProduct = (product: Product) => { setSelected(product); goTo("product"); };
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("revealed"); }), { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [page]);
  return (
    <div>
      <Navbar page={page} goTo={goTo} cartCount={cartCount} />
      {page === "home" && <HomePage goTo={goTo} viewProduct={viewProduct} addToCart={() => setCartCount(c => c + 1)} />}
      {page === "shop" && <ShopPage viewProduct={viewProduct} addToCart={() => setCartCount(c => c + 1)} />}
      {page === "product" && <ProductPage product={selected} addToCart={() => setCartCount(c => c + 1)} goTo={goTo} />}
      {page !== "product" && <Newsletter />}
      <Footer goTo={goTo} />
    </div>
  );
}
