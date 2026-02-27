import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PawPrint, ShieldCheck, Heart, MapPin, ArrowRight, Users, 
  Building2, Smartphone, Info, CheckCircle2, Search, 
  MessageSquare, Mail, Phone, Instagram, Twitter, Facebook,
  Dog, Cat, Bird, Rabbit, Sparkles, Camera, Coins, Gift, TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';

// Custom Cow icon since lucide doesn't have a simple one in the default set sometimes
const CowIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 10c-2 0-4.5-1.5-4.5-4.5S10 1 12 1s4.5 1.5 4.5 4.5S14 10 12 10z" />
    <path d="M12 10c2 0 4.5 1.5 4.5 4.5S14 19 12 19s-4.5-1.5-4.5-4.5S10 10 12 10z" />
    <path d="M7.5 5.5c-1.5 0-3 1-3 2.5s1.5 2.5 3 2.5" />
    <path d="M16.5 5.5c1.5 0 3 1 3 2.5s-1.5 2.5-3 2.5" />
    <circle cx="12" cy="14.5" r="1.5" />
  </svg>
);

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const LandingPage = () => {
  return (
    <div className="space-y-32 pb-24 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-100 shadow-sm"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              Trusted by 50+ NGOs nationwide
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-display font-bold text-slate-900 leading-[1] tracking-tight"
            >
              Every Life <br />
              <span className="text-emerald-500 relative inline-block">
                Matters.
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute bottom-2 left-0 h-3 bg-emerald-100 -z-10"
                />
              </span> <br />
              Rescue Together.
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-slate-600 max-w-lg leading-relaxed"
            >
              The bridge between compassionate citizens and animal rescue organizations. Report, rescue, and adopt street animals in need.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/signup" className="group relative bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-200 text-center overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Join the Mission <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div 
                  whileHover={{ x: '100%' }}
                  initial={{ x: '-100%' }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-white/20 skew-x-12"
                />
              </Link>
              <Link to="/reports" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all text-center shadow-sm hover:shadow-md">
                View Reports
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1610387308877-d8c8d0e9b6f3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RyZWV0JTIwZG9nfGVufDB8fDB8fHww" 
                alt="Rescue Dog" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 z-20 max-w-[240px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <Heart className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                </div>
                <span className="font-bold text-slate-900">1,200+ Rescued</span>
              </div>
              <p className="text-xs text-slate-500">Animals found new homes and medical care through PawRescue this month.</p>
            </motion.div>

            {/* Decorative blobs */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-200/30 blur-3xl rounded-full -z-10 animate-pulse" />
            <div className="absolute -bottom-12 -right-24 w-48 h-48 bg-blue-200/30 blur-3xl rounded-full -z-10" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl"
              >
                <img 
                  src="https://media.istockphoto.com/id/157190547/photo/cow-on-the-road-india.jpg?s=612x612&w=0&k=20&c=87nyYlXKGjCTd1PjLoelhlc0dR1805EDHbLuH1qKKms=" 
                  alt="About Us" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="absolute -top-8 -right-8 bg-emerald-500 text-white p-8 rounded-3xl shadow-2xl hidden md:block"
              >
                <p className="text-4xl font-display font-bold">5+</p>
                <p className="text-sm font-semibold opacity-80">Years of Impact</p>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-wider text-sm">
              <Info className="w-4 h-4" />
              Our Mission
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900">Dedicated to Every Street Animal</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              PawRescue was founded on the belief that no animal should suffer alone on the streets. We provide a digital infrastructure that empowers citizens to become rescuers and connects them with professional NGOs.
            </p>
            <div className="space-y-6">
              {[
                { title: "Rapid Response", desc: "Real-time alerts to nearby NGOs for emergency cases." },
                { title: "Verified NGOs", desc: "We only partner with registered and vetted animal welfare organizations." },
                { title: "Community Driven", desc: "A platform built by animal lovers, for animal lovers." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 group"
                >
                  <div className="bg-emerald-100 p-2 rounded-full group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Adoption Process Section */}
      <section id="adoption" className="scroll-mt-24 bg-slate-50 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-24 rounded-[4rem]">
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900">7 Simple Steps to Adoption</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Your journey to finding the perfect companion starts here. We've made our adoption process simple and thorough.</p>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <StepCard 
              number="01"
              icon={<Search className="w-6 h-6" />}
              title="Browse Pets"
              description="Explore our collection of adorable pets looking for their forever homes."
            />
            <StepCard 
              number="02"
              icon={<MessageSquare className="w-6 h-6" />}
              title="Inquiry"
              description="Express your interest and our team will get in touch with you."
            />
            <StepCard 
              number="03"
              icon={<Users className="w-6 h-6" />}
              title="Meet & Greet"
              description="Spend time with the animal to see if you're a perfect match."
            />
            <StepCard 
              number="04"
              icon={<ShieldCheck className="w-6 h-6" />}
              title="Home Check"
              description="A quick visit to ensure your home is safe for the new member."
            />
            <StepCard 
              number="05"
              icon={<CheckCircle2 className="w-6 h-6" />}
              title="Approval"
              description="Once everything is verified, your application gets approved."
            />
            <StepCard 
              number="06"
              icon={<Info className="w-6 h-6" />}
              title="Paperwork"
              description="Complete the necessary legal adoption documentation."
            />
            <StepCard 
              number="07"
              icon={<Heart className="w-6 h-6" />}
              title="Welcome Home"
              description="Take your new best friend home and start your journey together!"
            />
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="bg-emerald-500 p-8 rounded-[2.5rem] text-white flex flex-col justify-center items-center text-center space-y-4 shadow-xl shadow-emerald-200"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <PawPrint className="w-12 h-12" />
              </motion.div>
              <h4 className="font-bold text-xl">Ready to start?</h4>
              <Link to="/reports" className="bg-white text-emerald-600 px-8 py-3 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all shadow-lg">
                Browse Animals
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Animal Info Section */}
      <section id="animals" className="scroll-mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900">Meet Our Friends</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Learn more about the animals we commonly rescue and how to care for them.</p>
        </motion.div>

        <motion.div 
          initial="initial"
          whileInView="animate"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
        >
          <AnimalCard 
            icon={<Dog className="w-10 h-10 text-amber-500" />}
            name="Street Dogs"
            info="Loyal and resilient. They need vaccinations and basic training to adapt to homes."
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtMRcJ4QK-mk5-wEaQ3wp9S3L1HRNmRXd2-Q&s"
          />
          <AnimalCard 
            icon={<Cat className="w-10 h-10 text-indigo-500" />}
            name="Community Cats"
            info="Independent yet affectionate. Best suited for indoor-outdoor living initially."
            image="https://www.spcai.org/wp-content/uploads/2022/05/King-Street-Cats-Marissa-scaled-e1667407710609.jpg"
          />
          <AnimalCard 
            icon={<CowIcon className="w-10 h-10 text-stone-500" />}
            name="Stray Cows"
            info="Often found in urban traffic. Require gaushala care and proper nutrition."
            image="https://static.toiimg.com/thumb/imgsize-23456,msid-85444504,width-600,resizemode-4/tyjtyjty.jpg"
          />
          <AnimalCard 
            icon={<Bird className="w-10 h-10 text-emerald-500" />}
            name="Injured Birds"
            info="Often victims of kite strings or heat. Require specialized avian care and rest."
            image="https://www.shutterstock.com/image-photo/urban-pigeons-eating-street-food-600nw-2407868849.jpg"
          />
          <AnimalCard 
            icon={<Rabbit className="w-10 h-10 text-rose-500" />}
            name="Small Mammals"
            info="Rabbits and squirrels often need rescue from predators or urban hazards."
            image="https://c8.alamy.com/comp/EHN8PH/rabbit-traffic-casualty-on-the-asphalt-of-a-street-EHN8PH.jpg"
          />
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="scroll-mt-24">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-wider text-sm">
            <Camera className="w-4 h-4" />
            Happy Tails
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900">Rescue Gallery</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Glimpses of the lives we've touched and the transformations we've witnessed.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800", alt: "Rescued Dog" },
            { url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800", alt: "Rescued Cat" },
            { url: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&q=80&w=800", alt: "Rescued Cow" },
            { url: "https://media.istockphoto.com/id/1060217142/photo/young-robin-in-mans-hand.jpg?s=612x612&w=0&k=20&c=pEbx3E-1qldZYc6SMk-H-5zgcAh0C88WrHfs2_8NklQ=", alt: "Rescued Bird" },
            { url: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800", alt: "Happy Dog" },
            { url: "https://delavanlakesvet.com/wp-content/uploads/sites/195/2022/03/smiling-cat-for-web.jpg", alt: "Happy Cat" },
            { url: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=800", alt: "Happy Cow" },
            { url: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=800", alt: "Rescued Rabbit" }
          ].map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
              className="aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-white"
            >
              <img 
                src={img.url} 
                alt={img.alt} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fundraising Section */}
      <section id="donate" className="scroll-mt-24">
        <div className="bg-emerald-600 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl shadow-emerald-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-emerald-500/30 px-4 py-2 rounded-full text-sm font-bold border border-emerald-400/30">
                <Coins className="w-4 h-4" />
                Support Our Mission
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight">Your Contribution <br /> Saves Lives.</h2>
              <p className="text-emerald-50 text-lg leading-relaxed max-w-md">
                Every donation goes directly towards medical supplies, food, and shelter for street animals. Help us continue our rescue operations.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { amount: "$10", label: "Medical Kit", desc: "Basic first aid for one animal" },
                  { amount: "$25", label: "Weekly Food", desc: "Nutritious meals for 5 dogs" },
                  { amount: "$50", label: "Emergency Care", desc: "Critical surgery support" },
                  { amount: "$100", label: "Full Recovery", desc: "Complete treatment cycle" }
                ].map((tier, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-3xl"
                  >
                    <p className="text-3xl font-display font-bold mb-1">{tier.amount}</p>
                    <p className="font-bold text-emerald-200">{tier.label}</p>
                    <p className="text-xs text-emerald-100/70 mt-1">{tier.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] p-8 md:p-12 text-slate-900 shadow-2xl"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Current Goal</p>
                    <p className="text-4xl font-display font-bold text-slate-900">$25,000</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-600">75% Raised</p>
                    <p className="text-slate-400 text-xs">from 450 donors</p>
                  </div>
                </div>

                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '75%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>

                <div className="space-y-4">
                  <p className="font-bold text-slate-900">Select Donation Amount</p>
                  <div className="grid grid-cols-3 gap-3">
                    {["$10", "$25", "$50", "$100", "$250", "Other"].map((amt) => (
                      <button 
                        key={amt}
                        className="py-3 rounded-xl border-2 border-slate-100 font-bold text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition-all"
                      >
                        {amt}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-2">
                  <Gift className="w-5 h-5" />
                  Donate Now
                </button>
                
                <p className="text-center text-xs text-slate-400">
                  Secure payment powered by Stripe. All donations are tax-deductible.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Decorative background elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-400/20 blur-[100px] rounded-full" />
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-white overflow-hidden relative"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
          <StatItem label="Active NGOs" value="150+" />
          <StatItem label="Cities Covered" value="45" />
          <StatItem label="Successful Rescues" value="8.5k" />
          <StatItem label="Adoptions" value="2.1k" />
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full" />
      </motion.section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[4rem] border border-slate-200 overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 md:p-20 space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900">Get in Touch</h2>
                <p className="text-slate-500 text-lg">Have questions about adoption or want to partner with us? We're here to help.</p>
              </div>

              <div className="space-y-8">
                {[
                  { icon: <Mail className="w-6 h-6 text-emerald-600" />, label: "Email Us", val: "harshith@gmail.com", bg: "bg-emerald-100" },
                  { icon: <Phone className="w-6 h-6 text-blue-600" />, label: "Call Us", val: "+91 8524695197", bg: "bg-blue-100" },
                  { icon: <MapPin className="w-6 h-6 text-purple-600" />, label: "Our HQ", val: "No 5 , 7th cross Kengri", bg: "bg-purple-100" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-6 group"
                  >
                    <div className={`${item.bg} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                      <p className="text-slate-900 font-bold text-lg">{item.val}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-12 border-t border-slate-100 flex gap-6">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <motion.a 
                    key={i}
                    whileHover={{ y: -5, scale: 1.1 }}
                    href="#" 
                    className="p-4 rounded-2xl bg-slate-50 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-12 md:p-20">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">First Name</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white transition-all" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Last Name</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white transition-all" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email Address</label>
                  <input type="email" className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white transition-all" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Message</label>
                  <textarea rows={4} className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white transition-all resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

const StepCard = ({ number, icon, title, description }: { number: string, icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    variants={fadeInUp}
    whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:shadow-2xl transition-all space-y-4 relative overflow-hidden group"
  >
    <div className="text-8xl font-display font-bold text-slate-50 absolute -right-6 -top-6 group-hover:text-emerald-50 transition-colors pointer-events-none">
      {number}
    </div>
    <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center text-emerald-600 relative z-10 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
      {icon}
    </div>
    <div className="relative z-10">
      <h4 className="font-bold text-slate-900 mb-2 text-xl">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const AnimalCard = ({ icon, name, info, image }: { icon: React.ReactNode, name: string, info: string, image: string }) => (
  <motion.div 
    variants={fadeInUp}
    whileHover={{ y: -10 }}
    className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden hover:shadow-2xl transition-all group"
  >
    <div className="aspect-[4/3] overflow-hidden">
      <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
    </div>
    <div className="p-8 space-y-4">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-emerald-50 transition-colors">{icon}</div>
        <h4 className="font-bold text-slate-900 text-xl">{name}</h4>
      </div>
      <p className="text-slate-500 text-sm leading-relaxed">{info}</p>
    </div>
  </motion.div>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    variants={fadeInUp}
    whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:shadow-2xl transition-all group"
  >
    <div className="mb-6 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
  </motion.div>
);

const StatItem = ({ label, value }: { label: string, value: string }) => (
  <div className="space-y-2">
    <motion.p 
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      className="text-5xl md:text-7xl font-display font-bold text-emerald-400"
    >
      {value}
    </motion.p>
    <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest">{label}</p>
  </div>
);
