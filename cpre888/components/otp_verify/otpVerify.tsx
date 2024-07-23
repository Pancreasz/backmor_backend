// components/LoginRegisForm.tsx
import React from 'react';

export default function () {
  return (
    <>
      <form action={`/verify-otp`} method="POST">
        <label htmlFor="otp">Enter OTP</label>
        <input type="text" id="otp" name="otp" required /><br /><br />
        <button type="submit">Submit</button>
      </form><br />
    </>
  );
};

