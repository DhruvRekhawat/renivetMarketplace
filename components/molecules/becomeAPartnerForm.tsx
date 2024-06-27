"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  // Basic Information
  brandName: z.string().min(2, { message: "Brand name must be at least 2 characters." }),
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 characters." }),
  websiteUrl: z.string().url({ message: "Invalid URL." }).optional(),

  // Business Information
  businessType: z.enum(["Sole Proprietorship", "Partnership", "Corporation", "LLC", "Other"], {
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
  brandLogo: z.instanceof(File, { message: "Brand logo is required." }),
  certifications: z.array(z.instanceof(File)).optional(),
  productCatalog: z.instanceof(File, { message: "Product catalog is required." }),
})

export default function BrandOnboardingForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: "",
      contactName: "",
      email: "",
      phoneNumber: "",
      websiteUrl: "",
      businessRegistrationNumber: "",
      countryOfRegistration: "",
      gstNumber: "",
      productDescription: "",
      categories: [],
      priceRange: [],
      materials: "",
      sustainabilityCertifications: [],
      animalTesting: false,
      unSdgs: [],
      brandStory: "",
      socialMedia: {
        facebook: "",
        instagram: "",
        twitter: "",
      },
      totalProductionPerYear: 0,
      numberOfSuppliers: 0,
      supplyChainDescription: "",
      manufacturingProcesses: "",
      electricityConsumption: 0,
      waterConsumption: 0,
      wastePercentage: 0,
      recycledPercentage: 0,
      packagingMaterials: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    router.push('/approval')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Basic Information</h2>
          <FormField
            control={form.control}
            name="brandName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your brand name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your website URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Business Information</h2>
          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a business type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                    <SelectItem value="Corporation">Corporation</SelectItem>
                    <SelectItem value="LLC">LLC</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessRegistrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Registration Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business registration number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="countryOfRegistration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country of Registration</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your country of registration" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Tax Information</h2>
          <FormField
            control={form.control}
            name="gstNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GST Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your GST number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Product Information</h2>
          <FormField
            control={form.control}
            name="productDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your products"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
            render={() => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <div className="space-y-2">
                  {['Category1', 'Category2', 'Category3'].map((category) => (
                    <FormField
                      key={category}
                      control={form.control}
                      name="categories"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={category}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(category)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, category])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== category
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {category}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceRange"
            render={() => (
              <FormItem>
                <FormLabel>Price Range</FormLabel>
                <div className="space-y-2">
                  {['$0-$50', '$51-$100', '$101-$200', '$201+'].map((range) => (
                    <FormField
                      key={range}
                      control={form.control}
                      name="priceRange"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={range}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(range)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, range])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== range
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {range}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="materials"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Materials</FormLabel>
                <FormControl>
                  <Input placeholder="Enter materials used" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Sustainability</h2>
          <FormField
            control={form.control}
            name="sustainabilityCertifications"
            render={() => (
              <FormItem>
                <FormLabel>Sustainability Certifications</FormLabel>
                <div className="space-y-2">
                  {['Fairtrade', 'GOTS', 'FSC', 'USDA Organic'].map((cert) => (
                    <FormField
                      key={cert}
                      control={form.control}
                      name="sustainabilityCertifications"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={cert}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(cert)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, cert])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== cert
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {cert}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="animalTesting"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Animal Testing</FormLabel>
                  <FormDescription>
                    Does your brand test on animals?
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unSdgs"
            render={() => (
              <FormItem>
                <FormLabel>UN Sustainable Development Goals</FormLabel>
                <div className="space-y-2">
                  {['No Poverty', 'Zero Hunger', 'Good Health and Well-being', 'Quality Education', 'Gender Equality'].map((sdg) => (
                    <FormField
                      key={sdg}
                      control={form.control}
                      name="unSdgs"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={sdg}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(sdg)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, sdg])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== sdg
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {sdg}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Brand Story</h2>
          <FormField
            control={form.control}
            name="brandStory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Story</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us your brand story"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Social Media</h2>
          <FormField
            control={form.control}
            name="socialMedia.facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Facebook URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="socialMedia.instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Instagram URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="socialMedia.twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Twitter URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Manufacturing and Supply Chain</h2>
          <FormField
            control={form.control}
            name="totalProductionPerYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Production Per Year</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter total production" {...field} onChange={e => field.onChange(+e.target.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numberOfSuppliers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Suppliers</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter number of suppliers" {...field} onChange={e => field.onChange(+e.target.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="supplyChainDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supply Chain Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your supply chain"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="manufacturingProcesses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manufacturing Processes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your manufacturing processes"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Resource Usage</h2>
          <FormField
            control={form.control}
            name="electricityConsumption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Electricity Consumption (kWh/year)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter electricity consumption" {...field} onChange={e => field.onChange(+e.target.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="waterConsumption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Water Consumption (Liters/year)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter water consumption" {...field} onChange={e => field.onChange(+e.target.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Waste Management</h2>
          <FormField
            control={form.control}
            name="wastePercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Waste Percentage</FormLabel>
                <FormControl>
                  <Slider
                   defaultValue={[33]} max={100} step={1}
                  />
                </FormControl>
                <FormDescription>Current value: {field.value}%</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recycledPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recycled Percentage</FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[33]} max={100} step={1}
                    
                  />
                </FormControl>
                <FormDescription>Current value: {field.value}%</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Packaging</h2>
          <FormField
            control={form.control}
            name="packagingMaterials"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Packaging Materials</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your packaging materials"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">File Uploads</h2>
          <FormField
            control={form.control}
            name="brandLogo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Logo</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="certifications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certifications</FormLabel>
                <FormControl>
                  <Input type="file" multiple accept=".pdf,.doc,.docx" onChange={(e) => field.onChange(Array.from(e.target.files || []))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productCatalog"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Catalog</FormLabel>
                <FormControl>
                  <Input type="file" accept=".pdf" onChange={(e) => field.onChange(e.target.files?.[0])} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}