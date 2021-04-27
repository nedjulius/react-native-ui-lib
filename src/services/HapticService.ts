import {HapticFeedbackPackage} from '../optionalDependencies';

const options = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: false
};

export enum HapticType {
  selection = 'selection',
  impactLight = 'impactLight',
  impactMedium = 'impactMedium',
  impactHeavy = 'impactHeavy',
  notificationSuccess = 'notificationSuccess',
  notificationWarning = 'notificationWarning',
  notificationError = 'notificationError'
}

function triggerHaptic(hapticMethod: HapticType, componentName: string) {
  if (HapticFeedbackPackage) {
    HapticFeedbackPackage.trigger(hapticMethod, options);
  } else {
    console.error(`RNUILib ${componentName}'s requires installing "react-native-haptic-feedback" dependency`);
  }
}

export default {
  HapticType,
  triggerHaptic
};
