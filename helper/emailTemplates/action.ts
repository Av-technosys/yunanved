"use server";
import fs from 'fs';
import path from 'path';
import nodemailer from "nodemailer";

async function injectTemplate(html: string, data: any) {
  return html.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || '');
}
export async function getDeliveryDate() {
  const date = new Date();
  date.setDate(date.getDate() + 7);

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export async function getWelcomeTemplate(name:string) {
  const filePath = path.join(process.cwd(), 'email-templates', 'welcome.html');
  const html = fs.readFileSync(filePath, 'utf-8');
  return html.replace('{{name}}', name);
}

export async function getOrderTemplate(data: {
  orderId: string;
  customerName: string;
  amount: string;
  email: string;
  baseUrl: string;
  paymentMethod: string;
}) {
  const filePath = path.join(process.cwd(), 'email-templates', 'order.html');
  const html = fs.readFileSync(filePath, 'utf-8');

  return injectTemplate(html, {
    ...data,
    deliveryDate: getDeliveryDate(),
  });
}

// Ravindra's code for email templates:-

export async function sendWelcomeEmail(name: string, email: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Welcome to Yunanved - Your Account is Ready!",
      html: `
       <body
    style="
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif;
    "
  >
    <center>
      <!-- Header -->
      <div
        style="
          background-color: #f8f9fa;
          border-bottom: 1px solid #eeeeee;
          padding: 15px 0;
          text-align: center;
          width: 100%;
        "
      >
        <span
          style="
            font-size: 18px;
            color: #0b1320;
            font-weight: 700;
            letter-spacing: 0.5px;
          "
        >
          Success
        </span>
      </div>

      <!-- Container -->
      <div
        class="container"
        style="
          max-width: 500px;
          background-color: #ffffff;
          text-align: center;
          margin: auto;
        "
      >
        <div style="padding: 40px 20px">
          <!-- Icon -->
          <div
            style="
              width: 90px;
              height: 90px;
              background-color: #f6efe0;
              border-radius: 50%;
              margin: 0 auto 20px auto;
              line-height: 90px;
            "
          >
            <img
              src="https://ik.imagekit.io/avtechnosys/yunanved/welcome1.png"
              width="36"
              style="vertical-align: middle"
            />
          </div>

          <h1
            style="
              font-size: 32px;
              color: #0b1320;
              margin: 0 0 20px 0;
              font-weight: 700;
            "
          >
            Welcome to Yunanved
          </h1>

          <p
            style="
              font-size: 16px;
              color: #5a6a85;
              line-height: 1.6;
              margin: 0 0 40px 0;
            "
          >
            Hi <span style="color: #d4a017; font-weight: bold">${name}</span>, your
            account has been successfully created. Your journey starts here!
          </p>

          <!-- Start Shopping Button -->
          <div style="margin-bottom: 15px">
            <a
              href="#"
              style="
                display: block;
                background-color: #d7b36a;
                color: #ffffff;
                padding: 18px;
                text-decoration: none;
                border-radius: 40px;
                font-weight: bold;
                font-size: 18px;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/welcome2.png"
                width="20"
                style="vertical-align: middle; margin-right: 10px"
              />

              Start Shopping
            </a>
          </div>

          <!-- Explore Categories -->
          <div style="margin-bottom: 40px">
            <a
              href="#"
              style="
                display: block;
                border: 1px solid #d7b36a;
                color: #d7b36a;
                padding: 18px;
                text-decoration: none;
                border-radius: 40px;
                font-weight: bold;
                font-size: 18px;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/welcome3.png"
                width="18"
                style="vertical-align: middle; margin-right: 10px"
              />

              Explore Categories
            </a>
          </div>

          <p
            style="
              font-size: 13px;
              color: #7f8c8d;
              line-height: 1.5;
              margin: 0;
              padding: 0 20px;
            "
          >
            If you have any questions, feel free to reach us at<br />

            <a
              href="mailto:support@yunanved.com"
              style="color: #d4a017; text-decoration: none; font-weight: bold"
            >
              support@yunanved.com
            </a>
          </p>
        </div>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendResetPasswordEmail(email: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Yunanved - Password Reset Request",
      html: `
       <body
    style="
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif;
    "
  >
    <center>
      <!-- Header -->
      <div
        style="
          background-color: #f7f9f9;
          border-bottom: 1px solid #eeeeee;
          padding: 15px 0;
          text-align: center;
          width: 100%;
        "
      >
        <span
          style="
            font-size: 18px;
            color: #0b1320;
            font-weight: 700;
            letter-spacing: 0.5px;
          "
        >
          Security Center
        </span>
      </div>

      <!-- Container -->
      <div
        class="container"
        style="
          max-width: 500px;
          background-color: #ffffff;
          text-align: center;
          margin: auto;
        "
      >
        <div style="padding: 40px 20px">
          <!-- Icon -->
          <div style="margin-bottom: 30px">
            <div
              style="
                display: inline-block;
                width: 100px;
                height: 100px;
                background-color: #f6efe0;
                border-radius: 50%;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/resetIcon1.png"
                alt="Reset Password"
                width="50"
                style="margin-top: 25px"
              />
            </div>
          </div>

          <h1
            style="
              font-size: 32px;
              color: #0b1320;
              margin: 0 0 15px 0;
              font-weight: 700;
            "
          >
            Reset Your Password
          </h1>

          <p
            style="
              font-size: 15px;
              color: #5a6a85;
              line-height: 1.6;
              margin: 0 0 35px 0;
            "
          >
            We received a request to reset your password for your Yunanved
            account. Please enter your new credentials below.
          </p>

          <div style="text-align: left; margin-bottom: 30px">
            <label
              style="
                display: block;
                font-size: 14px;
                font-weight: 600;
                color: #0b1320;
                margin-bottom: 8px;
              "
            >
              New Password
            </label>

            <div
              style="
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 12px 16px;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/resetIcon2.png"
                width="18"
                style="margin-right: 12px; opacity: 0.6"
              />

              <input
                placeholder="Enter New Password"
                style="
                  color: #0b1320;
                  letter-spacing: 2px;
                  outline: none;
                  border: none;
                  width: 100%;
                "
              />

              <div style="margin-left: auto">
                <img
                  src="https://ik.imagekit.io/avtechnosys/yunanved/resetIcon3.png"
                  width="18"
                  style="opacity: 0.6"
                />
              </div>
            </div>

            <label
              style="
                display: block;
                font-size: 14px;
                font-weight: 600;
                color: #0b1320;
                margin-bottom: 8px;
              "
            >
              Confirm New Password
            </label>

            <div
              style="
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 12px 16px;
                margin-bottom: 25px;
                display: flex;
                align-items: center;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/resetIcon4.png"
                width="18"
                style="margin-right: 12px; opacity: 0.6"
              />

              <input
                placeholder="Enter Confirm Password"
                style="
                  color: #0b1320;
                  letter-spacing: 2px;
                  outline: none;
                  border: none;
                  width: 100%;
                "
              />

              <div style="margin-left: auto">
                <img
                  src="https://ik.imagekit.io/avtechnosys/yunanved/resetIcon3.png"
                  width="18"
                  style="opacity: 0.6"
                />
              </div>
            </div>
          </div>

          <!-- Button -->
          <div style="margin-bottom: 25px">
            <a
              href="#"
              style="
                display: block;
                background-color: #d7b36a;
                color: #ffffff;
                padding: 18px;
                text-decoration: none;
                border-radius: 40px;
                font-weight: bold;
                font-size: 18px;
              "
            >
              Reset Password
            </a>
          </div>

          <p style="font-size: 13px; color: #7f8c8d; margin: 0">
            Didn't request this?<br />

            <a
              href="mailto:support@yunanved.com"
              style="color: #d4a017; text-decoration: none; font-weight: bold"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}


export async function sendOrderConfirmationEmail(email: string, orderId: any, orderDate: string, orderTime: string, paymentMethod: string, deliveryEstimate: string, amount: string, deliveryAddress: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Yunanved - Your Order Confirmation",
      html: `
       <body
    style="
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif;
    "
  >
    <center>
      <!-- Header -->
      <div
        style="
          background-color: #f7f9f9;
          border-bottom: 1px solid #eeeeee;
          padding: 15px 0;
          text-align: center;
          width: 100%;
        "
      >
        <span
          style="
            font-size: 18px;
            color: #0b1320;
            font-weight: 700;
            letter-spacing: 0.5px;
          "
        >
          Order Confirmation
        </span>
      </div>

      <!-- Container -->
      <div
        class="container"
        style="
          max-width: 500px;
          background-color: #ffffff;
          text-align: center;
          margin: auto;
        "
      >
        <div style="padding: 20px">
          <!-- Gradient Card -->
          <div
            style="
              background: linear-gradient(135deg, #d7b36a 0%, #ffe1a3 100%);
              border-radius: 12px;
              color: #ffffff;
              margin-bottom: 30px;
              padding: 40px 20px;
              text-align: center;
            "
          >
            <div
              style="
                width: 90px;
                height: 90px;
                background-color: rgba(255, 255, 255, 0.25);
                border-radius: 50%;
                margin: 0 auto 20px auto;
                line-height: 90px;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/orderconfirmicon1.png"
                width="36"
                style="vertical-align: middle"
              />
            </div>

            <h1
              style="
                font-size: 28px;
                margin: 0 0 10px 0;
                font-weight: 700;
                color: #ffffff;
              "
            >
              Thank You for Your Order!
            </h1>

            <p
              style="
                font-size: 14px;
                margin: 0;
                opacity: 0.9;
                line-height: 1.5;
                color: #ffffff;
              "
            >
              Your grocery and essentials are on the way to your doorstep.
            </p>
          </div>

          <!-- Order Info -->
          <div
            style="
              border: 1px solid #f0f4f8;
              border-radius: 12px;
              padding: 24px;
              text-align: left;
              margin-bottom: 20px;
            "
          >
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <div>
                <span
                  style="font-size: 12px; color: #9aa4af; font-weight: bold"
                >
                  ORDER NUMBER
                </span>

                <h3 style="font-size: 22px; color: #0b1320; margin: 4px 0">
                  ${orderId}
                </h3>
              </div>

              <span
                style="
                  background-color: #fcf6e5;
                  color: #d4a017;
                  padding: 6px 12px;
                  border-radius: 20px;
                  font-size: 11px;
                  font-weight: 700;
                "
              >
                Confirmed
              </span>
            </div>

            <hr
              style="border: 0; border-top: 1px solid #f1f4f9; margin: 20px 0"
            />

            <!-- Order Date -->
            <div style="display: flex; gap: 10px; margin-bottom: 20px">
              <div
                style="
                  background-color: #f6efe0;
                  border-radius: 8px;
                  width: 34px;
                  height: 34px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <img
                  src="https://ik.imagekit.io/avtechnosys/yunanved/orderConfirmicon7.png"
                  width="18"
                />
              </div>

              <div>
                <p style="margin: 0; font-size: 12px; color: #9aa4af">
                  Order Date
                </p>

                <p
                  style="
                    margin: 0;
                    font-size: 15px;
                    color: #0b1320;
                    font-weight: 600;
                  "
                >
                  ${orderDate} • ${orderTime}
                </p>
              </div>
            </div>

            <!-- Payment Method -->
            <div style="display: flex; gap: 10px; margin-bottom: 20px">
              <div
                style="
                  background-color: #f6efe0;
                  border-radius: 8px;
                  width: 34px;
                  height: 34px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <img
                  src="https://ik.imagekit.io/avtechnosys/yunanved/orderConfirmicon6.png"
                  width="18"
                />
              </div>

              <div>
                <p style="margin: 0; font-size: 12px; color: #9aa4af">
                  Payment Method
                </p>

                <p
                  style="
                    margin: 0;
                    font-size: 15px;
                    color: #0b1320;
                    font-weight: 600;
                  "
                >
                  ${paymentMethod}
                </p>
              </div>
            </div>

            <!-- Delivery -->
            <div style="display: flex; gap: 10px">
              <div
                style="
                  background-color: #f6efe0;
                  border-radius: 8px;
                  width: 34px;
                  height: 34px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <img
                  src="https://ik.imagekit.io/avtechnosys/yunanved/orderConfirmicon5.png"
                  width="18"
                />
              </div>

              <div>
                <p style="margin: 0; font-size: 12px; color: #9aa4af">
                  Estimated Delivery
                </p>

                <p
                  style="
                    margin: 0;
                    font-size: 15px;
                    color: #d4a017;
                    font-weight: 600;
                  "
                >
                  ${deliveryEstimate}
                </p>
              </div>
            </div>

            <hr
              style="border: 0; border-top: 1px solid #f1f4f9; margin: 20px 0"
            />

            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <div style="font-size: 18px; color: #5a6a85">Total Amount</div>

              <div style="font-size: 26px; color: #0b1320; font-weight: 700">
                ${amount}
              </div>
            </div>
          </div>

          <!-- Address -->
          <div style="text-align: left; margin-bottom: 30px">
            <h4
              style="
                font-size: 16px;
                color: #0b1320;
                margin: 0 0 12px 0;
                font-weight: 700;
              "
            >
              Delivery Address
            </h4>

            <div
              style="
                border: 1px solid #f0f4f8;
                border-radius: 12px;
                padding: 16px;
                display: flex;
                gap: 10px;
              "
            >
              <div
                style="
                  background-color: #f7f0e1;
                  border-radius: 12px;
                  width: 40px;
                  height: 40px;
                  text-align: center;
                "
              >
                <img
                  src="https://ik.imagekit.io/avtechnosys/yunanved/location-yellow.png"
                  width="15"
                  style="margin-top: 10px ; color: #d7b36a;"
                />
              </div>

              <div>
                <p
                  style="
                    margin: 0;
                    font-size: 16px;
                    color: #0b1320;
                    font-weight: 700;
                  "
                >
                  Home
                </p>

                <p
                  style="
                    margin: 4px 0 0 0;
                    font-size: 13px;
                    color: #5a6a85;
                    line-height: 1.4;
                  "
                >
                  ${deliveryAddress}
                </p>
              </div>
            </div>
          </div>

          <!-- Buttons -->

          <div style="margin-bottom: 15px">
            <a
              href="#"
              style="
                display: block;
                background-color: #d7b36a;
                color: #ffffff;
                padding: 18px;
                text-decoration: none;
                border-radius: 40px;
                font-weight: bold;
                font-size: 17px;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/orderConfirmicon3.png"
                width="16"
                style="vertical-align: middle; margin-right: 8px"
              />

              Track Order
            </a>
          </div>

          <div style="margin-bottom: 40px">
            <a
              href="#"
              style="
                display: block;
                border: 1px solid #d7b36a;
                color: #d7b36a;
                background-color: #ffffff;
                padding: 18px;
                text-decoration: none;
                border-radius: 40px;
                font-weight: bold;
                font-size: 17px;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/orderConfirmicon2.png"
                width="18"
                style="vertical-align: middle; margin-right: 8px"
              />

              Continue Shopping
            </a>
          </div>

          <p
            style="font-size: 12px; color: #9aa4af; line-height: 1.5; margin: 0"
          >
            If you have any questions, feel free to reach us at<br />

            <a
              href="mailto:support@yunanved.com"
              style="color: #d4a017; text-decoration: none; font-weight:bold"
            >
              support@yunanved.com
            </a>
          </p>
        </div>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendOrderCancellationEmail(email:string, orderId:string) {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Yunanved - Your Order Cancellation Status",
      html: `
        <body
    style="
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif;
    "
  >
    <center>
      <div
        style="
          background-color: #f7f9f9;
          border-bottom: 1px solid #eeeeee;
          padding: 15px 0;
          text-align: center;
          width: 100%;
        "
      >
        <span
          style="
            font-size: 18px;
            color: #0b1320;
            font-weight: 700;
            letter-spacing: 0.5px;
          "
        >
          Cancellation Status
        </span>
      </div>

      <div
        class="container"
        style="
          max-width: 500px;
          margin: auto;
          background-color: #ffffff;
          text-align: center;
        "
      >
        <div style="padding: 40px 20px">
          <div style="margin-bottom: 30px">
            <div
              style="
                display: inline-block;
                width: 100px;
                height: 100px;
                background-color: #f7f0e1;
                border-radius: 50%;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/orderCancelIcon1.png"
                alt="Order Cancelled"
                width="50"
                style="margin-top: 25px"
              />
            </div>
          </div>

          <h1
            style="
              font-size: 32px;
              color: #0b1320;
              margin: 0 0 5px 0;
              font-weight: 700;
            "
          >
            Order Cancelled
          </h1>

          <p
            style="
              font-size: 16px;
              color: #d4a017;
              font-weight: bold;
              margin: 0 0 15px 0;
            "
          >
            Order ID: ${orderId}
          </p>

          <p
            style="
              font-size: 15px;
              color: #5a6a85;
              line-height: 1.6;
              margin: 0 0 30px 0;
            "
          >
            Your order has been cancelled as per your request. We hope to see
            you back soon!
          </p>

          <div style="margin-bottom: 30px">
            <img
              src="https://ik.imagekit.io/avtechnosys/yunanved/asset2.png"
              alt="Cancelled"
              width="100%"
              style="border-radius: 12px; display: block; height: 360px"
            />
          </div>

          <div
            style="
              background-color: #f7f0e1;
              border-radius: 12px;
              padding: 25px;
              margin-bottom: 30px;
              text-align: left;
              display: flex;
              gap: 10px;
              align-items: flex-start;
            "
          >
            <div style="width: 30px">
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/orderCancelIcon2.png"
                width="20"
                style="margin-top: 2px"
              />
            </div>

            <div>
              <p
                style="
                  margin: 0 0 8px 0;
                  font-size: 16px;
                  font-weight: 700;
                  color: #d7b36a;
                "
              >
                Refund Information
              </p>

              <p
                style="
                  margin: 0;
                  font-size: 14px;
                  color: #5a6a85;
                  line-height: 1.5;
                "
              >
                If payment was made, the refund will be processed back to your
                original payment method within
                <b>5–7 business days</b>.
              </p>
            </div>
          </div>

          <div style="margin-bottom: 15px">
            <a
              href="#"
              style="
                display: block;
                background-color: #d7b36a;
                color: #ffffff;
                padding: 18px;
                text-decoration: none;
                border-radius: 40px;
                font-weight: 700;
                font-size: 17px;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/orderCancelIcon3.png"
                width="18"
                style="vertical-align: middle; margin-right: 8px"
              />

              Continue Shopping
            </a>
          </div>

          <div style="margin-bottom: 40px">
            <a
              href="#"
              style="
                display: block;
                border: 1px solid #d7b36a;
                color: #d7b36a;
                padding: 18px;
                text-decoration: none;
                border-radius: 40px;
                font-weight: 700;
                font-size: 17px;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/orderCancelIcon4.png"
                width="18"
                style="vertical-align: middle; margin-right: 8px"
              />

              Contact Support
            </a>
          </div>

          <p
            style="font-size: 12px; color: #9aa4af; line-height: 1.5; margin: 0"
          >
            If you have any questions, feel free to reach us at<br />

            <a
              href="mailto:support@yunanved.com"
              style="color: #d4a017; text-decoration: none; font-weight:bold"
            >
              support@yunanved.com
            </a>
          </p>
        </div>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendOrderShippedEmail(email:string, orderId:string, courierPartner:string, trackingId:string) {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Yunanved - Your Order is Shipped",
      html: `
         <body
    style="
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif;
    "
  >
    <center>
      <!-- Header -->
      <div
        style="
          background-color: #f7f9f9;
          border-bottom: 1px solid #eeeeee;
          padding: 15px 0;
          text-align: center;
          width: 100%;
        "
      >
        <span
          style="
            font-size: 18px;
            color: #0b1320;
            font-weight: 700;
            letter-spacing: 0.5px;
          "
        >
          Order Shipped
        </span>
      </div>

      <!-- Container -->
      <div
        class="container"
        style="
          max-width: 500px;
          background-color: #ffffff;
          text-align: center;
          margin: auto;
        "
      >
        <div style="padding: 40px 20px">
          <div
            style="
              width: 90px;
              height: 90px;
              background-color: #f6efe0;
              border-radius: 50%;
              margin: 0 auto 20px auto;
              line-height: 90px;
            "
          >
            <img
              src="https://ik.imagekit.io/avtechnosys/yunanved/orderShippedIcon4.png"
              width="36"
              style="vertical-align: middle"
            />
          </div>

          <h1
            style="
              font-size: 32px;
              color: #0b1320;
              margin: 0 0 10px 0;
              font-weight: 700;
              line-height: 1.2;
            "
          >
            Your Order is On the Way!
          </h1>

          <p
            style="
              font-size: 15px;
              color: #5a6a85;
              line-height: 1.6;
              margin: 0 0 35px 0;
            "
          >
            Great news! Your Yunanved package has been handed over to our
            delivery partner.
          </p>

          <!-- Shipping Details Card -->
          <div
            style="
              border: 1px solid #eef2f6;
              border-radius: 12px;
              padding: 30px 24px;
              margin-bottom: 35px;
              text-align: left;
            "
          >
            <div
              style="
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                gap: 10px;
              "
            >
              <div
                style="
                  background-color: #f6efe0;
                  border-radius: 8px;
                  width: 32px;
                  height: 32px;
                  text-align: center;
                "
              >
                <img
                  src="https://ik.imagekit.io/avtechnosys/yunanved/orderShippedIcon3.png"
                  width="18"
                  style="margin-top: 7px"
                />
              </div>

              <h3
                style="
                  font-size: 18px;
                  color: #0b1320;
                  margin: 0;
                  font-weight: 700;
                "
              >
                Shipping Details
              </h3>
            </div>

            <div style="font-size: 15px">
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  height: 40px;
                  align-items: center;
                "
              >
                <div style="color: #5a6a85">Order ID</div>

                <div style="color: #0b1320; font-weight: 700"> ${orderId}</div>
              </div>

              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  height: 40px;
                  align-items: center;
                "
              >
                <div style="color: #5a6a85">Courier Partner</div>

                <div style="color: #0b1320; font-weight: 700"> ${courierPartner}</div>
              </div>

              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  height: 40px;
                  align-items: center;
                "
              >
                <div style="color: #5a6a85">Tracking ID</div>

                <div style="color: #0b1320; font-weight: 700">
                  
                  <img
                  src="https://ik.imagekit.io/avtechnosys/yunanved/orderShippedIcon2.png"
                  width="14"
                  style="
                      vertical-align: middle;
                      margin-left: 5px;
                      opacity: 0.5;
                      "
                  />
                      ${trackingId}
                  
                </div>
              </div>
            </div>
          </div>

          <!-- Track Shipment Button -->
          <div style="margin-bottom: 40px">
            <a
              href="#"
              style="
                display: block;
                background-color: #d7b36a;
                color: #ffffff;
                padding: 18px;
                text-decoration: none;
                border-radius: 40px;
                font-weight: bold;
                font-size: 17px;
                text-align: center;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/orderShippedIcon1.png"
                width="16"
                style="vertical-align: middle; margin-right: 8px"
              />

              Track Your Shipment
            </a>
          </div>

          <p
            style="font-size: 13px; color: #9aa4af; line-height: 1.5; margin: 0"
          >
            If you have any questions, feel free to reach us at<br />

            <a
              href="mailto:support@yunanved.com"
              style="color: #d4a017; text-decoration: none; font-weight: bold"
            >
              support@yunanved.com
            </a>
          </p>
        </div>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendOrderStatusEmail(email:string,orderId:string) {
   try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Yunanved - Your Order Has Been Delivered",
      html: `
       <body
    style="
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif;
    "
  >
    <center>
      <!-- Header -->
      <div
        style="
          background-color: #f7f9f9;
          border-bottom: 1px solid #eeeeee;
          padding: 15px 0;
          text-align: center;
          width: 100%;
        "
      >
        <span
          style="
            font-size: 18px;
            color: #0b1320;
            font-weight: 700;
            letter-spacing: 0.5px;
          "
        >
          Order Status
        </span>
      </div>

      <!-- Container -->
      <div
        class="container"
        style="
          max-width: 500px;
          background-color: #ffffff;
          text-align: center;
          margin: auto;
        "
      >
        <div style="padding: 40px 20px">
          <div
            style="
              width: 90px;
              height: 90px;
              background-color: #f6efe0;
              border-radius: 50%;
              margin: 0 auto 26px auto;
              line-height: 90px;
            "
          >
            <img
              src="https://ik.imagekit.io/avtechnosys/yunanved/orderStatusIcon1.png"
              width="36"
              style="vertical-align: middle"
            />
          </div>

          <h1
            style="
              font-size: 32px;
              color: #0b1320;
              margin: 0 0 10px 0;
              font-weight: 700;
              line-height: 1.2;
            "
          >
            Your Order Has Been<br />Delivered!
          </h1>

          <p style="font-size: 15px; color: #5a6a85; margin: 0 0 30px 0">
            Delivered today at 2:45 PM
          </p>

          <!-- Order Card -->
          <div
            style="
              border: 1px solid #f0f4f8;
              border-radius: 12px;
              overflow: hidden;
              margin-bottom: 30px;
            "
          >
            <img
              src="https://ik.imagekit.io/avtechnosys/yunanved/asset1.png"
              alt="Order Items"
              width="100%"
              height="360px"
              style="display: block"
            />

            <div style="padding: 20px; text-align: left">
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <h3 style="font-size: 20px; color: #0b1320; margin: 0">
                  Order ID: ${orderId}
                </h3>

                <span
                  style="
                    background-color: #f0f9f4;
                    color: #2ecc71;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 700;
                  "
                >
                  DELIVERED
                </span>
              </div>

              <p
                style="
                  font-size: 14px;
                  color: #5a6a85;
                  line-height: 1.5;
                  margin: 15px 0 0 0;
                "
              >
                We hope you enjoy your Yunanved products! Your support means the
                world to our local farmers and vendors.
              </p>
            </div>
          </div>

          <!-- Rating Section -->
          <div
            style="
              background-color: #f7f0e1;
              border-radius: 12px;
              padding: 30px 20px;
            "
          >
            <p
              style="
                font-size: 18px;
                color: #d7b36a;
                font-weight: 700;
                margin: 0 0 15px 0;
              "
            >
              Rate Your Experience
            </p>

            <div style="margin-bottom: 25px">
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/orderStatusIcon2.png"
                width="30"
                style="margin: 0 2px"
              />
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/orderStatusIcon2.png"
                width="30"
                style="margin: 0 2px"
              />
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/orderStatusIcon2.png"
                width="30"
                style="margin: 0 2px"
              />
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/orderStatusIcon2.png"
                width="30"
                style="margin: 0 2px"
              />
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/orderStatusIcon2.png"
                width="30"
                style="margin: 0 2px"
              />
            </div>

            <a
              href="#"
              style="
                display: block;
                background-color: #d7b36a;
                color: #ffffff;
                padding: 15px;
                text-decoration: none;
                border-radius: 30px;
                font-weight: 700;
                font-size: 16px;
                border: 1px solid rgba(212, 160, 23, 0.1);
              "
            >
              Write a Review
            </a>

            <p style="font-size: 12px; color: #5a6a85; margin: 15px 0 0 0">
              Your feedback helps us grow 🌿
            </p>
          </div>

          <div style="margin-top: 40px">
            <p
              style="
                font-size: 13px;
                color: #9aa4af;
                line-height: 1.5;
                margin: 0;
              "
            >
              If you have any questions, feel free to reach us at<br />

              <a
                href="mailto:support@yunanved.com"
                style="color: #d4a017; text-decoration: none; font-weight:700"
              >
                support@yunanved.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendOutForDeliveryEmail(email:string,orderId:string,estimatedArrival:string) {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Welcome to Yunanved - Your Account is Ready!",
      html: `
       <body
    style="
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif;
    "
  >
    <center>
      <!-- Header -->
      <div
        style="
          background-color: #f7f9f9;
          border-bottom: 1px solid #eeeeee;
          padding: 15px 0;
          text-align: center;
          width: 100%;
        "
      >
        <span
          style="
            font-size: 18px;
            color: #0b1320;
            font-weight: 700;
            letter-spacing: 0.5px;
          "
        >
          Order Status
        </span>
      </div>

      <!-- Container -->
      <div
        class="container"
        style="
          max-width: 500px;
          background-color: #ffffff;
          text-align: center;
          margin: auto;
        "
      >
        <div style="padding: 40px 20px">
          <div
            style="
              width: 90px;
              height: 90px;
              background-color: #f6efe0;
              border-radius: 50%;
              margin: 0 auto 20px auto;
              line-height: 90px;
            "
          >
            <img
              src="https://ik.imagekit.io/avtechnosys/yunanved/orderShippedIcon4.png"
              width="36"
              style="vertical-align: middle"
            />
          </div>

          <div style="margin-bottom: 20px">
            <span
              style="
                background-color: #fcf6e5;
                color: #d4a017;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 1px;
                display: inline-flex;
                align-items: center;
              "
            >
              <span
                style="
                  width: 8px;
                  height: 8px;
                  background-color: #d4a017;
                  border-radius: 50%;
                  display: inline-block;
                  margin-right: 8px;
                "
              ></span>

              LIVE UPDATE
            </span>
          </div>

          <h1
            style="
              font-size: 32px;
              color: #0b1320;
              margin: 0 0 10px 0;
              font-weight: 700;
            "
          >
            Out for Delivery Today!
          </h1>

          <p
            style="
              font-size: 16px;
              color: #5a6a85;
              line-height: 1.5;
              margin: 0 0 30px 0;
            "
          >
            Your Yunanved order is on its way to your doorstep.
          </p>


          <!-- Order Details Card -->
          <div
            style="
              border: 1px solid #f7f0e1;
              border-radius: 12px;
              padding: 20px;
              text-align: left;
              margin-bottom: 30px;
            "
          >
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
              "
            >
              <div>
                <span
                  style="
                    font-size: 12px;
                    color: #9aa4af;
                    font-weight: bold;
                    text-transform: uppercase;
                  "
                >
                  Order ID
                </span>

                <h3 style="font-size: 22px; color: #0b1320; margin: 4px 0">
                  ${orderId}
                </h3>
              </div>

              <div
                style="
                  background-color: #f6efe0;
                  border-radius: 50%;
                  width: 36px;
                  height: 36px;
                  text-align: center;
                "
              >
                <img
                  src="https://ik.imagekit.io/avtechnosys/yunanved/outForDelIcon1.png"
                  width="20"
                  style="margin-top: 8px"
                />
              </div>
            </div>

            <hr
              style="border: 0; border-top: 1px solid #f1f4f9; margin: 20px 0"
            />

            <div
              style="
                display: flex;
                align-items: flex-start;
                margin-bottom: 20px;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/outForDelIcon4.png"
                width="18"
                style="margin-right: 12px; margin-top: 2px"
              />

              <div>
                <p
                  style="
                    margin: 0;
                    font-size: 14px;
                    font-weight: bold;
                    color: #0b1320;
                  "
                >
                  Estimated Arrival
                </p>

                <p style="margin: 0; font-size: 14px; color: #5a6a85">
                 ${estimatedArrival}
                </p>
              </div>
            </div>

            <div
              style="
                background-color: #fcf6e5;
                border-radius: 12px;
                padding: 15px;
                border-left: 4px solid #d4a017;
                display: flex;
                align-items: flex-start;
                gap: 5px;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/infoyellow.png"
                width="22"
                style="margin-right: 10px; margin-top: 4px"
              />

              <div style="font-size: 13px; color: #5a6a85; line-height: 1.5">
                Please keep your phone accessible for delivery coordination. Our
                courier may call you upon arrival.
              </div>
            </div>
          </div>

          <!-- Buttons -->

          <div style="margin-bottom: 15px">
            <a
              href="#"
              style="
                display: block;
                background-color: #d7b36a;
                color: #ffffff;
                padding: 18px;
                text-decoration: none;
                border-radius: 40px;
                font-weight: bold;
                font-size: 17px;
                text-align: center;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/outForDelIcon2.png"
                width="18"
                style="vertical-align: middle; margin-right: 8px"
              />

              Track Delivery
            </a>
          </div>

          <div style="margin-bottom: 40px">
            <a
              href="#"
              style="
                display: block;
                border: 1px solid #d7b36a;
                color: #d7b36a;
                padding: 18px;
                text-decoration: none;
                border-radius: 40px;
                font-weight: bold;
                font-size: 17px;
                text-align: center;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/outForDelIcon3.png"
                width="18"
                style="vertical-align: middle; margin-right: 8px"
              />

              Contact Courier
            </a>
          </div>

       
            <p
            style="font-size: 12px; color: #9aa4af; line-height: 1.5; margin: 0"
          >
            If you have any questions, feel free to reach us at<br />

            <a
              href="mailto:support@yunanved.com"
              style="color: #d4a017; text-decoration: none; font-weight:bold"
            >
              support@yunanved.com
            </a>
          </p>
        </div>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendPaymentReceivedEmail(email: string,userName:string,orderId:string,amount:string,paymentMethod:string,deliveryDate:string) {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Yunanved - Payment Received for Your Order",
      html: `
       <body
    style="
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif;
    "
  >
    <center>
      <!-- Header -->
      <div
        style="
          background-color: #f8f9fa;
          border-bottom: 1px solid #eeeeee;
          padding: 15px 0;
          text-align: center;
          width: 100%;
        "
      >
        <span
          style="
            font-size: 18px;
            color: #0b1320;
            font-weight: 700;
            letter-spacing: 0.5px;
          "
        >
          Payment Success
        </span>
      </div>

      <!-- Wrapper -->
      <div style="background-color: #ffffff; padding: 20px 10px">
        <div
          class="container"
          style="
            max-width: 500px;
            background-color: #ffffff;
            text-align: center;
            margin: auto;
          "
        >
          <!-- Success Icon -->
          <div style="padding: 10px 0">
            <div
              style="
                display: inline-block;
                width: 80px;
                height: 80px;
                background-color: #f3e9c7;
                border-radius: 50%;
                position: relative;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/orderStatusIcon1.png"
                alt="Success"
                width="40"
                style="margin-top: 20px"
              />
            </div>
          </div>

          <!-- Heading -->
          <div>
            <h2
              style="
                font-size: 32px;
                color: #0b1320;
                margin: 0 0 10px 0;
                font-weight: 700;
              "
            >
              Payment Received
            </h2>

            <p
              style="
                font-size: 16px;
                color: #5a6a85;
                line-height: 1.5;
                margin: 0 0 30px 0;
              "
            >
              Thank you! Your order is now being<br />
              prepared with care by the Yunanved team.
            </p>
          </div>

          <!-- Order Card -->
          <div
            style="
              border: 1px solid #eef2f6;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
            "
          >
            <img
              src="https://ik.imagekit.io/avtechnosys/yunanved/asset3.jpg?updatedAt=1773039685321"
              alt="Order Items"
              width="100%"
              style="display: block; width: 100%; height: auto"
            />

            <div style="padding: 24px; text-align: left">
              <!-- Order Header -->
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <div>
                  <span
                    style="
                      font-size: 12px;
                      color: #5a6a85;
                      text-transform: uppercase;
                      font-weight: bold;
                    "
                  >
                    Order Number
                  </span>

                  <h3 style="font-size: 18px; color: #0b1320; margin: 4px 0">
                    ${orderId}
                  </h3>
                </div>

                <span
                  style="
                    background-color: #fef5e7;
                    color: #d4a017;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: bold;
                  "
                >
                  CONFIRMED
                </span>
              </div>

              <hr
                style="border: 0; border-top: 1px solid #f1f4f9; margin: 20px 0"
              />

              <!-- Details -->
              <div style="font-size: 15px">
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    height: 35px;
                    align-items: center;
                  "
                >
                  <div style="color: #5a6a85">Customer Name</div>

                  <div style="color: #0b1320; font-weight: 600 ; margin-left: 5px">
                    ${userName}
                  </div>
                </div>

                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    height: 35px;
                    align-items: center;
                  "
                >
                  <div style="color: #5a6a85">Payment Method</div>

                  <div style="color: #0b1320; font-weight: 600 ; margin-left: 5px">
                    ${paymentMethod}
                  </div>
                </div>

                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    height: 45px;
                    align-items: center;
                  "
                >
                  <div style="color: #0b1320; font-weight: 700">Total Paid</div>

                  <div
                    style="color: #d4a017; font-size: 18px; font-weight: 700; margin-left: 5px"
                  >
                    ₹${amount}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Delivery Info -->
          <div style="padding-top: 20px">
            <div
              style="
                background-color: #f7f0e1;
                border-radius: 12px;
                padding: 16px;
                display: flex;
                align-items: center;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/orderShippedIcon4.png"
                width="24"
                alt="Delivery"
                style="margin-right: 10px"
              />

              <div style="text-align: left">
                <p
                  style="
                    margin: 0;
                    font-size: 14px;
                    font-weight: bold;
                    color: #d7b36a;
                  "
                >
                  Estimated Delivery
                </p>

                <p style="margin: 0; font-size: 13px; color: #5a6a85">
                  ${deliveryDate}
                </p>
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div style="padding: 30px 0 10px 0">
            <a
              href="{{baseUrl}}/dashboard/orders/{{orderId}}"
              style="
                display: block;
                background-color: #d7b36a;
                color: #ffffff;
                padding: 16px;
                text-decoration: none;
                border-radius: 30px;
                font-weight: bold;
                font-size: 16px;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/paymentConfirmationIcon2.png"
                width="16"
                style="vertical-align: middle; margin-right: 8px"
              />

              View Order Details
            </a>
          </div>

          <div style="padding-bottom: 30px">
            <a
              href="{{baseUrl}}"
              style="
                display: block;
                border: 1px solid #d7b36a;
                color: #d7b36a;
                padding: 16px;
                text-decoration: none;
                border-radius: 30px;
                font-weight: bold;
                font-size: 16px;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/orderConfirmicon2.png"
                width="16"
                style="vertical-align: middle; margin-right: 8px"
              />

              Continue Shopping
            </a>
          </div>

          <p style="font-size: 12px; color: #b2b2b2; margin: 0">
            A confirmation email has been sent to {{email}}
          </p>
        </div>
      </div>
    </center>
  </body>
            `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendRefundEmail(email:string, amount:string, orderId:string){
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Refund Request Received - Yunanved",
      html: `
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family: &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif;
    "
  >
    <center>
      <!-- Header -->
      <div
        style="
          background-color: #f7f9f9;
          border-bottom: 1px solid #eeeeee;
          padding: 15px 0;
          text-align: center;
          width: 100%;
        "
      >
        <span
          style="
            font-size: 18px;
            color: #0b1320;
            font-weight: 700;
            letter-spacing: 0.5px;
          "
        >
          Security Center
        </span>
      </div>

      <!-- Container -->
      <div
        class="container"
        style="
          max-width: 500px;
          background-color: #ffffff;
          text-align: center;
          margin: auto;
        "
      >
        <div style="padding: 40px 20px">
          <!-- Refund Icon -->
          <div style="margin-bottom: 30px">
            <div
              style="
                display: inline-block;
                width: 100px;
                height: 100px;
                background-color: #f6efe0;
                border-radius: 50%;
                position: relative;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/refundIcon1.png"
                alt="Refund"
                width="50"
                style="margin-top: 25px"
              />

              <div
                style="
                  position: absolute;
                  bottom: 0;
                  right: 0;
                  background-color: #ffffff;
                  border-radius: 50%;
                  width: 28px;
                  height: 28px;
                  border: 2px solid #f6efe0;
                "
              >
                <img
                  src="https://ik.imagekit.io/avtechnosys/yunanved/refundIcon2.png"
                  width="16"
                  style="margin-top: 6px"
                />
              </div>
            </div>
          </div>

          <!-- Heading -->
          <h1
            style="
              font-size: 28px;
              color: #0b1320;
              margin: 0 0 10px 0;
              font-weight: 700;
              line-height: 1.2;
            "
          >
            Refund Processed<br />Successfully
          </h1>

          <p
            style="
              font-size: 15px;
              color: #5a6a85;
              line-height: 1.5;
              margin: 0 0 30px 0;
            "
          >
            Your refund has been initiated and is on its way<br />
            back to your original payment method.
          </p>

          <!-- Refund Card -->
          <div
            style="
              border: 1px solid #f6efe0;
              border-radius: 12px;
              padding: 30px 24px;
              margin-bottom: 30px;
              text-align: left;
            "
          >
            <!-- Amount -->
            <div
              style="
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                margin-bottom: 15px;
                align-items: center;
              "
            >
              <div style="color: #5a6a85">Refund Amount</div>

              <div style="color: #0b1320; font-weight: 700; font-size: 20px">
                ${amount}
              </div>
            </div>

            <hr
              style="
                border: 0;
                border-top: 1px solid #f8f1e6;
                margin-bottom: 15px;
              "
            />

            <!-- Order ID -->
            <div
              style="
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                margin-bottom: 20px;
                align-items: center;
              "
            >
              <div style="color: #5a6a85">Order ID</div>

              <div style="color: #0b1320; font-weight: 700">${orderId}</div>
            </div>

            <!-- Refund Info Box -->
            <div
              style="
                background-color: #f6f1e6;
                border-radius: 12px;
                padding: 15px;
                display: flex;
                align-items: flex-start;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/infoyellow.png"
                width="24"
                style="margin-right: 10px; margin-top: 2px"
              />

              <div style="font-size: 13px; color: #5a6a85; line-height: 1.5">
                It may take 3-7 working days for the amount to reflect in your
                account depending on your bank's processing time.
              </div>
            </div>
          </div>

          <!-- Policy Link -->
          <div style="margin-bottom: 30px">
            <a
              href="#"
              style="
                color: #d4a017;
                text-decoration: none;
                font-weight: bold;
                font-size: 15px;
              "
            >
              View Refund Policy

              <span style="font-size: 18px; vertical-align: middle">→</span>
            </a>
          </div>

          <!-- Button -->
          <div style="margin-bottom: 40px">
            <a
              href="#"
              style="
                display: block;
                background-color: #d7b36a;
                color: #ffffff;
                padding: 18px;
                text-decoration: none;
                border-radius: 40px;
                font-weight: bold;
                font-size: 17px;
              "
            >
              Check Bank Statement
            </a>
          </div>

          <!-- Footer -->
          <p
            style="font-size: 12px; color: #9aa4af; line-height: 1.5; margin: 0"
          >
            If you have any questions, feel free to reach us at<br />

            <a
              href="mailto:support@yunanved.com"
              style="color: #d4a017; text-decoration: none; font-weight: bold"
            >
              support@yunanved.com
            </a>
          </p>
        </div>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}