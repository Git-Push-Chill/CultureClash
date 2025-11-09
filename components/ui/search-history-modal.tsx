import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SearchHistoryItem, Meal } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Clock, Globe } from "lucide-react";
import Image from "next/image";

interface SearchHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: SearchHistoryItem[];
  onSelectMeals: (meals: Meal[]) => void;
}

export function SearchHistoryModal({
  isOpen,
  onClose,
  history,
  onSelectMeals,
}: SearchHistoryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Previous Culinary Adventures
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 mt-4">
          {history.map((item, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-lg transition-all bg-gray-800/50 border-gray-700 hover:border-gray-600"
              onClick={() => {
                onSelectMeals(item.meals);
                onClose();
              }}
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-white">
                    <Globe className="w-4 h-4" />
                    <span>{item.world1}</span>
                    <span>×</span>
                    <span>{item.world2}</span>
                  </div>
                  <Badge variant="secondary">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(item.timestamp).toLocaleDateString()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {item.meals.slice(0, 3).map((meal) => (
                    <div
                      key={meal.idMeal}
                      className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden"
                    >
                      <Image
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
