import { clientmailTrap,sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./templets.js";

// export const sendevarificationmail = (email, varificationToken) => {
//     const recipients = [
//         {
//             email: email,
//         }
//     ];
//     try {
//       const response = clientmailTrap.send({
//            from: sender,
//             to: recipients,
//             subject: "Varification email",
//             html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", varificationToken),
//             category: "email Varification",
//       });
//         console.log("email send successfully",response);
//     } catch (error) {
//         console.log("🚀 ~ sendevarificationmail ~ error:", error)
        
//         throw new Error(`Error sending verification email: ${error}`);
//     }
//     }
export const sendevarificationmail = async (email, varificationToken) => {
    const recipients = [{ email: email }];
    try {
      const response = await clientmailTrap.send({
           from: sender,
           to: recipients,
           subject: "Verification email",
           html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", varificationToken),
           category: "email Verification",
      });
        console.log("Email sent successfully", response);
    } catch (error) {
        console.log("🚀 ~ sendevarificationmail ~ error:", error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};
