import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";

export function ContactUsFooter() {
  return (
    <footer className="relative z-10 w-full bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
                 <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 px-6 sm:px-8 lg:px-12">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
                     {/* Left Section - About + Social */}
           <div className="space-y-6">
             <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-4">About Abdel Basset Dentaire</h3>
            
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
              Providing exceptional dental care with state-of-the-art technology and compassionate service. 
              Your smile is our priority. We are committed to delivering professional dental solutions with 
              the highest standards of care and comfort.
            </p>
            
                         {/* Social Media Icons */}
             <div className="flex space-x-3 sm:space-x-4">
               <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
                 <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
               </a>
               <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
                 <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
               </a>
             </div>
           </div>
           
           {/* Right Section - Contact Info */}
           <div className="space-y-6">
             <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-6">Contact Information</h3>
             
             <div className="space-y-4">
                               {/* Location */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 bg-gray-100 rounded-lg p-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base mb-1">Bab Ezzouar, Algiers</p>
                    <p className="text-gray-600 text-xs sm:text-sm">Algeria</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 bg-gray-100 rounded-lg p-2">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base mb-1">0556 84 62 00</p>
                    <p className="text-gray-600 text-xs sm:text-sm">0781 44 42 10</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 bg-gray-100 rounded-lg p-2">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div>
                    <a href="mailto:info@abdentaire.dz" className="font-semibold text-gray-900 text-sm sm:text-base mb-1 hover:text-blue-600 transition-colors duration-200">
                      info@abdentaire.dz
                    </a>
                    <p className="text-gray-600 text-xs sm:text-sm">contact@abdentaire.dz</p>
                  </div>
                </div>
             </div>
           </div>
        </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex justify-center items-center">
            <p className="text-xs sm:text-sm text-gray-500">
              © 2024 Abdel Basset Dentaire. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 