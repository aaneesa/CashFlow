// src/components/Advertisements.tsx

interface Ad {
    url: string;
    image: string;
    title?: string;
  }
  
  type AdPosition = "left" | "right" | "footer";
  
  interface AdvertisementsProps {
    position: AdPosition;
    ad?: Ad;
  }
  
  const Advertisements: React.FC<AdvertisementsProps> = ({ position, ad }) => {
    const isPremium =
      typeof window !== "undefined" &&
      localStorage.getItem("isPremium") === "true";
  
    if (isPremium) return null;
    if (!ad) return null;
  
    const baseClass =
      "p-2 m-2 bg-white shadow-md rounded-xl flex justify-center items-center";
  
    const positionClass: Record<AdPosition, string> = {
      left: "fixed top-20 left-2 w-40",
      right: "fixed top-20 right-2 w-40",
      footer: "w-full text-center py-4",
    };
  
    return (
      <div className={`${baseClass} ${positionClass[position]}`}>
        <a href={ad.url} target="_blank" rel="noopener noreferrer">
          <img
            src={ad.image}
            alt={ad.title ?? "Advertisement"}
            className="w-full h-auto rounded-lg"
          />
        </a>
      </div>
    );
  };
  
  export default Advertisements;
  