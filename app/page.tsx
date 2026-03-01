import { VariantProvider } from './components/VariantProvider';
import VariantSwitcher from './components/VariantSwitcher';
import Header from './components/Header';
import Hero from './components/Hero';
import SloganMorph from './components/SloganMorph';
import SocialTicker from './components/SocialTicker';
import PainPoints from './components/PainPoints';
import AmplifyPain from './components/AmplifyPain';
import Solution from './components/Solution';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import OfferStack from './components/OfferStack';
import Guarantee from './components/Guarantee';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import SMSButton from './components/SMSButton';

export default function Home() {
  return (
    <VariantProvider>
      <PageContent />
    </VariantProvider>
  );
}

function PageContent() {
  return (
    <main>
      <Header />
      <Hero />
      <SloganMorph />
      <SocialTicker />
      <PainPoints />
      <AmplifyPain />
      <Solution />
      <HowItWorks />
      <Benefits />
      <Portfolio />
      <Testimonials />
      <OfferStack />
      <Guarantee />
      <FAQ />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
      <SMSButton />
      <VariantSwitcher />
    </main>
  );
}
