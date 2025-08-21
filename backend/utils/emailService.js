// File: backend/utils/emailService.js
const nodemailer = require('nodemailer');

// Create email transporter (configure based on your email provider)
const createTransporter = () => {
  // Option 1: Gmail (recommended for development)
  if (process.env.EMAIL_PROVIDER === 'gmail') {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD // Use App Password, not regular password
      }
    });
  }
  
  // Option 2: Custom SMTP (for production)
  if (process.env.EMAIL_PROVIDER === 'smtp') {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }
  
  // Option 3: Development mode (logs emails to console)
  return nodemailer.createTransporter({
    streamTransport: true,
    newline: 'unix',
    buffer: true
  });
};

// Send confirmation email to nominator
const sendConfirmationEmail = async ({
  to,
  nomineeFirstName,
  nomineeLastName,
  submissionId,
  category
}) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'awards@teendomafrica.org',
      to: to,
      subject: '✅ Teendom Awards 2025 - Nomination Submitted Successfully',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #dc2626; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">🏆 Teendom Awards 2025</h1>
            <p style="margin: 10px 0 0 0;">Nomination Confirmation</p>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #dc2626;">Thank you for your nomination!</h2>
            
            <p>We have successfully received your nomination for:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Nominee:</strong> ${nomineeFirstName} ${nomineeLastName}</p>
              <p><strong>Category:</strong> ${category}</p>
              <p><strong>Submission ID:</strong> ${submissionId}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <h3 style="color: #dc2626;">What happens next?</h3>
            <ol style="line-height: 1.6;">
              <li><strong>Admin Review (3-5 business days):</strong> Our team will review your nomination for completeness and eligibility</li>
              <li><strong>Notification:</strong> You'll receive an email update about your nomination status</li>
              <li><strong>Judging Phase (October 5 - November 5):</strong> If approved, your nomination will be forwarded to expert judges</li>
              <li><strong>Public Voting (November 8-21):</strong> Top 3 finalists from each category will be announced for public voting</li>
              <li><strong>Awards Ceremony (December 6):</strong> Winners will be crowned at our celebration event</li>
            </ol>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>💡 Keep this email!</strong> You can use your Submission ID to check your nomination status anytime.</p>
            </div>
            
            <p>If you have any questions, please contact us:</p>
            <ul style="line-height: 1.6;">
              <li>Email: <a href="mailto:awards@teendomafrica.org">awards@teendomafrica.org</a></li>
              <li>WhatsApp: <a href="https://wa.me/254742862080">0742 862 080</a></li>
              <li>Website: <a href="https://teendomafrica.org/awards">teendomafrica.org/awards</a></li>
            </ul>
          </div>
          
          <div style="background: #374151; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0;">Celebrating outstanding teenagers across Kenya</p>
            <p style="margin: 5px 0 0 0;">© 2025 Teendom Africa</p>
          </div>
        </div>
      `,
      text: `
        TEENDOM AWARDS 2025 - NOMINATION CONFIRMATION
        
        Thank you for your nomination!
        
        Nominee: ${nomineeFirstName} ${nomineeLastName}
        Category: ${category}
        Submission ID: ${submissionId}
        Submitted: ${new Date().toLocaleDateString()}
        
        WHAT HAPPENS NEXT:
        1. Admin Review (3-5 business days)
        2. Email notification of status
        3. Judging Phase (October 5 - November 5)
        4. Public Voting (November 8-21)
        5. Awards Ceremony (December 6)
        
        Keep this email! Use your Submission ID to check status anytime.
        
        Contact us:
        Email: awards@teendomafrica.org
        WhatsApp: 0742 862 080
        Website: teendomafrica.org/awards
        
        © 2025 Teendom Africa
      `
    };
    
    // Send email
    if (process.env.NODE_ENV === 'development' && !process.env.EMAIL_PROVIDER) {
      // In development without email config, just log
      console.log('📧 CONFIRMATION EMAIL (Development Mode):');
      console.log(`To: ${to}`);
      console.log(`Subject: ${mailOptions.subject}`);
      console.log(`Submission ID: ${submissionId}`);
      console.log('Email would be sent in production with proper email configuration.');
    } else {
      const result = await transporter.sendMail(mailOptions);
      console.log(`✅ Confirmation email sent to ${to} for submission ${submissionId}`);
      return result;
    }
    
  } catch (error) {
    console.error('❌ Failed to send confirmation email:', error);
    throw error;
  }
};

// Send status update email (for admin actions)
const sendStatusUpdateEmail = async ({
  to,
  nomineeFirstName,
  nomineeLastName,
  submissionId,
  status,
  notes
}) => {
  try {
    const transporter = createTransporter();
    
    const getStatusMessage = (status) => {
      switch (status) {
        case 'approved':
          return {
            title: '🎉 Nomination Approved!',
            message: 'Great news! Your nomination has been approved and forwarded to our judges.',
            color: '#059669'
          };
        case 'rejected':
          return {
            title: '📋 Nomination Needs Review',
            message: 'Your nomination requires some additional information or corrections.',
            color: '#dc2626'
          };
        case 'needs-info':
          return {
            title: '📝 Additional Information Needed',
            message: 'We need some additional information to complete your nomination review.',
            color: '#d97706'
          };
        default:
          return {
            title: '📌 Nomination Status Update',
            message: 'There has been an update to your nomination status.',
            color: '#6b7280'
          };
      }
    };
    
    const statusInfo = getStatusMessage(status);
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'awards@teendomafrica.org',
      to: to,
      subject: `${statusInfo.title} - Teendom Awards 2025`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: ${statusInfo.color}; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">🏆 Teendom Awards 2025</h1>
            <p style="margin: 10px 0 0 0;">Nomination Status Update</p>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: ${statusInfo.color};">${statusInfo.title}</h2>
            
            <p>${statusInfo.message}</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Nominee:</strong> ${nomineeFirstName} ${nomineeLastName}</p>
              <p><strong>Submission ID:</strong> ${submissionId}</p>
              <p><strong>Status:</strong> ${status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}</p>
              <p><strong>Updated:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            ${notes ? `
              <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin: 0 0 10px 0; color: #92400e;">Additional Notes:</h4>
                <p style="margin: 0;">${notes}</p>
              </div>
            ` : ''}
            
            <p>If you have any questions about this update, please contact us:</p>
            <ul style="line-height: 1.6;">
              <li>Email: <a href="mailto:awards@teendomafrica.org">awards@teendomafrica.org</a></li>
              <li>WhatsApp: <a href="https://wa.me/254742862080">0742 862 080</a></li>
            </ul>
          </div>
          
          <div style="background: #374151; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0;">© 2025 Teendom Africa</p>
          </div>
        </div>
      `
    };
    
    // Send email
    if (process.env.NODE_ENV === 'development' && !process.env.EMAIL_PROVIDER) {
      console.log('📧 STATUS UPDATE EMAIL (Development Mode):');
      console.log(`To: ${to}`);
      console.log(`Status: ${status}`);
      console.log(`Submission ID: ${submissionId}`);
    } else {
      const result = await transporter.sendMail(mailOptions);
      console.log(`✅ Status update email sent to ${to} for submission ${submissionId}`);
      return result;
    }
    
  } catch (error) {
    console.error('❌ Failed to send status update email:', error);
    throw error;
  }
};

// Test email configuration
const testEmailConnection = async () => {
  try {
    const transporter = createTransporter();
    
    if (process.env.NODE_ENV === 'development' && !process.env.EMAIL_PROVIDER) {
      console.log('📧 Email service running in development mode (console logging)');
      return true;
    }
    
    await transporter.verify();
    console.log('✅ Email service connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Email service connection failed:', error);
    return false;
  }
};

module.exports = {
  sendConfirmationEmail,
  sendStatusUpdateEmail,
  testEmailConnection
};