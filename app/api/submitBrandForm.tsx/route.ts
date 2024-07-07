// import prisma from "@/lib/db";

// export async function POST(
//     req:Request,
//     res:Response,
// ) {

//     const values:any = req.body;
//     await prisma.brand.create({
//         data: {
//           brandName: values.brandName,
//           contactName: values.contactName,
//           email: values.email,
//           phoneNumber: values.phoneNumber,
//           websiteUrl: values.websiteUrl,
//           businessType: values.businessType,
//           businessRegistrationNumber: values.businessRegistrationNumber,
//           countryOfRegistration: values.countryOfRegistration,
//           gstNumber: values.gstNumber,
//           productDescription: values.productDescription,
//           categories: values.categories,
//           priceRanges: values.priceRange, // Assuming this maps to a pricing tier or similar system
//           materials: values.materials,
//           sustainabilityCertifications: values.sustainabilityCertifications,
//           animalTesting: false,
//           unSdgs: values.unSdgs,
//           brandStory: values.brandStory,
//           socialMedia: JSON.stringify({
//             facebook: values.socialMedia.facebook,
//             instagram: values.socialMedia.instagram,
//             twitter: values.socialMedia.twitter
//           }),
//           totalProductionPerYear: values.totalProductionPerYear,
//           numberOfSuppliers: values.numberOfSuppliers,
//           supplyChainDescription: values.supplyChainDescription,
//           manufacturingProcesses: values.manufacturingProcesses,
//           electricityConsumption: values.electricityConsumption,
//           waterConsumption: values.waterConsumption,
//           wastePercentage: values.wastePercentage,
//           recycledPercentage: values.recycledPercentage,
//           packagingMaterials: values.packagingMaterials,
//         }
//       })
//    return Response.json({message:"submitted"})
// }

