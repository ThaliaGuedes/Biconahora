import { X, Heart, RotateCcw } from 'lucide-react';

interface SwipeButtonsProps {
  onReject: () => void;
  onAccept: () => void;
  onUndo?: () => void;
  canUndo?: boolean;
}

export const SwipeButtons = ({ onReject, onAccept, onUndo, canUndo = false }: SwipeButtonsProps) => {
  return (
    <div className="flex items-center justify-center gap-6">
      <button
        onClick={onReject}
        className="w-16 h-16 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group border-2 border-gray-200"
      >
        <X className="text-red-500 group-hover:scale-125 transition-transform" size={28} />
      </button>

      {canUndo && onUndo && (
        <button
          onClick={onUndo}
          className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group border-2 border-gray-200"
        >
          <RotateCcw className="text-yellow-500 group-hover:scale-125 transition-transform" size={20} />
        </button>
      )}

      <button
        onClick={onAccept}
        className="w-16 h-16 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group border-2 border-gray-200"
      >
        <Heart className="text-green-500 group-hover:scale-125 transition-transform fill-green-500" size={28} />
      </button>
    </div>
  );
};
