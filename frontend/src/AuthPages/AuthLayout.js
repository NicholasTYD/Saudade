import React from 'react';

const AuthLayout = ({ message, authTitle, authForm, swapPrompt }) => {

  const bodyContent = (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '90vh' }}>
    <div className="py-5 px-4 container-normal">
      <h2 className="text-center mb-4">
        { authTitle }
      </h2>
      {message && <div className="alert alert-warning p-2">{message}</div>}
      { authForm }
      <div className="text-center mt-2">
        { swapPrompt }
      </div>
    </div>
  </div>
  );

  return bodyContent
};

export default AuthLayout;