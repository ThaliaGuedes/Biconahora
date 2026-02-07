import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Briefcase, Eye, EyeOff } from 'lucide-react';
import { FreelancerProfile } from '@/app/types';
import { StarRating } from './StarRating';

interface FreelancerCardProps {
  freelancer: FreelancerProfile;
}

export const FreelancerCard = ({ freelancer }: FreelancerCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md mx-auto"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.3 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
    >
      {/* Photo */}
      <div className="relative h-96 bg-gray-100">
        <img
          src={freelancer.photo}
          alt={freelancer.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
          <StarRating rating={freelancer.rating} size={14} showNumber={true} />
        </div>
      </div>

      {/* Info */}
      <div className="p-6 space-y-4">
        {/* Name and City */}
        <div>
          <h2 className="text-2xl mb-1">{freelancer.name}</h2>
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-1" />
            <span>{freelancer.city}</span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center text-gray-700">
            <Mail size={16} className="mr-2 text-purple-600" />
            {freelancer.showEmail ? (
              <span className="text-sm">{freelancer.email}</span>
            ) : (
              <span className="text-sm text-gray-400 flex items-center gap-1">
                <EyeOff size={14} /> Oculto
              </span>
            )}
          </div>
          <div className="flex items-center text-gray-700">
            <Phone size={16} className="mr-2 text-purple-600" />
            {freelancer.showPhone ? (
              <span className="text-sm">{freelancer.phone}</span>
            ) : (
              <span className="text-sm text-gray-400 flex items-center gap-1">
                <EyeOff size={14} /> Oculto
              </span>
            )}
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-start text-gray-700">
          <Clock size={16} className="mr-2 mt-0.5 text-purple-600" />
          <span className="text-sm">{freelancer.availability}</span>
        </div>

        {/* Skills */}
        <div>
          <div className="flex items-center text-gray-700 mb-2">
            <Briefcase size={16} className="mr-2 text-purple-600" />
            <span className="text-sm font-medium">Habilidades</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {freelancer.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm border border-purple-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Reviews Preview */}
        {freelancer.reviews.length > 0 && (
          <div className="border-t pt-4">
            <p className="text-sm mb-2">
              <span className="font-medium">{freelancer.reviews.length}</span> avaliação
              {freelancer.reviews.length !== 1 ? 'ões' : ''}
            </p>
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-600 italic">"{freelancer.reviews[0].comment}"</p>
              <p className="text-xs text-gray-500 mt-1">- {freelancer.reviews[0].employerName}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};