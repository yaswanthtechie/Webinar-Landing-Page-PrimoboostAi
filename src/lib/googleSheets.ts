import { GOOGLE_SCRIPT_URL } from '@/config/constants';

export interface FormData {
  fullName: string;
  collegeName: string;
  branch: string;
  yearOfGraduation: string;
  email: string;
  phoneNumber: string;
  agreePrivacy: boolean;
  timestamp: string;
  source: string;
}

// Test function to verify data structure
export const testFormData = (formData: FormData): void => {
  console.log('=== TESTING FORM DATA ===');
  console.log('Full data object:', formData);
  console.log('Individual fields:');
  console.log('- fullName:', formData.fullName, 'Type:', typeof formData.fullName);
  console.log('- collegeName:', formData.collegeName, 'Type:', typeof formData.collegeName);
  console.log('- branch:', formData.branch, 'Type:', typeof formData.branch);
  console.log('- yearOfGraduation:', formData.yearOfGraduation, 'Type:', typeof formData.yearOfGraduation);
  console.log('- email:', formData.email, 'Type:', typeof formData.email);
  console.log('- phoneNumber:', formData.phoneNumber, 'Type:', typeof formData.phoneNumber);
  console.log('- agreePrivacy:', formData.agreePrivacy, 'Type:', typeof formData.agreePrivacy);
  console.log('- timestamp:', formData.timestamp, 'Type:', typeof formData.timestamp);
  console.log('- source:', formData.source, 'Type:', typeof formData.source);
  console.log('=== END TEST ===');
};

// Test function to verify Google Apps Script accessibility
export const testGoogleScriptAccess = async (): Promise<void> => {
  try {
    console.log('=== TESTING GOOGLE SCRIPT ACCESS ===');
    console.log('URL:', GOOGLE_SCRIPT_URL);
    
    // Test 1: Simple GET request
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL);
      console.log('GET test response:', response.status, response.statusText);
      console.log('Response headers:', response.headers);
    } catch (error) {
      console.log('GET test failed:', error);
    }
    
    // Test 2: HEAD request
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, { method: 'HEAD' });
      console.log('HEAD test response:', response.status, response.statusText);
    } catch (error) {
      console.log('HEAD test failed:', error);
    }
    
    // Test 3: Simple POST with minimal data
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: 'test=hello',
      });
      console.log('Simple POST test completed (no-cors mode)');
    } catch (error) {
      console.log('Simple POST test failed:', error);
    }
    
    console.log('=== END TEST ===');
  } catch (error) {
    console.error('Test failed:', error);
  }
};

export const submitToGoogleSheets = async (formData: FormData): Promise<void> => {
  try {
    if (!GOOGLE_SCRIPT_URL) {
      throw new Error('Google Script URL not configured');
    }

    console.log('=== GOOGLE SHEETS SUBMISSION ===');
    console.log('URL:', GOOGLE_SCRIPT_URL);
    console.log('Data to submit:', formData);

    // Use no-cors mode since it's the only method that works with Google Apps Script
    // This avoids CORS policy issues
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // This is crucial for Google Apps Script
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(formData),
    });

    // With no-cors mode, we can't check response.ok, but the request completes
    console.log('Submission completed with no-cors mode');
    console.log('Response status:', response.status);
    console.log('Response type:', response.type);
    
    // Since no-cors mode doesn't give us detailed response info,
    // we'll assume success if no error was thrown
    console.log('Successfully submitted to Google Sheets');

  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    throw new Error('Failed to submit registration. Please try again.');
  }
};
