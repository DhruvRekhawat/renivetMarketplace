'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'


export const FormDataSchema =z.object({
    // Basic Information
    brandName: z.string().min(2, { message: "Brand name must be at least 2 characters." }),
    fullName: z.string().min(2, { message: "Contact name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 characters." }),
    websiteUrl: z.string().url({ message: "Invalid URL." }).optional(),
  
    // Business Information
    businessType: z.enum(["Sole_Proprietorship", "Partnership", "Corporation", "LLC", "Other"], {
      errorMap: () => ({ message: "Please select a valid business type." }),
    }),
    businessRegistrationNumber: z.string().min(1, { message: "Business registration number is required." }),
    countryOfRegistration: z.string().min(2, { message: "Country of registration is required." }),
  
    // Tax Information
    gstNumber: z.string().min(1, { message: "GST number is required." }),
  
    // Product Information
    productDescription: z.string().min(10, { message: "Product description must be at least 10 characters." }),
    categories: z.array(z.string()).min(1, { message: "Select at least one category." }),
    priceRange: z.array(z.string()).min(1, { message: "Select at least one price range." }),
    materials: z.string().min(2, { message: "Please specify materials used." }),
  
    // Sustainability
    sustainabilityCertifications: z.array(z.string()),
    animalTesting: z.boolean(),
    unSdgs: z.array(z.string()),
  
    // Brand Story
    brandStory: z.string().min(50, { message: "Brand story must be at least 50 characters." }),
  
    // Social Media
    socialMedia: z.object({
      facebook: z.string().url({ message: "Invalid Facebook URL." }).optional(),
      instagram: z.string().url({ message: "Invalid Instagram URL." }).optional(),
      twitter: z.string().url({ message: "Invalid Twitter URL." }).optional(),
    }),
  
    // Manufacturing and Supply Chain
    totalProductionPerYear: z.number().positive({ message: "Production must be a positive number." }),
    numberOfSuppliers: z.number().int().positive({ message: "Number of suppliers must be a positive integer." }),
    supplyChainDescription: z.string().min(50, { message: "Supply chain description must be at least 50 characters." }),
    manufacturingProcesses: z.string().min(20, { message: "Manufacturing processes must be at least 20 characters." }),
  
    // Resource Usage
    electricityConsumption: z.number().positive({ message: "Electricity consumption must be a positive number." }),
    waterConsumption: z.number().positive({ message: "Water consumption must be a positive number." }),
  
    // Waste Management
    wastePercentage: z.number().min(0).max(100, { message: "Waste percentage must be between 0 and 100." }),
    recycledPercentage: z.number().min(0).max(100, { message: "Recycled percentage must be between 0 and 100." }),
  
    // Packaging
    packagingMaterials: z.string().min(5, { message: "Please describe packaging materials (at least 5 characters)." }),
  
    // File Uploads
    // brandLogo: z.string(),
    // certifications: z.array(z.string()),
    // productCatalog: z.string(),
  })

type Inputs = z.infer<typeof FormDataSchema>

const steps = [
  {
    id: 'Step 1',
    name: 'Basic Information',
    fields: ['brandName', 'fullName', 'email','phoneNumber','websiteUrl']
  },
  {
    id: 'Step 2',
    name: 'Business Information',
    fields: ['country', 'state', 'city', 'street', 'zip']
  },
  {
    id: 'Step 3',
    name: 'Product Information',
    fields: ['country', 'state', 'city', 'street', 'zip']
  },
  {
    id: 'Step 4',
    name: 'Brand Story',
    fields: ['country', 'state', 'city', 'street', 'zip']
  },
  {
    id: 'Step 5',
    name: 'Logistics',
    fields: ['country', 'state', 'city', 'street', 'zip']
  },
  { id: 'Step 6', name: 'Complete' }
]

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema)
  })

  const processForm: SubmitHandler<Inputs> = data => {
    console.log(data)
    reset()
  }

  type FieldName = keyof Inputs

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)()
      }
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  return (
    <section className='absolute inset-0 flex flex-col justify-between p-24'>
      {/* steps */}
      <nav aria-label='Progress' className='mt-20'>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              {currentStep > index ? (
                <div className='group flex w-full flex-col border-l-4 border-brand-brown py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-brand-brown transition-colors '>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className='flex w-full flex-col border-l-4 border-brand-brown py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                  aria-current='step'
                >
                  <span className='text-sm font-medium text-brand-brown'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : (
                <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-gray-500 transition-colors'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form className='mt-12 py-12' onSubmit={handleSubmit(processForm)}>
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
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8'>
            {/* full name */}
            <div className='sm:col-span-4'>
                <label
                  htmlFor='fullName'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Full Name
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='fullName'
                    {...register('fullName')}
                    autoComplete='family-name'
                    className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.fullName?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
              </div>
               {/* brand name */}
              <div className='sm:col-span-4'>
                <label
                  htmlFor='brandName'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Brand Name
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='brandName'
                    {...register('brandName')}
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.brandName?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.brandName.message}
                    </p>
                  )}
                </div>
              </div>
             {/* email */}
              <div className='sm:col-span-4'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    type='email'
                    {...register('email')}
                    autoComplete='email'
                    className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.email?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
                {/* phone number */}
              <div className='sm:col-span-4'>
                <label
                  htmlFor='phoneNumber'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Phone Number
                </label>
                <div className='mt-2'>
                  <input
                    id='phoneNumber'
                    type='phoneNumber'
                    {...register('phoneNumber')}
                    autoComplete='phoneNumber'
                    className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.email?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              {/* website url */}

              <div className='sm:col-span-2'>
                <label
                  htmlFor='websiteUrl'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Website Link
                </label>
                <div className='mt-2'>
                  <input
                    id='websiteUrl'
                    type='url'
                    {...register('websiteUrl')}
                    autoComplete='websiteUrl'
                    className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.email?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              {/*Facebook */}
              <div className='sm:col-span-2'>
                <label
                  htmlFor='socialMedia.facebook'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Facebook
                </label>
                <div className='mt-2'>
                  <input
                    id='socialMedia.facebook'
                    type="url"
                    {...register('socialMedia.facebook')}
                    autoComplete=''
                    className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.email?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='socialMedia.instagram'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Instagram
                </label>
                <div className='mt-2'>
                  <input
                    id='socialMedia.instagram'
                    type='websiteUrl'
                    {...register('socialMedia.instagram')}
                    autoComplete='websiteUrl'
                    className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.email?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='socialMedia.twitter'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Twitter
                </label>
                <div className='mt-2'>
                  <input
                    id='socialMedia.twitter'
                    type='url'
                    {...register('socialMedia.twitter')}
                    className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.email?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.email.message}
                    </p>
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
             Business Details
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Fill your registered business details here
            </p>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='country'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Country
                </label>
                <div className='mt-2'>
                  <select
                    id='country'
                    {...register('country')}
                    autoComplete='country-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                  {errors.country?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='street'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Street address
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='street'
                    {...register('street')}
                    autoComplete='street-address'
                    className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.street?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.street.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-2 sm:col-start-1'>
                <label
                  htmlFor='city'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  City
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='city'
                    {...register('city')}
                    autoComplete='address-level2'
                    className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.city?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='state'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  State / Province
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='state'
                    {...register('state')}
                    autoComplete='address-level1'
                    className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.state?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='zip'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  ZIP / Postal code
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='zip'
                    {...register('zip')}
                    autoComplete='postal-code'
                    className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.zip?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.zip.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Complete
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Thank you for your submission.
            </p>
          </>
        )}
      </form>

      {/* Navigation */}
      <div className='mt-8 pt-5'>
        <div className='flex justify-between'>
          <button
            type='button'
            onClick={prev}
            disabled={currentStep === 0}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
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
          </button>
          <button
            type='button'
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
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
                d='M8.25 4.5l7.5 7.5-7.5 7.5'
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}