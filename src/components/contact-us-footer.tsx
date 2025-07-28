import { Phone, MapPin, Mail, Clock } from "lucide-react";

export function ContactUsFooter() {
  return (
    <footer className="relative z-10 w-full bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 shadow-sm px-4 sm:px-6 py-6 sm:py-8 mt-8 pb-28 sm:pb-32">
      <div className="max-w-4xl mx-auto">
        

        {/* Clinic Info */}
        <div className="text-center mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Abdel Basset Dentaire</h3>
          <p className="text-sm text-gray-600">Your trusted dental care partner</p>
        </div>

        {/* Single Contact Information Container */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Column - Contact Details */}
            <div className="space-y-3 sm:space-y-4">
              {/* Phone Numbers */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">Phone</p>
                  <p className="text-xs sm:text-sm text-gray-600">0556 84 62 00</p>
                  <p className="text-xs sm:text-sm text-gray-600">0781 44 42 10</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">Address</p>
                  <p className="text-xs sm:text-sm text-gray-600">Bab Ezzouar, Algiers</p>
                  <p className="text-xs sm:text-sm text-gray-600">Algeria</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">Email</p>
                  <p className="text-xs sm:text-sm text-gray-600">info@abdentaire.dz</p>
                  <p className="text-xs sm:text-sm text-gray-600">contact@abdentaire.dz</p>
                </div>
              </div>
            </div>

            {/* Right Column - Business Hours */}
            <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">Business Hours</p>
                </div>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <span className="text-xs sm:text-sm font-medium text-gray-900">Monday - Friday</span>
                  <span className="text-xs sm:text-sm text-gray-600">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <span className="text-xs sm:text-sm font-medium text-gray-900">Saturday</span>
                  <span className="text-xs sm:text-sm text-gray-600">9:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            © 2024 Abdel Basset Dentaire. All rights reserved. | Professional dental care services
          </p>
        </div>
      </div>
    </footer>
  );
} 