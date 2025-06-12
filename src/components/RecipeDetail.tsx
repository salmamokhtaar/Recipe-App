
import { ArrowLeft, Heart, Clock, Users, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Recipe {
  id: string;
  title: string;
  image: string;
  cookTime: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface RecipeDetailProps {
  recipe: Recipe;
  isFavorite: boolean;
  onBack: () => void;
  onToggleFavorite: () => void;
}

export const RecipeDetail = ({ recipe, isFavorite, onBack, onToggleFavorite }: RecipeDetailProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              onClick={onToggleFavorite}
              className="p-2"
            >
              <Heart 
                className={`w-5 h-5 ${
                  isFavorite 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-gray-600'
                }`} 
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Hero Image */}
        <div className="relative mb-6">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 sm:h-80 object-cover rounded-xl shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl" />
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{recipe.title}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {recipe.cookTime} min
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {recipe.servings} servings
              </div>
              <div className="flex items-center gap-1">
                <ChefHat className="w-4 h-4" />
                {recipe.difficulty}
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Info */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="secondary">{recipe.category}</Badge>
          <Badge className={getDifficultyColor(recipe.difficulty)}>{recipe.difficulty}</Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Ingredients */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                Ingredients
              </h2>
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full flex-shrink-0" />
                    <span className="text-gray-700">{ingredient}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Instructions
              </h2>
              <div className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{instruction}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cooking Tips */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-blue-500" />
              Cooking Tips
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>• Read through all instructions before starting to cook</p>
              <p>• Prepare and measure all ingredients beforehand (mise en place)</p>
              <p>• Taste and adjust seasoning as you cook</p>
              <p>• Don't be afraid to customize the recipe to your preferences</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
