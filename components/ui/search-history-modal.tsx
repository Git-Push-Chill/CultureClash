import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SearchHistoryItem, FusionRecipe } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  Clock,
  Globe,
  ChefHat,
  Users,
  Flame,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: SearchHistoryItem[];
  initialSelectedItem?: SearchHistoryItem | null;
  initialSelectedRecipe?: FusionRecipe | null;
}

export function SearchHistoryModal({
  isOpen,
  onClose,
  history,
  initialSelectedItem = null,
  initialSelectedRecipe = null,
}: SearchHistoryModalProps) {
  const [selectedItem, setSelectedItem] = useState<SearchHistoryItem | null>(
    initialSelectedItem
  );
  const [selectedRecipe, setSelectedRecipe] = useState<FusionRecipe | null>(
    initialSelectedRecipe
  );
  const router = useRouter();

  useEffect(() => {
    if (initialSelectedItem) {
      setSelectedItem(initialSelectedItem);
    } else {
      setSelectedItem(null);
    }
    if (initialSelectedRecipe) {
      setSelectedRecipe(initialSelectedRecipe);
    } else {
      setSelectedRecipe(null);
    }
  }, [initialSelectedItem, initialSelectedRecipe, isOpen]);

  const handleViewFusion = (item: SearchHistoryItem) => {
    onClose();
    router.push(
      `/worlds/${encodeURIComponent(item.world1)}/${encodeURIComponent(
        item.world2
      )}`
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto bg-linear-to-br from-gray-900 to-gray-800 border-gray-700">
        {!selectedItem ? (
          // History List View
          <>
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-white">
                🌍 Previous Culinary Adventures
              </DialogTitle>
              <p className="text-white mt-2">
                Revisit your flavor fusions from around the world
              </p>
            </DialogHeader>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {history.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <Globe className="w-16 h-16 mx-auto mb-4 text-white" />
                  <p className="text-white text-lg">No adventures yet!</p>
                  <p className="text-white mt-2">
                    Start exploring to create your fusion history
                  </p>
                </div>
              ) : (
                history.map((item, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover:shadow-xl hover:shadow-purple-500/30 transition-all bg-gray-800/50 border-gray-700 hover:border-purple-500/50 hover:scale-[1.02]"
                    onClick={() => setSelectedItem(item)}
                  >
                    <CardContent className="p-4">
                      {/* Country Flags */}
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="text-4xl">{item.world1}</span>
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        <span className="text-4xl">{item.world2}</span>
                      </div>

                      {/* Single Fusion Image */}
                      <div className="relative h-32 w-full rounded-lg overflow-hidden border-2 border-purple-500/30">
                        {item.fusionRecipes &&
                        item.fusionRecipes.length > 0 &&
                        item.fusionRecipes[0].imageUrl ? (
                          <Image
                            src={item.fusionRecipes[0].imageUrl}
                            alt={item.fusionRecipes[0].name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-linear-to-br from-purple-600/30 via-pink-600/30 to-orange-600/30 flex items-center justify-center">
                            <ChefHat className="w-12 h-12 text-purple-300" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </>
        ) : (
          // Recipe Detail View
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedRecipe(null);
                    setSelectedItem(null);
                  }}
                  className="text-white hover:text-white hover:bg-gray-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to History
                </Button>
              </div>
              <DialogTitle className="text-3xl font-bold text-white mt-4">
                <span className="text-white">{selectedItem.world1}</span>
                <Sparkles className="inline-block w-6 h-6 mx-2 text-purple-400" />
                <span className="text-white">{selectedItem.world2}</span>
              </DialogTitle>
            </DialogHeader>

            {selectedRecipe ? (
              // Individual Recipe Modal
              <div className="mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRecipe(null)}
                  className="mb-4 text-white hover:text-white hover:bg-gray-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Recipes
                </Button>

                {/* Hero Image */}
                {selectedRecipe.imageUrl && (
                  <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                    <Image
                      src={selectedRecipe.imageUrl}
                      alt={selectedRecipe.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedRecipe.name}
                  </h3>
                  <p className="text-white mb-4">
                    {selectedRecipe.description}
                  </p>

                  <div className="flex gap-2 mb-4">
                    <Badge className="bg-green-500/30 text-green-200 border-green-500/50">
                      {selectedItem.world1}: {selectedRecipe.world1Dish}
                    </Badge>
                    <Badge className="bg-blue-500/30 text-blue-200 border-blue-500/50">
                      {selectedItem.world2}: {selectedRecipe.world2Dish}
                    </Badge>
                  </div>

                  {/* Recipe Info */}
                  <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b border-gray-700">
                    <div className="flex items-center gap-2 text-white">
                      <Users className="w-5 h-5 text-purple-400" />
                      <span>
                        <strong>{selectedRecipe.servings}</strong> servings
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <span>
                        Prep: <strong>{selectedRecipe.prepTime}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <Flame className="w-5 h-5 text-orange-400" />
                      <span>
                        Cook: <strong>{selectedRecipe.cookTime}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div className="mb-6">
                    <h4 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      Ingredients
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {selectedRecipe.ingredients.map((ingredient, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 p-2 rounded-lg text-sm ${
                            ingredient.origin === "world1"
                              ? "bg-green-500/10 border border-green-500/30"
                              : ingredient.origin === "world2"
                              ? "bg-blue-500/10 border border-blue-500/30"
                              : "bg-purple-500/10 border border-purple-500/30"
                          }`}
                        >
                          <span className="text-white">
                            <strong className="text-white">
                              {ingredient.amount}
                            </strong>{" "}
                            {ingredient.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="mb-6">
                    <h4 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
                      <ChefHat className="w-5 h-5 text-pink-400" />
                      Instructions
                    </h4>
                    <ol className="space-y-2">
                      {selectedRecipe.instructions.map((instruction, idx) => (
                        <li key={idx} className="flex gap-3 text-white text-sm">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-linear-to-r from-purple-600 to-pink-600 flex items-center justify-center font-bold text-white text-xs">
                            {idx + 1}
                          </span>
                          <span className="flex-1 pt-0.5">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Cultural Notes */}
                  <div className="bg-linear-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-400/30">
                    <h4 className="text-lg font-bold mb-2 text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      Cultural Fusion Notes
                    </h4>
                    <p className="text-white text-sm leading-relaxed">
                      {selectedRecipe.culturalNotes}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // Recipe Grid
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {selectedItem.fusionRecipes &&
                selectedItem.fusionRecipes.length > 0 ? (
                  selectedItem.fusionRecipes.map((recipe, idx) => (
                    <Card
                      key={idx}
                      onClick={() => setSelectedRecipe(recipe)}
                      className="overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-purple-500/30 transition-all hover:scale-105 bg-gray-800/50 border-gray-700 hover:border-purple-500/50"
                    >
                      <div className="relative h-40 w-full">
                        {recipe.imageUrl ? (
                          <Image
                            src={recipe.imageUrl}
                            alt={recipe.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-linear-to-br from-purple-600/30 via-pink-600/30 to-orange-600/30 flex items-center justify-center">
                            <ChefHat className="w-12 h-12 text-purple-300" />
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg text-white">
                          {recipe.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {recipe.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-white">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span>
                              {recipe.prepTime} + {recipe.cookTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-white">
                            <Users className="w-4 h-4 text-purple-400" />
                            <span>{recipe.servings} servings</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <ChefHat className="w-16 h-16 mx-auto mb-4 text-white" />
                    <p className="text-white">
                      No fusion recipes available for this combination
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-center">
              <Button
                onClick={() => handleViewFusion(selectedItem)}
                className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                View Full Fusion Page
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
