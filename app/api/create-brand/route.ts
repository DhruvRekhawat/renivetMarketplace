
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();


    if (!data.brandName || !data.email || !data.businessRegistrationNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newBrand = await prisma.brand.create({
      data: {
        password: "", 
        brandName: data.brandName,
        contactName: data.contactName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        websiteUrl: data.websiteUrl || null,
        businessType: data.businessType, // Ensure this matches your enum
        businessRegistrationNumber: data.businessRegistrationNumber,
        countryOfRegistration: data.businessCountryOfRegistration,
        gstNumber: data.gstNumber || null,
        productDescription: data.productDescription || '',
        categories: data.categories || [],
        materials: data.materials || '',
        sustainabilityCertifications: data.sustainabilityCertifications || [],
        unSdgs: data.unSdgs || [],
        brandStory: data.brandStory || '',

          socialMedia_facebook: data.socialMedia?.facebook || null,
          socialMedia_instagram: data.socialMedia?.instagram || null,
          socialMedia_twitter: data.socialMedia?.twitter || null,

        totalProductionPerYear: data.totalProductionPerYear || null,
        numberOfSuppliers: data.numberOfSuppliers || null,
        supplyChainDescription: data.supplyChainDescription || '',
        manufacturingProcesses: data.manufacturingProcesses || '',
        electricityConsumption: data.electricityConsumption || null,
        waterConsumption: data.waterConsumption || null,
        wastePercentage: data.wastePercentage || null,
        recycledPercentage: data.recycledPercentage || null,
        packagingMaterials: data.packagingMaterials || '',
        brandLogo: data.brandLogo || '',
        certifications: data.certifications || 'ISO 9001, ISO 14001',
        productCatalog: data.productCatalog || '',
        status: "PENDING" // Ensure this matches your enum
      }
    });

    return NextResponse.json(newBrand, { status: 201 });
  } catch (error) {
    console.error('Error creating brand:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the brand' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
