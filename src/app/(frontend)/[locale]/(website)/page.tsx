import { TypedLocale } from 'payload'

import NextGamesSection from '@/components/home/NextGamesSection'
import HeroSection from '@/components/home/HeroSection'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import StatsSection from '@/components/home/StatsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import CTASection from '@/components/home/CTASection'
import StrangersSection from '@/components/home/StrangersSection'
import WhenAndWhereSection from '@/components/home/WhenAndWhereSection'
import NumbersSection from '@/components/home/NumbersSection'
import FAQSection from '@/components/home/FAQSection'
import CTA2Section from '@/components/home/CTA2Section'
import Footer from '@/components/home/Footer'
import { generateMetaForPage } from '@/lib/metadata'
import { Metadata } from 'next'
import { getCachedHome } from '@/domains/home/get-home-data.service'
import { getCachedSports } from '@/domains/sports/get-sports-data.service'

// Option 1: Force dynamic rendering
// export const dynamic = 'force-dynamic'

// Option 2: Revalidate the page every X seconds (e.g., 60 seconds)
export const revalidate = 60

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function HomePage({ params }: Args) {
  const { locale = 'en' } = await params

  const [home, sports] = await Promise.all([getCachedHome(locale), getCachedSports(locale)])

  return (
    <main>
      <HeroSection hero={home.hero} sports={sports} />
      <NextGamesSection nextGames={home.nextGames} />
      <HowItWorksSection howItWorks={home.howItWorks} />
      <StatsSection stats={home.stats} />
      <TestimonialsSection testimonials={home.testimonials} />
      <CTASection cta={home.cta} />
      <StrangersSection strangers={home.strangers} />
      <WhenAndWhereSection whenAndWhere={home.whenAndWhere} />
      <NumbersSection numbers={home.numbers} />
      <FAQSection faq={home.faq} />
      <CTA2Section cta2={home.cta2} />
      <Footer locale={locale} />
    </main>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale = 'en' } = await params

  const home = await getCachedHome(locale)

  const metadata = await generateMetaForPage({ doc: home.seo ?? {} })

  return {
    ...metadata,
    alternates: {
      canonical: `/${locale}`,
    },
  }
}
