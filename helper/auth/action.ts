type SignupPayload = {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  user_type?: "user" | "admin";
};

type LoginPayload = {
  email: string;
  password: string;
};

type ConfirmPayload = {
  email: string;
  code: string;
};


export async function signup(payload: SignupPayload) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
}


export async function login(payload: LoginPayload) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}


export async function confirmSignup(payload: ConfirmPayload) {
  const res = await fetch("/api/auth/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Confirmation failed");
  }

  return data;
}
export async function resendOtp(email: string) {
  const res = await fetch("/api/auth/resend-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to resend OTP");
  }

  return data;
}