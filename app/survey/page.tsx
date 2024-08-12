'use client'

import { use, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { literal, z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler} from 'react-hook-form'
import { Card, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import BG from '@/assests/thom-milkovic-cBS0qKJM-P4-unsplash.jpg'
import { Banknote, Bike, Briefcase, Gem, Glasses, HandCoins, Heart, Landmark, PartyPopper, PiggyBank, Shirt, Trees, Wallet } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter} from 'next/navigation'
import { Metadata } from 'next'





const SurveySchema = z.object({
  // Demographics
  name: z.string().min(1, { message: "Name is required" }),
  mobile: z.string().min(10, { message: "Mobile number must be at least 10 digits" }),
  email: z.string().email({ message: "Invalid email address" }),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in YYYY-MM-DD format" }),
  gender: z.enum(["F", "M", "NB"], { errorMap: () => ({ message: "Please select a valid gender" }) }),
  occupation: z.enum(["Student", "Salaried", "Business"], { errorMap: () => ({ message: "Please select a valid occupation" }) }),

  // Questions
  annualIncome: z.string().optional().or(z.literal(null)),

  clothingStyle: z.array(z.enum([
    "Formal",
    "Casual",
    "Party wear",
    "Activewear",
    "A mix of styles"
  ])).min(1, { message: "Select at least one style" }),

  purchaseFactors: z.array(z.enum([
    "Price",
    "Brand",
    "Quality",
    "Sustainability",
    "Style",
    "Other"
  ])).min(1, { message: "Select at least one factor" }),
  otherPurchaseFactor: z.string().optional(),

  typicalBudget: z.string(),

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
    "Very important"
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
type Inputs = z.infer<typeof SurveySchema>

const steps = [
  {
    id: 1,
    name: 'Demographics',
    fields: [
      'name',
      'mobile',
      'email',
      'dob',
      'gender',
      'occupation',
    ]
  },
  {
    id: 2,
    name: 'Income and Style Preferences',
    fields: [
      'annualIncome',
    ]
  },
  {
    id: 3,
    name: 'Clothing Style',
    fields: [
      'clothingStyle',
    ]
  },
  {
    id: 4,
    name: 'Purchase Factors',
    fields: [
      'purchaseFactors'
    ]
  },
  {
    id: 5,
    name: 'Budget',
    fields: [
      'typicalBudget',

    ]
  },
  {
    id: 6,
    name: 'Frequency',
    fields: [
      'purchaseFrequency',

    ]
  },
  {
    id: 7,
    name: 'Online Shopping Features',
    fields: [
      'onlineShoppingFeatures'
    ]
  },

  {
    id: 8,
    name: 'Certification and Premium',
    fields: [
      'certificationImportance',
      'sustainablePremium'
    ]
  },
  {
    id: 9,
    name: 'Barriers to Sustainability',
    fields: [
      'sustainabilityBarriers',
      'otherSustainabilityBarrier'
    ]
  },
  {
    id: 10,
    name: 'Encouragements for Sustainability',
    fields: [
      'sustainabilityEncouragements',
      'otherSustainabilityEncouragement'
    ]
  },
  {
    id: 11,
    name: 'Complete'
  },
];





export default function Form() {



  const [userCountry, setUserCountry] = useState("");
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [budget,setBudget] = useState([""])
  const [income,setIncome] = useState([""])
  const delta = currentStep - previousStep
  const router = useRouter();
   
  const fetchUserCountry = async () => {
      try {
          const response = await fetch("https://api.ipify.org?format=json");
          const data = await response.json();
          const userIP = data.ip;

          const countryResponse = await fetch(
              `https://ipapi.co/${userIP}/country/`
          );
          const country = await countryResponse.text();

          setUserCountry(country);

          if(country==="IN")
            {
              setBudget(["Under 1000 INR", "1000 - 3000 INR", "3000 - 5000 INR", "More than 5000 INR"])
              setIncome(["Less Than 5 Lakhs INR"," 5-10 Lakhs INR"," 10-20 Lakhs INR","20-30 Lakhs INR", "More than 30 Lakhs INR"
              ])
            }
            else if(country === "US"){
              setBudget(["Under 10 USD", "10 - 35 USD", "35 - 60 USD", "More than 60 USD"])
              setIncome(["Less Than 6000 USD"," 6000-12,000 USD"," 12,000-25,000 USD"," 25,000 - 35,000 USD", "More than 35,000 USD"
              ])
            }
            else {
              setBudget(["Under 10 EURO", "10 - 30 EURO", "30 - 50 EURO", "More than 50 EURO"])
              setIncome(["Less Than 6000 EURO"," 6000-12,000 EURO"," 12,000-25,000 EURO"," 25,000- 35,000 EURO", "More than 35,000 EURO"
              ])
            }

      } catch (error) {
          console.error("Error fetching user country:", error);
      }
  };
 

  useEffect(() => {
      fetchUserCountry();
  }, []);


 


  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(SurveySchema)
  })

  const handleCheckboxChange = (field:any, value:any) => {
    const currentValues = getValues(field) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item:any)=> item !== value)
      : [...currentValues, value];
  
    setValue(field, newValues, { shouldValidate: true });
  };

  const handleNumberChange = (field:any, value:any) => {
    const parsedValue = parseInt(value);
    setValue(field, isNaN(parsedValue) ? '' : parsedValue, { shouldValidate: true });
  };


  const processForm: SubmitHandler<Inputs> = async(data) => {
    try{
      fetch('/api/survey',{
        method:"POST",
        body:JSON.stringify({...data,userCountry})
      })
      toast.success('Thank you for participating in our survey!',{
        duration:1000,
      })
      router.push('/')
      
    }
    catch(error){
      console.log(error)
    }
    finally{
      reset()
    }
    
  }

  type FieldName = keyof Inputs

  const next = async () => {
    console.log(currentStep,steps.length)
    const fields = steps[currentStep].fields;
    const isValid = await trigger(fields as FieldName[], { shouldFocus: true });
  
    if (!isValid) return; // Exit if validation fails
  
    try {
      if (currentStep === steps.length - 2) {

        await handleSubmit(processForm)(); // Ensure handleSubmit is invoked with processForm
      } else {
        // Otherwise, just move to the next step
        setPreviousStep(currentStep);
        setCurrentStep(prevStep => prevStep + 1);
      }
    } catch (error) {
      console.error('Error while moving to the next step:', error);
      // Optionally handle or display the error to the user
    }
  };
  
  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  return (
    <section className='absolute inset-0 flex flex-col justify-between items-center p-4 md:p-8 h-[100dvh]'>
      {/* steps */}
      <Image src={BG} objectFit='cover' className='-z-10 aspect-auto top-0 fixed w-full h-[175vh] sm:h-auto' alt='bg'></Image>
      <Card className='px-4 py-6 pb-2 md:p-8 rounded-sm sm:w-2/3 w-full flex-grow'>
      {/* Form */}
      <form className='' onSubmit={handleSubmit(processForm)}>

      {currentStep === 0 && (
  <motion.div
    initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    <h2 className='text-base font-semibold leading-7 text-gray-900'>
      Basic Information
    </h2>
    <p className='mt-1 text-sm leading-6 text-gray-600'>
      Provide your personal details.
    </p>
    <div className='mt-10 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-4'>
      {/* Name */}
      <div className='sm:col-span-2'>
        <label htmlFor='name' className='block text-sm font-medium leading-6 text-gray-900'>
          Full Name
        </label>
        <div className='mt-2'>
          <input
            type='text'
            id='name'
            {...register('name')}
            className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
          />
          {errors.name?.message && (
            <p className='mt-2 text-sm text-red-400'>{errors.name?.message}</p>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className='sm:col-span-2'>
        <label htmlFor='mobile' className='block text-sm font-medium leading-6 text-gray-900'>
          Mobile
        </label>
        <div className='mt-2'>
          <input
            type='tel'
            id='mobile'
            {...register('mobile')}
            className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
            maxLength={10}
          />
          {errors.mobile?.message && (
            <p className='mt-2 text-sm text-red-400'>{errors.mobile?.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className='sm:col-span-2'>
        <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
          Email address
        </label>
        <div className='mt-2'>
          <input
            type='email'
            id='email'
            {...register('email')}
            className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
          />
          {errors.email?.message && (
            <p className='mt-2 text-sm text-red-400'>{errors.email?.message}</p>
          )}
        </div>
      </div>

      {/* DOB */}
      <div className='sm:col-span-2'>
        <label htmlFor='dob' className='block text-sm font-medium leading-6 text-gray-900'>
          Date of Birth
        </label>
        <div className='mt-2'>
          <input
            type='date'
            id='dob'
            {...register('dob')}
            placeholder='YYYY-MM-DD'
            className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
          />
          {errors.dob?.message && (
            <p className='mt-2 text-sm text-red-400'>{errors.dob?.message}</p>
          )}
        </div>
      </div>

      {/* Gender */}
      <div className='sm:col-span-2'>
        <label htmlFor='gender' className='block text-sm font-medium leading-6 text-gray-900'>
          Gender
        </label>
        <div className='mt-2'>
          <select
            id='gender'
            {...register('gender')}
            className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
          >
            <option value=''>Select gender</option>
            <option value='F'>Female</option>
            <option value='M'>Male</option>
            <option value='NB'>Non-binary</option>
          </select>
          {errors.gender?.message && (
            <p className='mt-2 text-sm text-red-400'>{errors.gender?.message}</p>
          )}
        </div>
      </div>

      {/* Occupation */}
      <div className='sm:col-span-2'>
        <label htmlFor='occupation' className='block text-sm font-medium leading-6 text-gray-900'>
          Occupation
        </label>
        <div className='mt-2'>
          <select
            id='occupation'
            {...register('occupation')}
            className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
          >
            <option value=''>Select occupation</option>
            <option value='Student'>Student</option>
            <option value='Salaried'>Salaried</option>
            <option value='Business'>Business</option>
          </select>
          {errors.occupation?.message && (
            <p className='mt-2 text-sm text-red-400'>{errors.occupation?.message}</p>
          )}
        </div>
      </div>
    </div>
  </motion.div>
)}
      {currentStep === 1 && (
  <motion.div
    initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    <h2 className='text-base font-semibold leading-7 text-gray-900'>
      Estimated Household income
    </h2>
    <p className='mt-1 text-sm leading-6 text-gray-600'>
      Select the appropriate option
    </p>
    <div className='mt-10 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-10 '>
      
      < label className='sm:col-span-2'>
        <input type="radio" id='Less than 5 Lakh' value={income[0]} {...register("annualIncome")}  className='hidden peer'/>
        <Card className='flex md:flex-col gap-x-2 p-4 gap-y-8 justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44 '>
        <HandCoins className='h-5 w-5 font-light'></HandCoins>
        <p>{income[0]}</p>
        </Card>
        
      </label>
      <label className='sm:col-span-2'>
        <input type="radio" id='5 - 10 Lakh' value={income[1]} {...register("annualIncome")} className='hidden peer' />
        <Card className='flex md:flex-col p-4 gap-y-8 gap-x-2  justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44 '>
        <Wallet className='h-5 w-5 font-light'></Wallet>
        <p>{income[1]}</p>
        </Card>
        
      </label>
      <label className='sm:col-span-2'>
        <input type="radio" id='10 - 20 Lakh' value={income[2]} {...register("annualIncome")} className='hidden peer' />
        <Card className='flex md:flex-col p-4 gap-y-8 gap-x-2  justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44 '>
        <PiggyBank className='h-5 w-5 font-light'></PiggyBank>
        <p>{income[2]}</p>
        </Card>
        
      </label>
      <label className='sm:col-span-2'>
        <input type="radio" id='20 - 30 Lakh' value={income[3]} {...register("annualIncome")} className='hidden peer' />
        <Card className='flex md:flex-col p-4 gap-y-8 gap-x-2  justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44 '>
        <Banknote className='h-5 w-5 font-light'></Banknote>
        <p>{income[3]}</p>
        </Card>
        
      </label>
      <label className='sm:col-span-2'>
        <input type="radio" id='More than 30 Lakh' value={income[4]} {...register("annualIncome")} className='hidden peer' />
        <Card className='flex md:flex-col p-4 gap-y-8 gap-x-2  justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44 '>
        <Landmark className='h-5 w-5 font-light'></Landmark>
        <p>{income[4]}</p>
        </Card>
        
      </label>

      
    </div>
  </motion.div>
)}
      {currentStep === 2 && (
  <motion.div
    initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    <h2 className='text-base font-semibold leading-7 text-gray-900'>
    Which of the following best describes your clothing style?
    </h2>
    <p className='mt-1 text-sm leading-6 text-gray-600'>
      Select all that apply
    </p>
    <div className='mt-10 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-10 '>
      
      < label className='sm:col-span-2'>
        <input type="checkbox" id='Formal'  onChange={() => handleCheckboxChange('clothingStyle', 'Formal')}  className='hidden peer'/>
        <Card className='flex md:flex-col p-4 gap-y-8 gap-x-2  justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44 '>
        <Briefcase className='h-5 w-5 font-light'></Briefcase>
        <p>Formal</p>
        </Card>
        
      </label>
      <label className='sm:col-span-2'>
        <input type="checkbox" id='Casual' value="Casual" onChange={() => handleCheckboxChange('clothingStyle', 'Casual')} className='hidden peer' />
        <Card className='flex md:flex-col p-4 gap-y-8 gap-x-2  justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44 '>
        <Shirt className='h-5 w-5 font-light'></Shirt>
        <p>Casual</p>
        </Card>
        
      </label>
      <label className='sm:col-span-2'>
        <input type="checkbox" id='Party wear' value="Party wear" onChange={() => handleCheckboxChange('clothingStyle', 'Party wear')} className='hidden peer' />
        <Card className='flex md:flex-col p-4 gap-y-8 gap-x-2  justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44 '>
        <PartyPopper className='h-5 w-5 font-light'></PartyPopper>
        <p>Party wear</p>
        </Card>
        
      </label>
      <label className='sm:col-span-2'>
        <input type="checkbox" id='Activewear' value="Activewear" onChange={() => handleCheckboxChange('clothingStyle', 'Activewear')} className='hidden peer' />
        <Card className='flex md:flex-col p-4 gap-y-8 gap-x-2  justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44 '>
        <Bike className='h-5 w-5 font-light'></Bike>
        <p>Activewear</p>
        </Card>
        
      </label>
      <label className='sm:col-span-2'>
        <input type="checkbox" id='A mix of styles' value="A mix of styles" onChange={() => handleCheckboxChange('clothingStyle', 'A mix of styles')} className='hidden peer' />
        <Card className='flex md:flex-col p-4 gap-y-8 gap-x-2  justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44 '>
        <Heart className='h-5 w-5 font-light'></Heart>
        <p>A mix of styles</p>
        </Card>
        
      </label>

      
    </div>
  </motion.div>
)}
      {currentStep === 3 && (
  <motion.div
    initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    <h2 className='text-base font-semibold leading-7 text-gray-900'>
    What factors influence your clothing purchasing decisions? 
    </h2>
    <p className='mt-1 text-sm leading-6 text-gray-600'>
    Select all that apply
    </p>
    <div className='mt-10 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-10 '>
      
      < label className='sm:col-span-2'>
        <input type="checkbox" id='Formal' value="Formal" onChange={() => handleCheckboxChange('purchaseFactors', 'Price')}  className='hidden peer'/>
        <Card className='flex md:flex-col p-4 gap-y-8 gap-x-2  justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44 '>
        <Banknote className='h-5 w-5 font-light'></Banknote>
        <p>Price</p>
        </Card>
        
      </label>
      <label className='sm:col-span-2'>
        <input type="checkbox" id='Casual' value="Casual" onChange={() => handleCheckboxChange('purchaseFactors', 'Brand')} className='hidden peer' />
        <Card className='flex md:flex-col p-4 gap-y-8 gap-x-2  justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44 '>
        <Shirt className='h-5 w-5 font-light'></Shirt>
        <p>Brand</p>
        </Card>
        
      </label>
      <label className='sm:col-span-2'>
        <input type="checkbox" id='Party wear' value="Party wear" onChange={() => handleCheckboxChange('purchaseFactors', 'Quality')} className='hidden peer' />
        <Card className='flex md:flex-col p-4 gap-y-8 gap-x-2  justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44 '>
        <Gem className='h-5 w-5 font-light'></Gem>
        <p>Quality</p>
        </Card>
        
      </label>
      <label className='sm:col-span-2'>
        <input type="checkbox" id='Activewear' value="Activewear" onChange={() => handleCheckboxChange('purchaseFactors', 'Sustainability')} className='hidden peer' />
        <Card className='flex md:flex-col p-4 gap-y-8 gap-x-2  justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44 '>
        <Trees className='h-5 w-5 font-light'></Trees>
        <p>Sustainability</p>
        </Card>
        
      </label>
      <label className='sm:col-span-2'>
        <input type="checkbox" id='A mix of styles' value="A mix of styles" onChange={() => handleCheckboxChange('purchaseFactors', 'Style')} className='hidden peer' />
        <Card className='flex md:flex-col p-4 gap-y-8 gap-x-2  justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44 '>
        <Glasses className='h-5 w-5 font-light'></Glasses>
        <p>Style</p>
        </Card>
        
      </label>

      
    </div>
  </motion.div>
)}
{currentStep === 4 && (
  <motion.div
    initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    <h2 className='text-base font-semibold leading-7 text-gray-900'>
      What is your typical budget for clothing?
    </h2>
    <p className='mt-1 text-sm leading-6 text-gray-600'>
      Select the appropriate option
    </p>
    <div className='mt-10 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-10'>
      {
      

      budget.map((budget) => (
        <label key={budget} className='sm:col-span-2 cursor-pointer'>
          <input
            type="radio"
            value={budget}
            {...register("typicalBudget")}
            className='hidden peer'
          />
          <Card className='flex flex-col p-4 gap-y-8 justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44'>
            <p className='text-center w-full'>{budget}</p>
          </Card>
        </label>
      ))}
    </div>
  </motion.div>
)}
{currentStep === 5 && (
  <motion.div
    initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    <h2 className='text-base font-semibold leading-7 text-gray-900'>
      How often do you purchase clothing?
    </h2>
    <p className='mt-1 text-sm leading-6 text-gray-600'>
      Select the appropriate option
    </p>
    <div className='mt-10 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-10'>
      {[
        "Less than once a month",
        "Once a month",
        "2-3 times a month",
        "Once a week or more"
      ].map((frequency) => (
        <label key={frequency} className='sm:col-span-2 cursor-pointer'>
          <input
            type="radio"
            value={frequency}
            {...register("purchaseFrequency")}
            className='hidden peer'
          />
          <Card className='flex flex-col p-4 gap-y-8 justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44'>
            <p className='w-full text-center'>{frequency}</p>
          </Card>
        </label>
      ))}
    </div>
  </motion.div>
)}
{currentStep === 6 && (
  <motion.div
    initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    <h2 className='text-base font-semibold leading-7 text-gray-900'>
      What features do you value when shopping online? 
    </h2>
    <p className='mt-1 text-sm leading-6 text-gray-600'>
    Select all that apply
    </p>
    <div className='mt-10 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-10'>
      {[
        "Fast shipping",
        "Easy returns",
        "Detailed product information",
        "Secure payment options",
        "Personalized recommendations"
      ].map((feature) => (
        <label key={feature} className='sm:col-span-2 cursor-pointer'>
          <input
            type="checkbox"
            value={feature}
            {...register("onlineShoppingFeatures")}
            className='hidden peer'
          />
          <Card className='flex flex-col p-4 gap-y-8 justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44'>
            <p className='w-full text-center'>{feature}</p>
          </Card>
        </label>
      ))}
    </div>
  </motion.div>
)}
{currentStep === 7 && (
  <motion.div
    initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    <h2 className='text-base font-semibold leading-7 text-gray-900'>
      How important are certifications and sustainability premiums to you?
    </h2>
    <p className='mt-1 text-sm leading-6 text-gray-600'>
      Select the appropriate options
    </p>
    <div className='mt-10 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-10'>
      <label className='sm:col-span-5 cursor-pointer'>
        <p>Importance of Certification:</p>
        <select {...register("certificationImportance")} className='w-full border p-2 rounded'>
          <option value="Not at all important">Not at all important</option>
          <option value="Somewhat important">Somewhat important</option>
          <option value="Important">Important</option>
          <option value="Very important">Very important</option>
        </select>
        {errors.certificationImportance && <p className='text-red-500'>{errors.certificationImportance.message}</p>}
      </label>
      <label className='sm:col-span-5 cursor-pointer'>
        <p>Willing to Pay a Premium:</p>
        <select {...register("sustainablePremium")} className='w-full border p-2 rounded'>
          <option value="Definitely not">Definitely not</option>
          <option value="Maybe, depending on the product">Maybe, depending on the product</option>
          <option value="Yes, if the product is high quality">Yes, if the product is high quality</option>
          <option value="Yes, I'm willing to pay significantly more">Yes, I&apos;m willing to pay significantly more</option>
        </select>
        {errors.sustainablePremium && <p className='text-red-500'>{errors.sustainablePremium.message}</p>}
      </label>
    </div>
  </motion.div>
)}

{currentStep === 8 && (
  <motion.div
    initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    <h2 className='text-base font-semibold leading-7 text-gray-900'>
      What barriers do you face when considering sustainability?
    </h2>
    <p className='mt-1 text-sm leading-6 text-gray-600'>
      Select all that apply
    </p>
    <div className='mt-10 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-10'>
      {[
        "High price",
        "Lack of available options",
        "Concerns about product quality",
        "Difficulty finding information about sustainability",
        "Lack of trust in sustainability claims",
        "Other"
      ].map((barrier) => (
        <label key={barrier} className='sm:col-span-2 cursor-pointer'>
          <input
            type="checkbox"
            value={barrier}
            {...register("sustainabilityBarriers")}
            className='hidden peer'
          />
          <Card className='flex flex-col p-4 gap-y-8 justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44'>
            <p className='w-full text-center'>{barrier}</p>
          </Card>
        </label>
      ))}
      <label className='sm:col-span-10'>
        <p>Other (please specify):</p>
        <input type="text" {...register("otherSustainabilityBarrier")} className='w-full border p-2 rounded' />
        {errors.otherSustainabilityBarrier && <p className='text-red-500'>{errors.otherSustainabilityBarrier.message}</p>}
      </label>
    </div>
  </motion.div>
)}

{currentStep === 9 && (
  <motion.div
    initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    <h2 className='text-base font-semibold leading-7 text-gray-900'>
      What would encourage you to make more sustainable purchases?
    </h2>
    <p className='mt-1 text-sm leading-6 text-gray-600'>
      Select all that apply
    </p>
    <div className='mt-10 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-10'>
      {[
        "Lower prices",
        "Wider range of styles and options",
        "Clearer information about sustainability practices",
        "Celebrity endorsements or influencer recommendations",
        "Discounts or promotions",
        "Other"
      ].map((encouragement) => (
        <label key={encouragement} className='sm:col-span-2 cursor-pointer'>
          <input
            type="checkbox"
            value={encouragement}
            {...register("sustainabilityEncouragements")}
            className='hidden peer'
          />
          <Card className='flex flex-col p-4 gap-y-8 justify-center items-center peer-checked:border-brand-brown peer-checked:border peer-checked:bg-orange-200 h-15 sm:h-44'>
            <p className='w-full text-center'>{encouragement}</p>
          </Card>
        </label>
      ))}
      <label className='sm:col-span-10'>
        <p>Other (please specify):</p>
        <input type="text" {...register("otherSustainabilityEncouragement")} className='w-full border p-2 rounded' />
        {errors.otherSustainabilityEncouragement && <p className='text-red-500'>{errors.otherSustainabilityEncouragement.message}</p>}
      </label>
    </div>
  </motion.div>
)}
{currentStep === 10 && (
  <motion.div
    initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    <h2 className='text-base font-semibold leading-7 text-gray-900'>
      Complete
    </h2>
    <p className='mt-1 text-sm leading-6 text-gray-600'>
      Thank you for participating in our survey.
    </p>
  </motion.div>
)}



      </form>

      {/* Navigation */}
      <div className='my-8 pt-5 '>
        <div className='flex justify-between'>
          <button
            type='button'
            onClick={prev}
            disabled={currentStep === 0}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-brand-brown shadow-sm ring-1 ring-inset ring-brand-brown/85 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50 flex justify-center items-center gap-1'
          > 
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5L8.25 12l7.5-7.5'
              />
            </svg>
            Back
          </button>
          <button
            type='submit'
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-brand-brown shadow-sm ring-1 ring-inset ring-brand-brown/85 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50 flex justify-center items-center'
          > Next
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 4.5l7.5 7.5-7.5 7.5'
              />
            </svg>
          </button>
        </div>
      </div>
    </Card>
    </section>
  )
}