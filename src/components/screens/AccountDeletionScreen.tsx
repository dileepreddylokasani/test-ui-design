import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, AlertTriangle, Trash2, Shield, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

interface AccountDeletionScreenProps {
  onBack: () => void;
  onConfirmDelete: () => void;
}

export function AccountDeletionScreen({ onBack, onConfirmDelete }: AccountDeletionScreenProps) {
  const [confirmationSteps, setConfirmationSteps] = useState({
    dataLoss: false,
    noRecovery: false,
    alternatives: false,
  });
  const [finalConfirmation, setFinalConfirmation] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const allStepsCompleted = Object.values(confirmationSteps).every(Boolean) && 
                           finalConfirmation.toLowerCase() === 'delete my account';

  const handleStepChange = (step: keyof typeof confirmationSteps, value: boolean) => {
    setConfirmationSteps(prev => ({ ...prev, [step]: value }));
  };

  const handleFinalDelete = async () => {
    if (!allStepsCompleted) return;
    
    setIsDeleting(true);
    
    // Simulate deletion process
    setTimeout(() => {
      setIsDeleting(false);
      onConfirmDelete();
    }, 3000);
  };

  const dataToDelete = [
    'Personal profile information',
    'Charging session history',
    'Payment methods and wallet balance',
    'Saved charging stations',
    'App preferences and settings',
    'Support conversations'
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-6 pt-12 border-b border-border bg-surface-card"
      >
        <Button variant="ghost" size="sm" onClick={onBack} disabled={isDeleting}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="text-center">
          <h1 className="font-semibold text-accent-red">Delete Account</h1>
          <p className="text-foreground-muted text-sm">Permanently remove your data</p>
        </div>
        <div className="w-16"></div>
      </motion.div>

      <div className="p-6">
        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-accent-red/20 border border-accent-red/30 rounded-xl p-4 mb-6"
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-accent-red flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-accent-red mb-2">This action cannot be undone</h3>
              <p className="text-accent-red/80 text-sm">
                Once you delete your account, all your data will be permanently removed from our servers. 
                This includes your charging history, saved stations, and wallet balance.
              </p>
            </div>
          </div>
        </motion.div>

        {/* What will be deleted */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-card border border-border rounded-xl p-6 mb-6"
        >
          <h3 className="font-semibold mb-4 flex items-center">
            <Trash2 className="w-5 h-5 mr-2 text-accent-red" />
            Data to be deleted
          </h3>
          
          <div className="space-y-3">
            {dataToDelete.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
                className="flex items-center space-x-3"
              >
                <div className="w-2 h-2 bg-accent-red rounded-full flex-shrink-0" />
                <span className="text-foreground-muted text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Alternatives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-surface-card border border-border rounded-xl p-6 mb-6"
        >
          <h3 className="font-semibold mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-primary" />
            Consider these alternatives
          </h3>
          
          <div className="space-y-4">
            <div className="p-3 bg-surface-elevated rounded-lg">
              <h4 className="font-medium text-foreground mb-1">Temporarily disable account</h4>
              <p className="text-foreground-muted text-sm">Hide your profile while keeping your data safe</p>
            </div>
            
            <div className="p-3 bg-surface-elevated rounded-lg">
              <h4 className="font-medium text-foreground mb-1">Clear charging history</h4>
              <p className="text-foreground-muted text-sm">Remove past sessions while keeping your account</p>
            </div>
            
            <div className="p-3 bg-surface-elevated rounded-lg">
              <h4 className="font-medium text-foreground mb-1">Contact support</h4>
              <p className="text-foreground-muted text-sm">Discuss specific privacy concerns with our team</p>
            </div>
          </div>
        </motion.div>

        {/* Confirmation Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-surface-card border border-border rounded-xl p-6 mb-6"
        >
          <h3 className="font-semibold mb-4">Confirmation Required</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={confirmationSteps.dataLoss}
                onCheckedChange={(checked) => handleStepChange('dataLoss', !!checked)}
                disabled={isDeleting}
                className="mt-1"
              />
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground cursor-pointer">
                  I understand that all my data will be permanently deleted
                </label>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={confirmationSteps.noRecovery}
                onCheckedChange={(checked) => handleStepChange('noRecovery', !!checked)}
                disabled={isDeleting}
                className="mt-1"
              />
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground cursor-pointer">
                  I understand this action cannot be undone or recovered
                </label>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={confirmationSteps.alternatives}
                onCheckedChange={(checked) => handleStepChange('alternatives', !!checked)}
                disabled={isDeleting}
                className="mt-1"
              />
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground cursor-pointer">
                  I have considered the alternative options above
                </label>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final Confirmation */}
        {Object.values(confirmationSteps).every(Boolean) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-card border border-border rounded-xl p-6 mb-6"
          >
            <h3 className="font-semibold mb-4">Final Confirmation</h3>
            <p className="text-foreground-muted text-sm mb-4">
              Type <strong>"DELETE MY ACCOUNT"</strong> to confirm deletion:
            </p>
            
            <input
              type="text"
              value={finalConfirmation}
              onChange={(e) => setFinalConfirmation(e.target.value)}
              placeholder="Type confirmation phrase"
              disabled={isDeleting}
              className="w-full h-12 px-4 bg-surface-elevated border border-border rounded-xl text-foreground placeholder-foreground-subtle focus:outline-none focus:border-accent-red transition-colors"
            />
          </motion.div>
        )}

        {/* Delete Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <Button
            onClick={handleFinalDelete}
            disabled={!allStepsCompleted || isDeleting}
            className="w-full h-14 bg-accent-red hover:bg-accent-red/90 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <motion.div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Deleting Account...</span>
              </motion.div>
            ) : (
              <>
                <Trash2 className="w-5 h-5 mr-2" />
                Delete My Account Permanently
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={onBack}
            disabled={isDeleting}
            className="w-full h-12"
          >
            Cancel - Keep My Account
          </Button>
        </motion.div>

        {/* Processing State */}
        {isDeleting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-accent-orange/20 border border-accent-orange/30 rounded-xl p-4"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-accent-orange border-t-transparent rounded-full"
              />
              <div>
                <p className="font-medium text-accent-orange">Processing deletion...</p>
                <p className="text-accent-orange/80 text-sm">This may take a few moments. Please don't close the app.</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}