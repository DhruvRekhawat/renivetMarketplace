'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler} from 'react-hook-form'


export const FormDataSchema =z.object({
    // Basic Information
    brandName: z.string().min(2, { message: "Brand name must be at least 2 characters." }) ,
    fullName: z.string().min(2, { message: "Contact name must be at least 2 characters." }) ,
    email: z.string().email({ message: "Invalid email address." }) ,
    phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 characters." }) ,
    websiteUrl: z.string().url({ message: "Invalid URL." }).optional(),
  
    // Business Information
    businessType: z.enum(["Sole_Proprietorship", "Partnership", "Corporation", "LLC", "Other"], {
      errorMap: () => ({ message: "Please select a valid business type." }),
    }) ,
    businessRegistrationNumber: z.string().min(1, { message: "Business registration number is required." }) ,
    businessCountryOfRegistration: z.string().min(2, { message: "businessType of registration is required." }) ,
  
    // Tax Information
    gstNumber: z.string().min(1, { message: "GST number is required." }).optional(),
  
    // Product Information
    productDescription: z.string().min(10, { message: "Product description must be at least 10 characters." }) ,
    categories: z.array(z.string()).min(1, { message: "Select at least one category." }) ,
    // priceRange: z.array(z.string()).min(1, { message: "Select at least one price range." }).optional(),
    materials: z.string().min(2, { message: "Please specify materials used." }) ,
  
    // Sustainability
    sustainabilityCertifications: z.array(z.string()).optional(),
    unSdgs: z.array(z.string()).optional(),
  
    // Brand Story
    // brandStory: z.string().min(50, { message: "Brand story must be at least 50 characters." }),
  
    // Social Media
    socialMedia: z.object({
      facebook: z.string().url({ message: "Invalid Facebook URL." }).optional(),
      instagram: z.string().url({ message: "Invalid Instagram URL." }).optional(),
      twitter: z.string().url({ message: "Invalid Twitter URL." }).optional(),
    }).optional(),
  
    // Manufacturing and Supply Chain
    totalProductionPerYear: z.number().positive({ message: "Production must be a positive number." }).optional(),
    numberOfSuppliers: z.number().int().positive({ message: "Number of suppliers must be a positive integer." }).optional(),
    supplyChainDescription: z.string().min(50, { message: "Supply chain description must be at least 50 characters." }).optional(),
    manufacturingProcesses: z.string().min(20, { message: "Manufacturing processes must be at least 20 characters." }).optional(),
  
    // Resource Usage
    electricityConsumption: z.number().positive({ message: "Electricity consumption must be a positive number." }).optional(),
    waterConsumption: z.number().positive({ message: "Water consumption must be a positive number." }).optional(),
  
    // Waste Management
    wastePercentage: z.number().min(0).max(100, { message: "Waste percentage must be between 0 and 100." }).optional(),
    recycledPercentage: z.number().min(0).max(100, { message: "Recycled percentage must be between 0 and 100." }).optional(),
  
    // Packaging
    packagingMaterials: z.string().min(5, { message: "Please describe packaging materials (at least 5 characters)." }) ,
  
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
    fields: [
      'fullName',
      'email',
      'phoneNumber',
      'websiteUrl',
      'socialMedia.facebook',
      'socialMedia.instagram',
      'socialMedia.twitter'
    ]
  },
  {
    id: 'Step 2',
    name: 'Business Information',
    fields: [
      'brandName',
      'businessType',
      'businessRegistrationNumber',
      'businessCountryOfRegistration',
      'gstNumber'
    ]
  },
  {
    id: 'Step 3',
    name: 'Product Information',
    fields: [
      'productDescription',
      'categories',
      'materials',
      'sustainabilityCertifications',
    ]
  },
  {
    id: 'Step 4',
    name: 'Logistics',
    fields: [
      'totalProductionPerYear',
      'numberOfSuppliers',
      'supplyChainDescription',
      'manufacturingProcesses',
      'packagingMaterials',
      'recycledPercentage',
      'wastePercentage',
      'waterConsumption',
      ' electricityConsumption',

    ]
  },
  { id: 'Step 5', name: 'Complete' }
]


export default function Form() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep

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
    resolver: zodResolver(FormDataSchema)
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
    <section className='absolute inset-0 flex flex-col justify-between sm:p-24 px-4 py-20'>
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
                  {errors.socialMedia?.facebook?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.socialMedia?.facebook?.message}
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
                  {errors.socialMedia?.instagram?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.socialMedia?.instagram?.message}
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
                  {errors.socialMedia?.twitter?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.socialMedia?.twitter?.message}
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
              <div className='sm:col-span-3'>
                <label
                  htmlFor='businessType'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Business Type
                </label>
                <div className='mt-2'>
                  <select
                    id='businessType'
                    {...register('businessType')}

                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    <option value={"Sole_Proprietorship"}>Sole Proprietorship</option>
                    <option>Partnership</option>
                    <option>Corporation</option>
                    <option>LLC</option>
                    <option>Other</option>
                  </select>
                  {errors.businessType?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.businessType.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='businessRegistrationNumberr'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Business Registeration Number
                </label>
                <div className='mt-2'>
                  <input
                    type="text"
                    id='businessRegistrationNumber'
                    {...register('businessRegistrationNumber')}
                    autoComplete='businessRegistrationNumber'
                    className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.businessRegistrationNumber?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.businessRegistrationNumber.message}
                    </p>
                  )}
                </div>
              </div>
              
              <div className='sm:col-span-2 sm:col-start-1'>
                <label
                  htmlFor='businessCountryOfRegistration'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Country
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='businessCountryOfRegistration'
                    {...register('businessCountryOfRegistration')}
                    autoComplete=''
                    className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.businessCountryOfRegistration?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.businessCountryOfRegistration.message}
                    </p>
                  )}
                </div>
              </div>


              <div className='sm:col-span-2'>
                <label
                  htmlFor='gstNumber'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  GST Number
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='gstNumber'
                    {...register('gstNumber')}
                    autoComplete=''
                    className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.gstNumber?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.gstNumber.message}
                    </p>
                  )}
                </div>
              </div>
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
      Product Details
    </h2>
    <p className='mt-1 text-sm leading-6 text-gray-600'>
      Tell us about your product here!
    </p>

    <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>

      {/* Product Description */}
      <div className='sm:col-span-4'>
        <label
          htmlFor='productDescription'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Product Description
        </label>
        <div className='mt-2'>
          <textarea
            id='productDescription'
            {...register('productDescription')}
            className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
          />
          {errors.productDescription?.message && (
            <p className='mt-2 text-sm text-red-400'>
              {errors.productDescription.message}
            </p>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className='sm:col-span-3'>
        <label
          htmlFor='categories'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Categories
        </label>
        <div className='mt-2'>
          <div className='flex justify-start items-center gap-1'>
            <input
              type='checkbox'
              id='Fairtrade'
              onChange={() => handleCheckboxChange('categories', 'Fairtrade')}
            />
            <p>Fairtrade</p>
          </div>
          <div className='flex justify-start items-center gap-1'>
            <input
              type='checkbox'
              id='GOTS'
              onChange={() => handleCheckboxChange('categories', 'GOTS')}
            />
            <p>GOTS</p>
          </div>
          <div className='flex justify-start items-center gap-1'>
            <input
              type='checkbox'
              id='FSC'
              onChange={() => handleCheckboxChange('categories', 'FSC')}
            />
            <p>FSC</p>
          </div>
          <div className='flex justify-start items-center gap-1'>
            <input
              type='checkbox'
              id='USDA Organic'
              onChange={() => handleCheckboxChange('categories', 'USDA Organic')}
            />
            <p>USDA Organic</p>
          </div>
          <div className='flex justify-start items-center gap-1'>
            <input
              type='checkbox'
              id='AnimalTesting'
              onChange={() => handleCheckboxChange('categories', 'Animal Testing')}
            />
            <p>Animal Testing (Does your brand test on animals?)</p>
          </div>
          {errors.categories?.message && (
            <p className='mt-2 text-sm text-red-400'>
              {errors.categories.message}
            </p>
          )}
        </div>
      </div>

      {/* Materials Used */}
      <div className='col-span-full'>
        <label
          htmlFor='materials'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Materials Used
        </label>
        <div className='mt-2'>
          <input
            type='text'
            id='materials'
            {...register('materials')}
            autoComplete='materials'
            placeholder='Please enter all the materials used'
            className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
          />
          {errors.materials?.message && (
            <p className='mt-2 text-sm text-red-400'>
              {errors.materials.message}
            </p>
          )}
        </div>
      </div>

      {/* Sustainability Certifications */}
      <div className='sm:col-span-2'>
        <label
          htmlFor='sustainabilityCertifications'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Sustainability Certifications
        </label>
        <div className='mt-2 flex flex-col gap-2'>
          <div className='flex justify-start items-center gap-1'>
            <input
              type='checkbox'
              id='FairtradeCert'
              onChange={() => handleCheckboxChange('sustainabilityCertifications', 'Fairtrade')}
            />
            <p>Fairtrade</p>
          </div>
          <div className='flex justify-start items-center gap-1'>
            <input
              type='checkbox'
              id='GOTSCert'
              onChange={() => handleCheckboxChange('sustainabilityCertifications', 'GOTS')}
            />
            <p>GOTS</p>
          </div>
          <div className='flex justify-start items-center gap-1'>
            <input
              type='checkbox'
              id='FSCCert'
              onChange={() => handleCheckboxChange('sustainabilityCertifications', 'FSC')}
            />
            <p>FSC</p>
          </div>
          <div className='flex justify-start items-center gap-1'>
            <input
              type='checkbox'
              id='USDAOrganicCert'
              onChange={() => handleCheckboxChange('sustainabilityCertifications', 'USDA Organic')}
            />
            <p>USDA Organic</p>
          </div>
          <div className='flex justify-start items-center gap-1'>
            <input
              type='checkbox'
              id='AnimalTestingCert'
              onChange={() => handleCheckboxChange('sustainabilityCertifications', 'Animal Testing')}
            />
            <p>Animal Testing (Does your brand test on animals?)</p>
          </div>
          {errors.sustainabilityCertifications?.message && (
            <p className='mt-2 text-sm text-red-400'>
              {errors.sustainabilityCertifications.message}
            </p>
          )}
        </div>
      </div>

      {/* UN Sustainable Development Goals */}
      <div className='sm:col-span-2'>
        <label
          htmlFor='unSdgs'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          UN Sustainable Development Goals
        </label>
        <div className='mt-2 flex flex-col gap-2'>
          <div className='flex justify-start items-center gap-1'>
            <input
              type='checkbox'
              id='NoPoverty'
              onChange={() => handleCheckboxChange('unSdgs', 'No Poverty')}
            />
            <p>No Poverty</p>
          </div>
          <div className='flex justify-start items-center gap-1'>
            <input
              type='checkbox'
              id='ZeroHunger'
              onChange={() => handleCheckboxChange('unSdgs', 'Zero Hunger')}
            />
            <p>Zero Hunger</p>
          </div>
          <div className='flex justify-start items-center gap-1'>
            <input
              type='checkbox'
              id='GoodHealth'
              onChange={() => handleCheckboxChange('unSdgs', 'Good Health and Well-being')}
            />
            <p>Good Health and Well-being</p>
          </div>
          <div className='flex justify-start items-center gap-1'>
            <input
              type='checkbox'
              id='QualityEducation'
              onChange={() => handleCheckboxChange('unSdgs', 'Quality Education')}
            />
            <p>Quality Education</p>
          </div>
          <div className='flex justify-start items-center gap-1'>
            <input
              type='checkbox'
              id='GenderEquality'
              onChange={() => handleCheckboxChange('unSdgs', 'Gender Equality')}
            />
            <p>Gender Equality</p>
          </div>
          {errors.unSdgs?.message && (
            <p className='mt-2 text-sm text-red-400'>
              {errors.unSdgs.message}
            </p>
          )}
        </div>
      </div>

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
            Logistics
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            Provide details about your logistics.
          </p>
          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            {/* Total Production Per Year */}
            <div className='sm:col-span-3'>
              <label
                htmlFor='totalProductionPerYear'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Total Production Per Year
              </label>
              <div className='mt-2'>
                <input
                  type='number'
                  id='totalProductionPerYear'
                  {...register('totalProductionPerYear', { valueAsNumber: true })}
                  className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                />
                {errors.totalProductionPerYear?.message && (
                  <p className='mt-2 text-sm text-red-400'>
                    {errors.totalProductionPerYear.message}
                  </p>
                )}
              </div>
            </div>
            {/* Number of Suppliers */}
            <div className='sm:col-span-3'>
              <label
                htmlFor='numberOfSuppliers'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Number of Suppliers
              </label>
              <div className='mt-2'>
                <input
                  type='number'
                  id='numberOfSuppliers'
                  {...register('numberOfSuppliers', { valueAsNumber: true })}
                  className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                />
                {errors.numberOfSuppliers?.message && (
                  <p className='mt-2 text-sm text-red-400'>
                    {errors.numberOfSuppliers.message}
                  </p>
                )}
              </div>
            </div>
            {/* Electricity Consumption */}
            <div className='sm:col-span-3'>
              <label
                htmlFor='electricityConsumption'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Electricity Consumption
              </label>
              <div className='mt-2'>
                <input
                  type='number'
                  id='electricityConsumption'
                  {...register('electricityConsumption', { valueAsNumber: true })}
                  className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                />
                {errors.electricityConsumption?.message && (
                  <p className='mt-2 text-sm text-red-400'>
                    {errors.electricityConsumption.message}
                  </p>
                )}
              </div>
            </div>
            {/* Water Consumption */}
            <div className='sm:col-span-3'>
              <label
                htmlFor='waterConsumption'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Water Consumption
              </label>
              <div className='mt-2'>
                <input
                  type='number'
                  id='waterConsumption'
                  {...register('waterConsumption', { valueAsNumber: true })}
                  className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                />
                {errors.waterConsumption?.message && (
                  <p className='mt-2 text-sm text-red-400'>
                    {errors.waterConsumption.message}
                  </p>
                )}
              </div>
            </div>
            {/* Waste Percentage */}
            <div className='sm:col-span-3'>
              <label
                htmlFor='wastePercentage'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Waste Percentage
              </label>
              <div className='mt-2'>
                <input
                  type='number'
                  id='wastePercentage'
                  {...register('wastePercentage', { valueAsNumber: true })}
                  className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                />
                {errors.wastePercentage?.message && (
                  <p className='mt-2 text-sm text-red-400'>
                    {errors.wastePercentage.message}
                  </p>
                )}
              </div>
            </div>
            {/* Recycled Percentage */}
            <div className='sm:col-span-3'>
              <label
                htmlFor='recycledPercentage'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Recycled Percentage
              </label>
              <div className='mt-2'>
                <input
                  type='number'
                  id='recycledPercentage'
                  {...register('recycledPercentage', { valueAsNumber: true })}
                  className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                />
                {errors.recycledPercentage?.message && (
                  <p className='mt-2 text-sm text-red-400'>
                    {errors.recycledPercentage.message}
                  </p>
                )}
              </div>
            </div>
            {/* Supply Chain Description */}
            <div className='col-span-full'>
              <label
                htmlFor='supplyChainDescription'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Supply Chain Description
              </label>
              <div className='mt-2'>
                <textarea
                  id='supplyChainDescription'
                  {...register('supplyChainDescription')}
                  className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                />
                {errors.supplyChainDescription?.message && (
                  <p className='mt-2 text-sm text-red-400'>
                    {errors.supplyChainDescription.message}
                  </p>
                )}
              </div>
            </div>
            {/* Manufacturing Processes */}
            <div className='col-span-full'>
              <label
                htmlFor='manufacturingProcesses'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Manufacturing Processes
              </label>
              <div className='mt-2'>
                <textarea
                  id='manufacturingProcesses'
                  {...register('manufacturingProcesses')}
                  className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                />
                {errors.manufacturingProcesses?.message && (
                  <p className='mt-2 text-sm text-red-400'>
                    {errors.manufacturingProcesses.message}
                  </p>
                )}
              </div>
            </div>
            {/* Packaging Materials */}
            <div className='col-span-full'>
              <label
                htmlFor='packagingMaterials'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Packaging Materials
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  id='packagingMaterials'
                  {...register('packagingMaterials')}
                  placeholder='Describe packaging materials used (at least 5 characters)'
                  className='block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                />
                {errors.packagingMaterials?.message && (
                  <p className='mt-2 text-sm text-red-400'>
                    {errors.packagingMaterials.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
          {currentStep === 4 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Complete
            </h2>
        
            <p className='mt-1 text-sm leading-6 text-gray-600'>

            </p>
          </>
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
            type='button'
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
    </section>
  )
}