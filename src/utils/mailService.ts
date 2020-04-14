import * as nodemailer from "nodemailer";

export class MailService {
  private static transporter;

  private static getTransporter() {
    if (!MailService.transporter) {
      MailService.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "quickprep123@gmail.com",
          pass: "snakeboss123"
        }
      })
    }

    return MailService.transporter;
  }

  public static sendWelcomeMail(name: string, email: string, testId: string) {
    // setup email data with unicode symbols


    let mailOptions = {
      from: '"QuickPrep " <quickprep123@gmail.com>', // sender address
      to: `${email}`,  // list of receivers
      subject: 'Welcome to QuickPrep', // Subject line
      text: `Hello ${name},


Your test is booked with QuickPrep. Thanks for taking a test with us. 

Use the information below to resume the test if you don't want to take it right now. The test expires in 7 days.

The test code is: ${testId}. 
        
Thanks,
Quickpreps Team`
    };

    MailService.sendEmail(mailOptions);
  }

  private static sendEmail(mailOptions) {
    // send mail with defined transport object

    MailService.getTransporter().sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  }
}