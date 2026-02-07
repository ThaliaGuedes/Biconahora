import { Search, X } from 'lucide-react';

interface SearchFiltersProps {
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
  searchCity: string;
  onCityChange: (city: string) => void;
  availableSkills: string[];
}

export const SearchFilters = ({
  selectedSkills,
  onSkillToggle,
  searchCity,
  onCityChange,
  availableSkills,
}: SearchFiltersProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-purple-100">
      <h3 className="text-xl mb-4 text-purple-700">Filtros de Busca</h3>

      {/* City Search */}
      <div className="mb-4">
        <label className="block text-sm mb-2 text-gray-700">Cidade</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={searchCity}
            onChange={(e) => onCityChange(e.target.value)}
            placeholder="Buscar por cidade..."
            className="w-full pl-10 pr-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {searchCity && (
            <button
              onClick={() => onCityChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Skills Filter */}
      <div>
        <label className="block text-sm mb-2 text-gray-700">Habilidades</label>
        <div className="flex flex-wrap gap-2">
          {availableSkills.map((skill) => {
            const isSelected = selectedSkills.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => onSkillToggle(skill)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  isSelected
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-yellow-100 text-purple-700 hover:bg-yellow-200 border border-yellow-200'
                }`}
              >
                {skill}
                {isSelected && <X size={14} className="inline ml-1" />}
              </button>
            );
          })}
        </div>
        {selectedSkills.length > 0 && (
          <button
            onClick={() => selectedSkills.forEach(onSkillToggle)}
            className="mt-3 text-sm text-purple-600 hover:text-purple-800 underline"
          >
            Limpar todos os filtros
          </button>
        )}
      </div>
    </div>
  );
};