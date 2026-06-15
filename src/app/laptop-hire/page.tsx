import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  GraduationCap, 
  Users, 
  TrendingDown, 
  Settings, 
  ShieldCheck, 
  Zap,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function LaptopHirePage() {
  const segments = [
    {
      title: 'For Students & People',
      icon: GraduationCap,
      description: 'Good for students and freelancers who need a fast laptop but do not want to buy one yet.',
      benefits: [
        'Cheap way to get a good laptop for a short time.',
        'Use it while your own laptop is being fixed.',
        'Get a fast laptop for your projects.'
      ]
    },
    {
      title: 'For Offices',
      icon: Briefcase,
      description: 'Help your business grow by renting laptops for your workers. It saves you a lot of money.',
      benefits: [
        'Give laptops to temporary staff quickly.',
        'No need to spend a lot of money at once.',
        'Get the same laptops for everyone in the office.'
      ]
    },
    {
      title: 'For Events',
      icon: Users,
      description: 'Make sure everyone at your meeting or event has a good laptop to use.',
      benefits: [
        'Order many laptops for workshops or exams.',
        'We can install the programs you need.',
        'We stay to help if there are any problems.'
      ]
    }
  ];

  const marketAdvantanges = [
    {
      title: 'Saves You Money',
      icon: TrendingDown,
      text: 'Laptops lose value as they get old. When you rent, you do not lose money and you always have a good machine.'
    },
    {
      title: 'No Repair Costs',
      icon: Settings,
      text: 'We fix everything for you. If a laptop breaks, we bring a new one for free.'
    },
    {
      title: 'Newest Models',
      icon: Zap,
      text: 'Get the latest laptops without paying full price. Upgrade whenever you want.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-zinc-50 py-20 border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-black tracking-tighter text-black sm:text-6xl uppercase italic">
            Rent a Laptop. <br /><span className="text-primary">Pay Less.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-zinc-500">
            Use high-quality laptops on your own terms. Rent for a few days or for your whole office in Nairobi.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="h-14 rounded-none bg-black text-white font-black uppercase tracking-widest px-8 hover:bg-primary transition-all">
              <Link href="/contact">Ask for Prices</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 rounded-none border-2 border-black font-black uppercase tracking-widest px-8">
              <Link href="/laptops">See Renting Models</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Rent? Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Why Renting is Good</h2>
            <h3 className="text-3xl font-black uppercase tracking-tighter text-black sm:text-4xl">Reasons to Hire instead of Buy</h3>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {marketAdvantanges.map((item, i) => (
              <div key={i} className="flex flex-col p-8 border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:border-black transition-all group">
                <div className="mb-6 h-12 w-12 flex items-center justify-center bg-white border border-zinc-200 group-hover:bg-primary transition-colors">
                  <item.icon className="h-6 w-6 text-black" />
                </div>
                <h4 className="text-lg font-black uppercase mb-3">{item.title}</h4>
                <p className="text-sm font-medium text-zinc-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segments Section */}
      <section className="bg-black py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-3">
            {segments.map((segment, i) => (
              <div key={i} className="flex flex-col">
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-10 w-10 flex items-center justify-center bg-primary rounded-full">
                    <segment.icon className="h-5 w-5 text-black" />
                  </div>
                  <h4 className="text-xl font-black uppercase italic tracking-tighter">{segment.title}</h4>
                </div>
                <p className="text-zinc-400 font-medium mb-8 leading-relaxed">
                  {segment.description}
                </p>
                <ul className="space-y-4">
                  {segment.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <span className="text-sm font-bold text-zinc-200">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison: Buy vs Rent */}
      <section className="py-24 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-none border-4 border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-black uppercase mb-8 text-center">Buying vs. Renting</h3>
            <div className="grid gap-8 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
              <div className="space-y-6 pb-8 md:pb-0 md:pr-8">
                <h4 className="font-black text-red-600 uppercase text-xs tracking-widest">Bad Things About Buying</h4>
                <ul className="space-y-4">
                  <li className="text-sm font-bold text-zinc-500 flex items-center gap-2">
                    <TrendingDown className="h-4 w-4" /> Value goes down quickly
                  </li>
                  <li className="text-sm font-bold text-zinc-500 flex items-center gap-2">
                    <TrendingDown className="h-4 w-4" /> You need a lot of money at once
                  </li>
                  <li className="text-sm font-bold text-zinc-500 flex items-center gap-2">
                    <TrendingDown className="h-4 w-4" /> The laptop becomes old in 3 years
                  </li>
                </ul>
              </div>
              <div className="space-y-6 pt-8 md:pt-0 md:pl-8">
                <h4 className="font-black text-emerald-600 uppercase text-xs tracking-widest">Good Things About Renting</h4>
                <ul className="space-y-4">
                  <li className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Pay only for the days you use
                  </li>
                  <li className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> It is a business expense you can claim
                  </li>
                  <li className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Always use the newest laptops
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Button asChild className="h-12 bg-black text-white font-black uppercase tracking-widest rounded-none hover:bg-primary transition-all">
                <Link href="/contact">Apply for Rental <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-24 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-12">
            <h3 className="text-3xl font-black uppercase tracking-tighter">We Support You</h3>
            <p className="mt-4 text-zinc-500 font-medium max-w-xl mx-auto italic border-l-4 border-primary pl-6 inline-block">
              "We don't just rent laptops; we make sure they work well for you."
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="text-xs font-black uppercase tracking-widest">Free Help if it Breaks</span>
            </div>
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-primary" />
              <span className="text-xs font-black uppercase tracking-widest">Programs already installed</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              <span className="text-xs font-black uppercase tracking-widest">Rent for as long as you need</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
