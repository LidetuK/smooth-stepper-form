import { useState } from 'react';
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  interest: string;
  source: string;
  sourceOther: string;
  termsAccepted: boolean;
}

const sourceOptions = [
  { value: 'social', label: 'Social Media' },
  { value: 'newsletter', label: 'Email Newsletter' },
  { value: 'referral', label: 'Friend/Family Referral' },
  { value: 'podcast', label: 'Podcast/Video' },
  { value: 'other', label: 'Other' },
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneCountry: '+1',
    phoneNumber: '',
    interest: '',
    source: '',
    sourceOther: '',
    termsAccepted: false
  });

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-lg font-medium text-primary mb-2">
            <span className="flex items-center">
              {currentStep}→
            </span>
            <h2>Join the Waiting List</h2>
          </div>
        </div>

        <div className={cn("space-y-6", isAnimating ? "slide-up-exit" : "slide-up-enter")}>
          {currentStep === 1 && (
            <div className="prose prose-gray">
              <h3 className="text-2xl font-semibold mb-4">Join the Waiting List for This Life-Changing Program!</h3>
              <p className="text-muted-foreground">
                Thank you for your interest! We're thrilled that you want to be part of this transformative experience. 
                Currently, the program is closed due to limited space, but don't worry—joining the waitlist is the best 
                way to secure your spot when it reopens. Spaces fill up quickly, so sign up now to ensure you don't miss out!
              </p>
              <Button onClick={handleNext} className="mt-4">Continue</Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name *</label>
                  <Input 
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name *</label>
                  <Input 
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email Address *</label>
                <Input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                <div className="flex gap-2">
                  <Select 
                    value={formData.phoneCountry}
                    onValueChange={(value) => handleInputChange('phoneCountry', value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+1">US (+1)</SelectItem>
                      <SelectItem value="+44">UK (+44)</SelectItem>
                      <SelectItem value="+33">FR (+33)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input 
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="flex-1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Why are you interested? (Optional)</label>
                <Textarea 
                  value={formData.interest}
                  onChange={(e) => handleInputChange('interest', e.target.value)}
                  placeholder="I want to grow personally and professionally..."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">How did you hear about us? (Optional)</label>
                <Select 
                  value={formData.source}
                  onValueChange={(value) => handleInputChange('source', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {sourceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.source === 'other' && (
                  <Input 
                    className="mt-2"
                    placeholder="Please specify"
                    value={formData.sourceOther}
                    onChange={(e) => handleInputChange('sourceOther', e.target.value)}
                  />
                )}
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-2">
                  <input 
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-muted-foreground">
                    By clicking "Submit," you agree to receive emails, phone calls, and SMS messages. 
                    Message and data rates may apply. You may opt out at any time by texting "STOP."
                  </span>
                </label>
                <Button 
                  onClick={handleNext}
                  disabled={!formData.termsAccepted}
                  className="w-full"
                >
                  Secure My Spot on the Waitlist
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="fixed bottom-4 right-4 flex gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={cn(
              "p-2 rounded-full transition-opacity duration-200",
              currentStep === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-accent"
            )}
          >
            <ChevronUp className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full hover:bg-accent transition-opacity duration-200"
          >
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;