import React from 'react';

function Loading() {
  return (
    <>
      <div className="absolute w-full h-full z-50 animate-fade-in">
        <div className="absolute w-full h-full top-0 blur-lg -z-10" />

        <div className="flex flex-col items-center justify-center w-full h-full">
          <img
            width="200"
            height="200"
            src="https://d3jj9yc7rgpax4.cloudfront.net/brand-system/logos/rdstation-logo-filled-default-horizontal.svg"
            alt="Logo"
            title="RD Station"
            className="animate-bounce"
          />
        </div>
      </div>
    </>
  );
}

export default Loading;
