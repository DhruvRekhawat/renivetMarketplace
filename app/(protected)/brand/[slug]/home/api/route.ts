import prisma from '../../../../../../lib/db'

async function POST(formData:any,{ params }: { params: { symbol: string } }) {
    try {
        const brand = await prisma.brand.create({
            data: {
                brandName: formData.brandName,
                contactName: formData.fullName,
                password:"",
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                websiteUrl: formData.websiteUrl,
                businessType: formData.businessType,
                businessRegistrationNumber: formData.businessRegistrationNumber,
                countryOfRegistration: formData.businessCountryOfRegistration,
                gstNumber: formData.gstNumber,
                productDescription: formData.productDescription,
                categories: { set: formData.categories },
                materials: formData.materials,
                sustainabilityCertifications: { set: formData.sustainabilityCertifications },
                unSdgs: { set: formData.unSdgs },
                
                totalProductionPerYear: formData.totalProductionPerYear,
                numberOfSuppliers: formData.numberOfSuppliers,
                supplyChainDescription: formData.supplyChainDescription,
                manufacturingProcesses: formData.manufacturingProcesses,
                electricityConsumption: formData.electricityConsumption,
                waterConsumption: formData.waterConsumption,
                wastePercentage: formData.wastePercentage,
                recycledPercentage: formData.recycledPercentage,
                packagingMaterials: formData.packagingMaterials,
            }
        })
        .then((brand) => {
            console.log("Brand created:", brand);
        })
        .catch((error) => {
            console.error("Error creating brand:", error);
        });
    
        return brand;
    } catch (error:any) {
        throw new Error(`Error creating brand: ${error.message}`);
    }
}

const formData = {
    brandName: "Example Brand",
    fullName: "John Doe",
    email: "dhruvrekhawat5@gmail.com",
    phoneNumber: "1234567890",
    websiteUrl: "http://example.com",
    businessType: "Corporation",
    businessRegistrationNumber: "123456789",
    businessCountryOfRegistration: "USA",
    gstNumber: "GST123",
    productDescription: "This is a sample product description.",
    categories: ["Fashion"],
    materials: "Cotton",
    sustainabilityCertifications: ["ISO9001"],
    unSdgs: ["SDG1"],
    socialMedia: {
        facebook: "http://facebook.com/example",
        instagram: "http://instagram.com/example",
        twitter: "http://twitter.com/example"
    },
    totalProductionPerYear: 10000,
    numberOfSuppliers: 5,
    supplyChainDescription: "Our supply chain involves...",
    manufacturingProcesses: "Our manufacturing process includes...",
    electricityConsumption: 1000,
    waterConsumption: 500,
    wastePercentage: 10,
    recycledPercentage: 50,
    packagingMaterials: "We use biodegradable packaging."
};


