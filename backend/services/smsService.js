// services/smsService.js

// Example using Twilio (install twilio package first: npm install twilio)
// For demo, this is a stub that logs SMS instead of sending

module.exports = {
  sendSMS: async (phoneNumber, message) => {
    // In real app, integrate with SMS provider API here
    console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    // Simulate async delay
    return new Promise(resolve => setTimeout(resolve, 500));
  }
};