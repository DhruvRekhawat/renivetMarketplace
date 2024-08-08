import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define the schema using zod
const surveySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  mobile: z.string().min(10, { message: "Mobile number must be at least 10 digits" }),
  email: z.string().email({ message: "Invalid email address" }),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in YYYY-MM-DD format" }),
  gender: z.enum(["F", "M", "NB"], { errorMap: () => ({ message: "Please select a valid gender" }) }),
  occupation: z.enum(["Student", "Salaried", "Business"], { errorMap: () => ({ message: "Please select a valid occupation" }) }),
  annualIncome: z.enum([
    "Less than 5 Lakh",
    "5 - 10 Lakh",
    "10 - 20 Lakh",
    "20 - 30 Lakh",
    "More than 30 Lakh"
  ], { errorMap: () => ({ message: "Please select a valid income range" }) }),
  clothingStyle: z.enum([
    "Formal",
    "Casual",
    "Party wear",
    "Activewear",
    "A mix of styles"
  ], { errorMap: () => ({ message: "Please select a valid clothing style" }) }),
  purchaseFactors: z.array(z.enum([
    "Price",
    "Brand",
    "Quality",
    "Sustainability",
    "Style",
    "Other"
  ])).min(1, { message: "Select at least one factor" }),
  typicalBudget: z.enum([
    "Under 1000",
    "1000 - 3000",
    "3000 - 5000",
    "More than 5000"
  ], { errorMap: () => ({ message: "Please select a valid budget range" }) }),
  purchaseFrequency: z.enum([
    "Less than once a month",
    "Once a month",
    "2-3 times a month",
    "Once a week or more"
  ], { errorMap: () => ({ message: "Please select a valid purchase frequency" }) }),
  onlineShoppingFeatures: z.array(z.enum([
    "Fast shipping",
    "Easy returns",
    "Detailed product information",
    "Secure payment options",
    "Personalized recommendations"
  ])).min(1, { message: "Select at least one feature" }),
  certificationImportance: z.enum([
    "Not at all important",
    "Somewhat important",
    "Important",
    "Very important",
    "Extremely important"
  ], { errorMap: () => ({ message: "Please select a valid importance level" }) }),
  sustainablePremium: z.enum([
    "Definitely not",
    "Maybe, depending on the product",
    "Yes, if the product is high quality",
    "Yes, I'm willing to pay significantly more"
  ], { errorMap: () => ({ message: "Please select a valid option" }) }),
  sustainabilityBarriers: z.array(z.enum([
    "High price",
    "Lack of available options",
    "Concerns about product quality",
    "Difficulty finding information about sustainability",
    "Lack of trust in sustainability claims",
    "Other"
  ])).min(1, { message: "Select at least one barrier" }),
  otherSustainabilityBarrier: z.string().optional(),
  sustainabilityEncouragements: z.array(z.enum([
    "Lower prices",
    "Wider range of styles and options",
    "Clearer information about sustainability practices",
    "Celebrity endorsements or influencer recommendations",
    "Discounts or promotions",
    "Other"
  ])).min(1, { message: "Select at least one encouragement" }),
  otherSustainabilityEncouragement: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate and parse the data
    const parsedData = surveySchema.parse(data);

    // Create a new survey response in the database
    const newResponse = await prisma.surveyResponse.create({
      data: {
        name: parsedData.name,
        mobile: parsedData.mobile,
        email: parsedData.email,
        dob: parsedData.dob,
        gender: parsedData.gender,
        occupation: parsedData.occupation,
        annualIncome: parsedData.annualIncome,
        clothingStyle: parsedData.clothingStyle,
        purchaseFactors: {
          set: parsedData.purchaseFactors,
        },
        typicalBudget: parsedData.typicalBudget,
        purchaseFrequency: parsedData.purchaseFrequency,
        onlineShoppingFeatures: {
          set: parsedData.onlineShoppingFeatures,
        },
        certificationImportance: parsedData.certificationImportance,
        sustainablePremium: parsedData.sustainablePremium,
        sustainabilityBarriers: {
          set: parsedData.sustainabilityBarriers,
        },
        otherSustainabilityBarrier: parsedData.otherSustainabilityBarrier,
        sustainabilityEncouragements: {
          set: parsedData.sustainabilityEncouragements,
        },
        otherSustainabilityEncouragement: parsedData.otherSustainabilityEncouragement,
      },
    });

    return NextResponse.json(newResponse, { status: 201 });
  } catch (error) {
    console.error('Error creating survey response:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the survey response' },
      { status: 400 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
