import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/db";
import Logo from "@/assests/icons/R-PrimaryIcon.svg";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  AppWindowMac,
  Building2,
  Facebook,
  Globe,
  Instagram,
  Mail,
  Phone,
  ShieldCheck,
  TwitterIcon,
  User,
  MapPin,
  FileText,
  ShoppingBag,
  Package,
  Recycle,
  TrendingUp,
  Truck,
  Factory,
  Zap,
  Droplet,
  LucideIcon,
} from "lucide-react";

const BrandDetailsPage = async ({
  params,
}: {
  params: { brandid: string };
}) => {
  const brandid = params.brandid;

  const brandDetails = await prisma.brand.findUnique({
    where: {
      id: parseInt(brandid),
    },
  });

  //   console.log(brandDetails);

  const cards = [
    {
      title: "Contact Information",
      items: [
        { icon: <User className="h-5" />, value: brandDetails?.contactName },
        { icon: <Mail className="h-5" />, value: brandDetails?.email },
        { icon: <Phone className="h-5" />, value: brandDetails?.phoneNumber },
        { icon: <Globe className="h-5" />, value: brandDetails?.websiteUrl },
      ],
    },
    {
      title: "Business Details",
      items: [
        { icon: <Building2 className="h-5" />, value: brandDetails?.brandName },
        {
          icon: <AppWindowMac className="h-5" />,
          value: brandDetails?.businessType,
        },
        {
          icon: <FileText className="h-5" />,
          value: brandDetails?.businessRegistrationNumber,
        },
        {
          icon: <MapPin className="h-5" />,
          value: brandDetails?.countryOfRegistration,
        },
      ],
    },
    {
      title: "Product Information",
      items: [
        {
          icon: <ShoppingBag className="h-5" />,
          value: brandDetails?.productDescription?.substring(0, 40) + "...",
        },
        {
          icon: <Package className="h-5" />,
          value: brandDetails?.categories.join(", "),
        },
        { icon: <Package className="h-5" />, value: brandDetails?.materials },
        {
          icon: <TrendingUp className="h-5" />,
          value: brandDetails?.totalProductionPerYear,
        },
      ],
    },
    {
      title: "Sustainability",
      items: [
        {
          icon: <Recycle className="h-5" />,
          value: brandDetails?.sustainabilityCertifications.join(", "),
        },
        {
          icon: <Globe className="h-5" />,
          value: brandDetails?.unSdgs.join(", "),
        },
        {
          icon: <Recycle className="h-5" />,
          value: `${brandDetails?.recycledPercentage}%`,
        },
        {
          icon: <Package className="h-5" />,
          value: `${brandDetails?.wastePercentage}%`,
        },
      ],
    },
    {
      title: "Supply Chain",
      items: [
        {
          icon: <Truck className="h-5" />,
          value: brandDetails?.numberOfSuppliers,
        },
        {
          icon: <Truck className="h-5" />,
          value: brandDetails?.supplyChainDescription?.substring(0, 40) + "...",
        },
        {
          icon: <Factory className="h-5" />,
          value: brandDetails?.manufacturingProcesses?.substring(0, 40) + "...",
        },
        {
          icon: <Package className="h-5" />,
          value: brandDetails?.packagingMaterials,
        },
      ],
    },
    {
      title: "Resource Consumption",
      items: [
        {
          icon: <Zap className="h-5" />,
          value: `${brandDetails?.electricityConsumption} units`,
        },
        {
          icon: <Droplet className="h-5" />,
          value: `${brandDetails?.waterConsumption} units`,
        },
        {
          icon: <FileText className="h-5" />,
          value: brandDetails?.certifications,
        },
        { icon: <FileText className="h-5" />, value: brandDetails?.gstNumber },
      ],
    },
    {
      title: "Online Presence",
      items: [
        {
          icon: <Facebook className="h-5" />,
          value: brandDetails?.socialMedia_facebook,
          isLink: true,
        },
        {
          icon: <Instagram className="h-5" />,
          value: brandDetails?.socialMedia_instagram,
          isLink: true,
        },
        {
          icon: <TwitterIcon className="h-5" />,
          value: brandDetails?.socialMedia_twitter,
          isLink: true,
        },
        {
          icon: <Globe className="h-5" />,
          value: brandDetails?.websiteUrl,
          isLink: true,
        },
      ],
    },
  ];

  return (
    <main className="flex flex-col justify-start items-start p-4 px-8 w-full max-w-7xl mx-auto">
      <div className="flex gap-4 justify-start items-start mb-6 w-full">
        <Image src={Logo} alt="logo" height={40} width={40} />
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {brandDetails?.brandName}
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm">
            Brand ID:&nbsp; {brandDetails?.id}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-start w-full">
        {cards.map((card, index) => (
          <BentoCard key={index} title={card.title} items={card.items} />
        ))}
      </div>
    </main>
  );
};

interface CardItem {
  icon: React.ReactElement<LucideIcon>;
  value: string | number | null | undefined;
  isLink?: boolean;
}

interface BentoCardProps {
  title: string;
  items: CardItem[];
}

const BentoCard: React.FC<BentoCardProps> = ({ title, items }) => (
  <Card className="p-4 m-2 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] xl:w-[calc(25%-1rem)]">
    <h2 className="font-bold mb-2 text-lg">{title}</h2>
    <Separator />
    <CardContent className="p-4 flex flex-col justify-start items-start gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex justify-start items-center gap-2 w-full"
        >
          <div className="flex-shrink-0">{item.icon}</div>
          {item.isLink && item.value ? (
            <a
              href={
                item.value.toString().startsWith("http")
                  ? item.value.toString()
                  : `https://${item.value}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="truncate flex-grow text-sm text-blue-500 hover:underline"
            >
              {item.value}
            </a>
          ) : (
            <span className="truncate flex-grow text-sm">
              {item.value ?? "N/A"}
            </span>
          )}
        </div>
      ))}
    </CardContent>
  </Card>
);

export default BrandDetailsPage;
