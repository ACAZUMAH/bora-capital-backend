import * as React from 'react';
import { render } from '@react-email/render';
import { EmailTemplate } from './send-otp-email';

export const getSendOtpEmailTemplate = async (otp: string, name?: string) => {
  return render(<EmailTemplate otp={otp} name={name} />);
};
