const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user");
const UserVerificationModel = require("../models/userverify");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const axios = require('axios');

const ACCESS_URL = "http://localhost:5173";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (success) console.log("transporter connected");
  if (error) {
    console.log("Error occured at transporter : " + error);
  }
});

const generate_jwt = (profile_pic = "", name, email, randomSeed) => {
  const token = jwt.sign({ profile_pic, name, email, randomSeed }, "wnrikwebffhiu", {
    expiresIn: "1d",
    algorithm: "HS256",
  });
  return token;
};

const validate_user = async (req, res) => {
  const { token } = req.body;

  try {
    const validated = jwt.verify(token, "wnrikwebffhiu");
    if (validated) {
      res.json({ success: "user authenticated successfully", ...validated });
    } else {
      res.json({ error: "an error occured while authenticating user" });
    }
  } catch (err) {
    console.log("error while validating user : ", err);
    res.json({ error: "an error occured while authenticating user" });
  }
};

const sendVerificationEmail = async ({ _id, email }, res) => {
  const currentURL = "http://localhost:5000/";

  const uniqueString = uuidv4() + _id;
  console.log(uniqueString);

  const verificationURL =
    currentURL + "user/verify/" + _id + "/" + uniqueString;
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify Your Email for Flex-It-Out",
    html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <style type="text/css">
                @media screen {
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
        
                    *{
                        font-family: "Poppins",serif;
                    }
                    body,
                    table,
                    td,
                    a {
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }
        
                    table,
                    /* td {
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                    } */
        
                    img {
                        -ms-interpolation-mode: bicubic;
                    }
        
                    /* RESET STYLES */
                    img {
                        border: 0;
                        height: auto;
                        line-height: 100%;
                        outline: none;
                        text-decoration: none;
                    }
        
                    table {
                        border-collapse: collapse !important;
                    }
        
                    body {
                        height: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                    }
        
                    /* iOS BLUE LINKS */
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: none !important;
                        font-size: inherit !important;
                        font-family: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                    }
        
                    /* MOBILE STYLES */
                    @media screen and (max-width:600px) {
                        h1 {
                            font-size: 32px !important;
                            line-height: 32px !important;
                        }
                    }
        
                    /* ANDROID CENTER FIX */
                    div[style*="margin: 16px 0;"] {
                        margin: 0 !important;
                    }}
            </style>
        </head>
        
        <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important; height: 100vh;">
            </head> <!-- HIDDEN PREHEADER TEXT -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%"> <!-- LOGO -->
                <tr>
                    <td bgcolor="#fff" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#fff" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top"
                                    style="padding: 40px 20px 20px 20px; border-radius: 2px 2px 0px 0px; color: #fff; background-color:#0A033C ; font-family: 'Poppins', sans-serif;  font-size: 45px; font-weight: 700; letter-spacing: 2px; line-height: 48px;">
                                    <h1 style="font-size: 40px; font-weight:700; margin: w-50;">Flex-It-Out</h1>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#fff" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center"
                                    style="padding: 20px 30px 40px 30px; color: #000000; font-family: 'Poppins', sans-serif;  font-size: 16px; font-weight:600; line-height: 25px;">
                                    <p>Kindly verify your email to complete your account registration.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 30px;" bgcolor="#0A033C"><a
                                                                href="${verificationURL}" target="_blank"
                                                                style="font-size: 20px; font-family: 'Poppins', sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 10px 55px; border-radius: 2px; display: inline-block;">Verify Now
                                                                </a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="center"
                                    style="padding: 0px 30px 20px 30px; color: #000000; font-family:'Montserrat'Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">The link will be valid for the next 6 hours.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="center"
                                    style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #333333; font-family:'Montserrat'Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">
                                    <img src="https://img.icons8.com/ios-glyphs/30/000000/facebook-new.png" /> <img
                                        src="https://img.icons8.com/material-outlined/30/000000/instagram-new.png" /> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4"  align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#f4f4f4"  align="center"
                                    style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;">
                                    <br>
                                    <p style="margin: 10px;"><a href="#" target="_blank" style="color: #111111; font-weight: 700;"
                                            </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>`,
  };

  const saltRounds = 10;
  try {
    const hasheduniqueString = await bcrypt.hash(uniqueString, saltRounds);
    const newVerification = new UserVerificationModel({
      userId: _id,
      uniqueString: hasheduniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000,
    });
    await newVerification.save();
    await transporter.sendMail(mailOptions, (err, result) => {
      console.log(err, result);
    });
    res.send({ warning: "Check your email for verification" });
  } catch (error) {
    console.log("Error occured while sending email : " + error);
  }
};

const verify_user = async (req, res) => {
  let { userId, uniqueString } = req.params;

  console.log(req.params);

  UserVerificationModel.find({ userId })
    .then((result) => {
      // if there is really a verification email
      if (result.length > 0) {
        const { expiresAt } = result[0];
        const hasheduniqueString = result[0].uniqueString;

        //if link is expired then delete the verifying data
        if (expiresAt < Date.now()) {
          UserVerificationModel.deleteOne({ userId })
            .then((result) => {
              userModel.deleteOne({ _id: userId }).then(() => {
                res.redirect(ACCESS_URL + "/verified/expired");
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
        //user is legit
        else {
          bcrypt
            .compare(uniqueString, hasheduniqueString)
            .then((result) => {
              if (result) {
                //update user data to verified
                userModel
                  .updateOne({ _id: userId }, { verified: true })
                  .then(() => {
                    UserVerificationModel.deleteOne({ userId }).then(
                      res.redirect(ACCESS_URL + "/verified/success")
                    );
                  });
              } else {
                res.redirect(ACCESS_URL + "/verified/error");
              }
            })
            .catch((error) => {
              console.log("error occured while verifying user : " + error);
            });
        }
      } else {
        res.redirect(ACCESS_URL + "/verified/error");
      }
    })
    .catch((err) => {
      console.log("error ocurred while finding userverification data : " + err);
    });
};

const register_user = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

//   checking if user exists in database
  const userExists = await userModel.findOne({ email: email });

  if (userExists) {
    if (userExists.verified) {
      res.json({ warning: "user is already registered" });
      return;
    }else if(userExists.password === ""){
      res.json({ warning: "login with google" });
      return;
    } else {
      res.json({ warning: "check you email for verification" });
      return;
    }
  }

  //saving user
  try {
    const hashed_pass = await bcrypt.hash(password, 11);
    const time = new Date();

    const randomSeed = Math.floor(1000 + Math.random() * 9000);

    const user = new userModel({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashed_pass,
      registered_at: time,
      verified: false,
      randomSeed : randomSeed
    });

    await user.save().then((result) => {
      console.log(result);
      sendVerificationEmail(result, res);
    }).catch(err => console.log(err));
  } catch (err) {
    console.log(err);
    res.json({ error: "Internal server error" });
  }
};

const login_user = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email });

  try {
    if (user) {

      if(user.password === ""){
        res.json({ warning: "login with google" });
        return;
      }

      if (!user.verified) {
        res.json({ warning: "check you email for verification" });
        return;
      }

      const verifiedPass = await bcrypt.compare(password, user.password);

      if (verifiedPass) {
        const jwt_token = generate_jwt(user.firstname, email, user.randomSeed);

        const expireDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

        res.cookie("token", jwt_token, {
          expires: expireDate,
          httpOnly: false,
        });
        res.redirect("/")
      } else {
        res.json({ warning: "incorrect password." });
      }
    } else {
      console.log("not found");
      res.json({ warning: "user not found." });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: "Internal server error" });
  }
};

const google_login = async (req, res) => {
  try {
    const { code, scope } = req.query;
    const decodedScope = decodeURIComponent(scope);

    console.log('Token Request Payload:', {
      code,
      client_id: `${process.env.GOOGLE_CLIENT_ID}`,
      client_secret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      redirect_uri: `${process.env.API_BASE_URL}googlelogin`,
      grant_type: 'authorization_code',
    });
    console.log("Authorization code:", code);
    console.log("Requested scopes:", decodedScope);

    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: `${process.env.GOOGLE_CLIENT_ID}`,
      client_secret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      redirect_uri: `${process.env.API_BASE_URL}googlelogin`,
      grant_type: 'authorization_code',
    }).catch((err) => {
      console.log("error while getting access token : ", err);
    });

    const { access_token, id_token } = tokenResponse.data;
    console.log("Tokens received:", { access_token, id_token });

    // Get user information using the access token
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).catch((err) => {
      console.log("error while getting user info : ", err);
    });

    const userInfo = userInfoResponse.data;

    const user = await userModel.findOne({ email: userInfo.email });

    if(!user){
      const time = new Date();

      const randomSeed = Math.floor(1000 + Math.random() * 9000);
  
      const user = new userModel({
        profile_pic: userInfo.picture,
        firstname: userInfo.given_name,
        lastname: userInfo.family_name,
        email: userInfo.email,
        password: "",
        registered_at: time,
        verified: true,
        randomSeed : randomSeed
      });
  
      await user.save();
    }

    const jwt_token = generate_jwt(userInfo.picture , userInfo.given_name, userInfo.email, user.randomSeed);

    const expireDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    res.cookie("token", jwt_token, {
      expires: expireDate,
      httpOnly: false,
    });

    res.redirect(`${ACCESS_URL}`);

  } catch (err) {
    console.log("Error during Google OAuth:", err);
    res.redirect(`${ACCESS_URL}?login=failed`);
  }
};

module.exports = { register_user, login_user, validate_user, verify_user, google_login };