
import { useState, useEffect } from 'react';
import { Heart, Search, Filter, Grid, List, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RecipeDetail } from '@/components/RecipeDetail';
import { FavoritesPage } from '@/components/FavoritesPage';
import { useToast } from '@/hooks/use-toast';

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

const SAMPLE_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Creamy Mushroom Risotto',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&h=300&fit=crop',
    cookTime: 45,
    servings: 4,
    ingredients: ['Arborio rice', 'Mushrooms', 'Onion', 'White wine', 'Parmesan cheese', 'Vegetable broth', 'Butter', 'Olive oil'],
    instructions: [
      'Heat the vegetable broth in a separate pot and keep warm.',
      'Heat olive oil in a large pan and sauté diced onion until translucent.',
      'Add sliced mushrooms and cook until golden brown.',
      'Add Arborio rice and stir for 2 minutes until lightly toasted.',
      'Pour in white wine and stir until absorbed.',
      'Add warm broth one ladle at a time, stirring constantly.',
      'Continue until rice is creamy and al dente, about 20 minutes.',
      'Stir in butter and grated Parmesan cheese before serving.'
    ],
    category: 'Italian',
    difficulty: 'Medium'
  },
  {
    id: '2',
    title: 'Classic Caesar Salad',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&h=300&fit=crop',
    cookTime: 15,
    servings: 2,
    ingredients: ['Romaine lettuce', 'Croutons', 'Parmesan cheese', 'Caesar dressing', 'Anchovies', 'Lemon', 'Garlic', 'Olive oil'],
    instructions: [
      'Wash and chop romaine lettuce into bite-sized pieces.',
      'Make croutons by toasting bread cubes with olive oil and garlic.',
      'Prepare Caesar dressing with anchovies, lemon juice, and garlic.',
      'Toss lettuce with dressing until well coated.',
      'Top with croutons and freshly grated Parmesan cheese.',
      'Serve immediately while croutons are still crispy.'
    ],
    category: 'Salad',
    difficulty: 'Easy'
  },
  {
    id: '3',
    title: 'Chocolate Lava Cake',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=300&fit=crop',
    cookTime: 25,
    servings: 2,
    ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour', 'Vanilla extract', 'Salt', 'Powdered sugar'],
    instructions: [
      'Preheat oven to 425°F and butter two ramekins.',
      'Melt chocolate and butter in a double boiler.',
      'Whisk eggs and sugar until thick and pale.',
      'Fold in melted chocolate mixture and vanilla.',
      'Gently fold in flour and salt until just combined.',
      'Divide batter between ramekins.',
      'Bake for 12-14 minutes until edges are firm.',
      'Let cool for 1 minute, then invert onto plates and dust with powdered sugar.'
    ],
    category: 'Dessert',
    difficulty: 'Medium'
  },
  {
    id: '4',
    title: 'Grilled Salmon with Herbs',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&h=300&fit=crop',
    cookTime: 20,
    servings: 4,
    ingredients: ['Salmon fillets', 'Fresh dill', 'Lemon', 'Olive oil', 'Garlic', 'Salt', 'Black pepper', 'Asparagus'],
    instructions: [
      'Preheat grill to medium-high heat.',
      'Mix olive oil, minced garlic, and chopped dill.',
      'Season salmon fillets with salt and pepper.',
      'Brush salmon with herb mixture.',
      'Grill for 4-5 minutes per side until cooked through.',
      'Grill asparagus alongside for the last 8 minutes.',
      'Serve with lemon wedges and grilled vegetables.'
    ],
    category: 'Seafood',
    difficulty: 'Easy'
  },
  {
    id: '5',
    title: 'Thai Green Curry',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&h=300&fit=crop',
    cookTime: 30,
    servings: 4,
    ingredients: ['Green curry paste', 'Coconut milk', 'Chicken breast', 'Thai basil', 'Bell peppers', 'Eggplant', 'Fish sauce', 'Palm sugar'],
    instructions: [
      'Heat coconut milk in a wok until it begins to separate.',
      'Add green curry paste and fry until fragrant.',
      'Add sliced chicken and cook until nearly done.',
      'Pour in remaining coconut milk and bring to a simmer.',
      'Add vegetables and cook until tender.',
      'Season with fish sauce and palm sugar.',
      'Garnish with Thai basil leaves before serving with rice.'
    ],
    category: 'Thai',
    difficulty: 'Hard'
  },
  {
    id: '6',
    title: 'Margherita Pizza',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=300&fit=crop',
    cookTime: 35,
    servings: 2,
    ingredients: ['Pizza dough', 'Tomato sauce', 'Fresh mozzarella', 'Fresh basil', 'Olive oil', 'Salt', 'Garlic', 'Oregano'],
    instructions: [
      'Preheat oven to 475°F with pizza stone if available.',
      'Roll out pizza dough on floured surface.',
      'Spread thin layer of tomato sauce, leaving border for crust.',
      'Add torn pieces of fresh mozzarella.',
      'Drizzle with olive oil and sprinkle with salt.',
      'Bake for 12-15 minutes until crust is golden.',
      'Top with fresh basil leaves before serving.'
    ],
    category: 'Italian',
    difficulty: 'Medium'
  }
];

const Index = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(SAMPLE_RECIPES);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(SAMPLE_RECIPES);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('recipe-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('recipe-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Filter recipes based on search and ingredients
  useEffect(() => {
    let filtered = recipes;

    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedIngredients.length > 0) {
      filtered = filtered.filter(recipe =>
        selectedIngredients.every(ingredient =>
          recipe.ingredients.some(recipeIngredient =>
            recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
          )
        )
      );
    }

    setFilteredRecipes(filtered);
  }, [recipes, searchTerm, selectedIngredients]);

  const toggleFavorite = (recipeId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId];
      
      toast({
        title: prev.includes(recipeId) ? "Removed from favorites" : "Added to favorites",
        duration: 2000,
      });
      
      return newFavorites;
    });
  };

  const getAllIngredients = () => {
    const allIngredients = recipes.flatMap(recipe => recipe.ingredients);
    return [...new Set(allIngredients)].sort();
  };

  const toggleIngredientFilter = (ingredient: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  if (selectedRecipe) {
    return (
      <RecipeDetail
        recipe={selectedRecipe}
        isFavorite={favorites.includes(selectedRecipe.id)}
        onBack={() => setSelectedRecipe(null)}
        onToggleFavorite={() => toggleFavorite(selectedRecipe.id)}
      />
    );
  }

  if (showFavorites) {
    return (
      <FavoritesPage
        recipes={recipes}
        favorites={favorites}
        onBack={() => setShowFavorites(false)}
        onRecipeSelect={setSelectedRecipe}
        onToggleFavorite={toggleFavorite}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Recipe Book</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFavorites(true)}
                className={favorites.length > 0 ? 'bg-red-50 border-red-200' : ''}
              >
                <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                {favorites.length > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {favorites.length}
                  </Badge>
                )}
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={selectedIngredients.length > 0 ? 'bg-orange-100 border-orange-300' : ''}
            >
              <Filter className="w-4 h-4" />
              {selectedIngredients.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {selectedIngredients.length}
                </Badge>
              )}
            </Button>
          </div>

          {/* Ingredient Filters */}
          {showFilters && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Filter by ingredients:</h3>
              <div className="flex flex-wrap gap-2">
                {getAllIngredients().map(ingredient => (
                  <Button
                    key={ingredient}
                    variant={selectedIngredients.includes(ingredient) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleIngredientFilter(ingredient)}
                    className="text-xs"
                  >
                    {ingredient}
                  </Button>
                ))}
              </div>
              {selectedIngredients.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedIngredients([])}
                  className="mt-2 text-xs"
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Recipe Grid/List */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }>
          {filteredRecipes.map(recipe => (
            <Card 
              key={recipe.id} 
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(recipe.id);
                  }}
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      favorites.includes(recipe.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-gray-600'
                    }`} 
                  />
                </Button>
                <Badge 
                  variant="secondary" 
                  className="absolute bottom-2 left-2 bg-white/90"
                >
                  {recipe.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{recipe.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {recipe.cookTime} min
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {recipe.servings} servings
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {ingredient}
                    </Badge>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{recipe.ingredients.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
