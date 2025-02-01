import { useState } from 'react';
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, Check } from "lucide-react";

interface Option {
  key: string;
  label: string;
}

const options: Option[] = [
  { key: 'A', label: 'Sales' },
  { key: 'B', label: 'Marketing' },
  { key: 'C', label: 'Operations' },
  { key: 'D', label: 'Custom project/Enterprise' },
  { key: 'E', label: 'SEO Agent' },
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (selectedOption) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
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

  const handleOptionSelect = (key: string) => {
    setSelectedOption(key);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-lg font-medium text-primary mb-2">
            <span className="flex items-center">
              {currentStep}→
            </span>
            <h2>In which area do you want to implement AI?*</h2>
          </div>
        </div>

        <div className={cn("space-y-2", isAnimating ? "slide-up-exit" : "slide-up-enter")}>
          {options.map((option) => (
            <button
              key={option.key}
              onClick={() => handleOptionSelect(option.key)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg transition-colors duration-200",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                selectedOption === option.key
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-card text-card-foreground"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{option.key}</span>
                  <span>{option.label}</span>
                </div>
                {selectedOption === option.key && (
                  <Check className="h-4 w-4" />
                )}
              </div>
            </button>
          ))}
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
            disabled={!selectedOption}
            className={cn(
              "p-2 rounded-full transition-opacity duration-200",
              !selectedOption ? "opacity-50 cursor-not-allowed" : "hover:bg-accent"
            )}
          >
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;