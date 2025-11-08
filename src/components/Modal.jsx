import { X } from 'lucide-react';
import React from 'react'

const Modal = ({isOpen , onClose , children , title}) => {
    if(!isOpen) return null;
  return (
    <div className='fixed inset-0 flex justify-center z-50 items-center w-full h-full overflow-hidden bg-black/40 backdrop-blur-sm'>
         
         <div className="relatice p-4 width-full max-w-2xl max-h-[90vh]">
             <div className="relative bg-white rounded-xl shadow-2xl border border-gray-300">
                    <div className="flex items-center justify-between p-5 md:p-6 border border-gray-100 rounded-t-xl">
                         <h3 className="text-xl font-semibold text-gray-800">
                             {title}
                         </h3>

                         <button
                         onClick={onClose}
                         className='text=gray-500'> 
                             <X />
                         </button>
                    </div>

                    <div className="p-5 text-gray-700">
                        {children}
                    </div>
             </div>
         </div>
     
    </div>
  )
}

export default Modal