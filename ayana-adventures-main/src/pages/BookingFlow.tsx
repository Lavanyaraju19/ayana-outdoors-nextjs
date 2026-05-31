import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { allTreks } from '@/data/treks';
import { Check, Upload, ArrowLeft, ArrowRight } from 'lucide-react';
import PageBackgroundVideo from '@/components/PageBackgroundVideo';

const steps = ['Select Trek', 'Registration', 'Documents', 'Follow-Up', 'Payment', 'Confirmation'];

const BookingFlow = () => {
  const { trekId } = useParams<{ trekId: string }>();
  const navigate = useNavigate();
  const preselectedTrek = allTreks.find((t) => t.id === trekId);

  const [step, setStep] = useState(preselectedTrek ? 1 : 0);
  const [selectedTrek, setSelectedTrek] = useState(preselectedTrek || null);
  const [form, setForm] = useState({
    parentName: '', mobile: '', email: '', city: '', pincode: '',
    childName: '', childAge: '', childGender: '', medicalConditions: '',
    interests: [] as string[],
  });
  const [medicalPdf, setMedicalPdf] = useState<File | null>(null);
  const [declarationPdf, setDeclarationPdf] = useState<File | null>(null);
  const [followUp, setFollowUp] = useState<'callback' | 'payment' | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);

  const toggleInterest = (interest: string) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 0: return !!selectedTrek;
      case 1: return form.parentName && form.mobile && form.email && form.childName && form.childAge && form.childGender;
      case 2: return medicalPdf && declarationPdf;
      case 3: return !!followUp;
      case 4: return !!paymentMethod;
      default: return true;
    }
  };

  const handleFileChange = (setter: (f: File | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024) {
      setter(file);
    } else {
      alert('Please upload a PDF file under 5MB.');
    }
  };

  const inputClasses = "w-full bg-secondary/50 border border-border/30 rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors";

  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <PageBackgroundVideo />
      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-3xl md:text-4xl text-foreground text-center mb-8">
          Book Your <span className="text-primary">Adventure</span>
        </motion.h1>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-1 mb-10 overflow-x-auto">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body flex-shrink-0 ${i < step ? 'bg-primary text-primary-foreground' :
                  i === step ? 'border-2 border-primary text-primary' :
                    'border border-border/50 text-muted-foreground'
                }`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`w-6 h-px mx-1 ${i < step ? 'bg-primary' : 'bg-border/50'}`} />}
            </div>
          ))}
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-xl p-6 md:p-8">
          {/* Step 0: Select Trek */}
          {step === 0 && (
            <div>
              <h2 className="font-display text-xl text-foreground mb-4">Select a Trek</h2>
              <div className="space-y-3">
                {allTreks.map((trek) => (
                  <button
                    key={trek.id}
                    onClick={() => setSelectedTrek(trek)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors cursor-none ${selectedTrek?.id === trek.id ? 'border-primary bg-primary/10' : 'border-border/30 hover:border-primary/50'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-display text-sm text-foreground">{trek.title}</h3>
                        <p className="text-xs text-muted-foreground font-body">{trek.date} • {trek.duration}</p>
                      </div>
                      <span className="text-primary font-body font-semibold text-sm">{trek.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Registration */}
          {step === 1 && (
            <div>
              <h2 className="font-display text-xl text-foreground mb-4">Registration Details</h2>
              <h3 className="font-body text-sm text-primary mb-3 font-medium">Parent / Guardian</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <input placeholder="Full Name *" value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })} className={inputClasses} required />
                <input placeholder="Mobile Number *" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className={inputClasses} required />
                <input placeholder="Email *" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClasses} required />
                <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputClasses} />
                <input placeholder="Pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className={inputClasses} />
              </div>
              <h3 className="font-body text-sm text-primary mb-3 font-medium">Child Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <input placeholder="Child's Name *" value={form.childName} onChange={(e) => setForm({ ...form, childName: e.target.value })} className={inputClasses} required />
                <input placeholder="Age *" type="number" value={form.childAge} onChange={(e) => setForm({ ...form, childAge: e.target.value })} className={inputClasses} required />
                <select value={form.childGender} onChange={(e) => setForm({ ...form, childGender: e.target.value })} className={inputClasses}>
                  <option value="">Gender *</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <textarea placeholder="Medical Conditions (if any)" value={form.medicalConditions} onChange={(e) => setForm({ ...form, medicalConditions: e.target.value })} className={inputClasses + " resize-none"} rows={2} />
              <h3 className="font-body text-sm text-primary mb-3 mt-4 font-medium">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {['Trekking', 'Adventure', 'Wildlife', 'Photography', 'Other'].map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-full text-xs font-body border transition-colors cursor-none ${form.interests.includes(interest) ? 'bg-primary text-primary-foreground border-primary' : 'border-border/50 text-muted-foreground hover:border-primary'
                      }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Documents */}
          {step === 2 && (
            <div>
              <h2 className="font-display text-xl text-foreground mb-4">Upload Documents</h2>
              <p className="text-sm text-muted-foreground font-body mb-6">Both documents are mandatory. Only PDF files under 5MB accepted.</p>
              {[
                { label: 'Medical Form (PDF)', file: medicalPdf, setter: setMedicalPdf },
                { label: 'Declaration Form (PDF)', file: declarationPdf, setter: setDeclarationPdf },
              ].map(({ label, file, setter }) => (
                <div key={label} className="mb-4">
                  <label className="block font-body text-sm text-foreground mb-2">{label} *</label>
                  <label className={`flex items-center gap-3 p-4 rounded-lg border border-dashed cursor-pointer transition-colors ${file ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/50'}`}>
                    <Upload className={`w-5 h-5 ${file ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={`text-sm font-body ${file ? 'text-primary' : 'text-muted-foreground'}`}>
                      {file ? file.name : 'Click to upload PDF'}
                    </span>
                    <input type="file" accept=".pdf" onChange={handleFileChange(setter)} className="hidden" />
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Follow-Up */}
          {step === 3 && (
            <div>
              <h2 className="font-display text-xl text-foreground mb-4">How would you like to proceed?</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setFollowUp('callback')}
                  className={`w-full p-4 rounded-lg border text-left transition-colors cursor-none ${followUp === 'callback' ? 'border-primary bg-primary/10' : 'border-border/30 hover:border-primary/50'}`}
                >
                  <h3 className="font-body text-sm text-foreground font-medium">Request a Call Back</h3>
                  <p className="text-xs text-muted-foreground font-body mt-1">Our team will call you to discuss details and complete the booking.</p>
                </button>
                <button
                  onClick={() => setFollowUp('payment')}
                  className={`w-full p-4 rounded-lg border text-left transition-colors cursor-none ${followUp === 'payment' ? 'border-primary bg-primary/10' : 'border-border/30 hover:border-primary/50'}`}
                >
                  <h3 className="font-body text-sm text-foreground font-medium">Proceed to Payment</h3>
                  <p className="text-xs text-muted-foreground font-body mt-1">Complete your booking now with online payment.</p>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <div>
              <h2 className="font-display text-xl text-foreground mb-2">Payment</h2>
              <p className="text-sm text-muted-foreground font-body mb-6">
                Amount: <span className="text-primary font-semibold text-lg">{selectedTrek?.price}</span> for {selectedTrek?.title}
              </p>
              <div className="space-y-3 mb-6">
                {['UPI', 'Credit/Debit Card', 'Net Banking', 'Bank Transfer'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`w-full p-4 rounded-lg border text-left transition-colors cursor-none ${paymentMethod === method ? 'border-primary bg-primary/10' : 'border-border/30 hover:border-primary/50'}`}
                  >
                    <span className="font-body text-sm text-foreground">{method}</span>
                  </button>
                ))}
              </div>
              {paymentMethod === 'Bank Transfer' && (
                <div>
                  <p className="text-xs text-muted-foreground font-body mb-2">Upload payment screenshot after transfer:</p>
                  <label className="flex items-center gap-3 p-4 rounded-lg border border-dashed border-border/50 hover:border-primary/50 cursor-pointer transition-colors">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-body text-muted-foreground">
                      {paymentScreenshot ? paymentScreenshot.name : 'Upload Screenshot'}
                    </span>
                    <input type="file" accept="image/*" onChange={(e) => setPaymentScreenshot(e.target.files?.[0] || null)} className="hidden" />
                  </label>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl text-foreground mb-2">Booking Confirmed!</h2>
              <p className="font-body text-muted-foreground mb-4">
                Your booking for <span className="text-primary font-medium">{selectedTrek?.title}</span> has been confirmed.
              </p>
              <div className="bg-secondary/30 rounded-lg p-4 text-left text-sm font-body text-muted-foreground space-y-1 mb-6">
                <p>✅ Confirmation email sent to {form.email}</p>
                <p>✅ WhatsApp confirmation sent to {form.mobile}</p>
                <p>✅ Itinerary & packing list attached</p>
                <p>✅ Travel instructions included</p>
              </div>
              <Button onClick={() => navigate('/')} className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-8 cursor-none">
                Back to Home
              </Button>
            </div>
          )}

          {/* Navigation buttons */}
          {step < 5 && (
            <div className="flex justify-between mt-6 pt-4 border-t border-border/30">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="border-border/50 text-foreground/60 rounded-full cursor-none"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button
                onClick={() => {
                  if (step === 3 && followUp === 'callback') {
                    setStep(5);
                  } else {
                    setStep(step + 1);
                  }
                }}
                disabled={!canProceed()}
                className="bg-primary text-primary-foreground hover:bg-accent rounded-full cursor-none"
              >
                {step === 4 ? 'Confirm Payment' : 'Next'} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default BookingFlow;
