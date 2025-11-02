
import React, { useEffect, useState } from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const AlertMessage = ({ message, type = 'success', duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!visible || !message) return null;

  const colors = type === 'success'
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800';

  return (
    <div className={` w-max z-500 top-10 fixed right-0 mb-4 p-6 rounded ${colors}`}>
      {type=='success' && (
        <p className='flex items-center'>
          <FiCheckCircle className='mr-4'/>
          {message}
        </p>
      )}

        {type=='error' && (
        <p className='flex items-center'>
          <FiXCircle className='mr-4'/>
          {message}
        </p>
      )}
      
        
    </div>
  );
};

export default AlertMessage;
