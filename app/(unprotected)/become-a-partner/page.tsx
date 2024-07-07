import BecomeAPartnerForm from '@/components/molecules/forms/becomeAPartnerForm'
import { Card } from '@/components/ui/card'
import React from 'react'

const BecomeAPartner = () => {
  return (
    <main className='pt-32 md:pt-40 flex flex-col gap-4 p-4 justify-center items-center bg-brand-offwhite'>
      <h1 className='text-4xl text-brand-brown'>Welcome to Renivet! </h1>
      <p className='md:w-2/3 '>We&apos;re thrilled you&apos;re interested in joining our growing community of eco-conscious brands.
This form initiates the onboarding process for your brand on Renivet. By partnering with us,
you gain access to a dedicated audience actively seeking sustainable products and a platform
that champions your values.</p>
        <Card className='px-8 py-6 md:w-2/3 w-auto'>
        <BecomeAPartnerForm></BecomeAPartnerForm>
        </Card>
    </main>
  )
}

export default BecomeAPartner