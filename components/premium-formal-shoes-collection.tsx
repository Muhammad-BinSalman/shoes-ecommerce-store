import { getCollectionProducts } from "lib/shopify";
import { InteractiveProductCard } from "./ui/card-7";

const PremiumFormalShoesCollection = async () => {
  const products = await getCollectionProducts({ collection: "formals" });
  const items = products.slice(0, 2);

  return (
    <section className="relative w-full flex flex-col items-center justify-top overflow-hidden font-sans h-full bg-[#e4e3e1] pb-8 mt-8">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-900/40 rounded-full blur-[100px]" />
      </div>
      <div className="relative w-full h-[350px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 p-8 md:p-12 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex flex-col items-center text-center max-w-lg mx-4">
          <h1 className="text-3xl md:text-5xl font-bold text-black tracking-widest uppercase mb-4 drop-shadow-sm">
            Premium Formal
          </h1>
          <p className="text-black/80 text-xs md:text-sm tracking-widest font-light uppercase mb-6 max-w-xs">
            Exquisite craftsmanship for the modern gentleman
          </p>
          <button className="px-6 py-2 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-gray-100 transition-colors duration-300 rounded-sm">
            Shop Now
          </button>
        </div>
      </div>

      <div className="w-full max-w-6xl px-6 md:px-8 py-4 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-14 place-items-center">
        {items.map((p) => (
          <InteractiveProductCard
            key={p.id}
            title={p.title}
            description={p.description?.slice(0, 80) || "Premium formal shoe"}
            price={`${p.priceRange.minVariantPrice.amount} ${p.priceRange.minVariantPrice.currencyCode}`}
            imageUrl={p.featuredImage?.url || "/logo/logo.png"}
            logoUrl="/logo/logo.png"
          />
        ))}
      </div>
    </section>
  );
};

export default PremiumFormalShoesCollection;
