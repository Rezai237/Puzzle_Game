import React from 'react';
import { X, ArrowRight, Gift, Trophy } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function TutorialModal({ isOpen, onClose }: Props) {
  const [step, setStep] = React.useState(0);

  const steps = [
    {
      title: 'How to Play',
      description: 'Slide the tiles into the correct order, from 1 to 15, with the empty space at the end.',
      icon: <Trophy className="w-12 h-12 text-blue-600" />,
    },
    {
      title: 'Earn Tokens',
      description: 'Complete puzzles faster to earn bonus tokens. The harder the difficulty, the more tokens you earn!',
      icon: <Gift className="w-12 h-12 text-green-600" />,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <div className="flex justify-center mb-6">
            {steps[step].icon}
          </div>

          <h3 className="text-xl font-bold text-center mb-2">
            {steps[step].title}
          </h3>
          
          <p className="text-gray-600 text-center mb-6">
            {steps[step].description}
          </p>

          <div className="flex justify-between">
            <div className="flex space-x-1">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === step ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center space-x-2 text-blue-600 font-medium"
              >
                <span>Next</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                Start Playing
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}