import envCaptured from "../config/envValidation.js";
import transporter from "../config/mailConfig.js";

export const sendEmail = async (to, subject, template, context) => {
  const mailOptions = {
    from: `Seerapu Nehemiah<${envCaptured.mailModule.mailAuthUser}>`,
    to,
    subject,
    template,
    context,
  };
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
