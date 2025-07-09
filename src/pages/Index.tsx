import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [character, setCharacter] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [headcanons, setHeadcanons] = useState([
    {
      id: 1,
      character: "Гарри Поттер",
      category: "привычки",
      content:
        "Гарри всегда поправляет очки, когда нервничает или думает о чем-то важном. Это стало его подсознательной привычкой после стольких лет ношения.",
      timestamp: "2 часа назад",
    },
    {
      id: 2,
      character: "Шерлок Холмс",
      category: "отношения",
      content:
        "Шерлок тайно коллекционирует мелкие предметы, которые напоминают ему о важных случаях с Ватсоном, храня их в особой коробке.",
      timestamp: "5 часов назад",
    },
  ]);

  const categories = [
    { name: "отношения", color: "bg-soft-pink text-white", icon: "Heart" },
    {
      name: "история/прошлое",
      color: "bg-soft-blue text-white",
      icon: "Clock",
    },
    { name: "привычки", color: "bg-soft-purple text-white", icon: "Repeat" },
    { name: "дружба", color: "bg-soft-peach text-white", icon: "Users" },
    {
      name: "рандом/другое",
      color: "bg-soft-red text-white",
      icon: "Sparkles",
    },
  ];

  const generateHeadcanon = () => {
    if (!character || !description || !selectedCategory) return;

    // Имитация генерации хэдканона
    const newHeadcanon = {
      id: Date.now(),
      character,
      category: selectedCategory,
      content: `${character} ${description} - это создает интересную динамику в их характере...`,
      timestamp: "только что",
    };

    setHeadcanons([newHeadcanon, ...headcanons]);
    setCharacter("");
    setDescription("");
    setSelectedCategory("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-soft-pink/10 to-soft-blue/10 relative overflow-hidden">
      {/* Декоративные кружочки */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-soft-pink/20 rounded-full animate-float"></div>
      <div
        className="absolute top-60 right-20 w-24 h-24 bg-soft-blue/20 rounded-full animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 left-1/4 w-16 h-16 bg-soft-red/20 rounded-full animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-20 right-1/3 w-40 h-40 bg-soft-purple/10 rounded-full animate-float"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-soft-red to-soft-blue bg-clip-text text-transparent mb-4">
            Создатель хэдканонов
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Создавайте уникальные хэдканоны для ваших любимых персонажей. Просто
            опишите персонажа и получите интересные идеи!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Редактор */}
          <Card className="animate-scale-in border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icon name="EditPen" size={24} className="text-soft-purple" />
                Редактор хэдканонов
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Имя персонажа
                </label>
                <Input
                  value={character}
                  onChange={(e) => setCharacter(e.target.value)}
                  placeholder="Например: Гарри Поттер"
                  className="border-2 border-soft-pink/30 focus:border-soft-purple transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Краткое описание
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Опишите персонажа или ситуацию..."
                  className="border-2 border-soft-pink/30 focus:border-soft-purple transition-colors min-h-[100px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
                  Выберите категорию
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.name}
                      variant={
                        selectedCategory === category.name
                          ? "default"
                          : "outline"
                      }
                      onClick={() => setSelectedCategory(category.name)}
                      className={`justify-start h-12 ${
                        selectedCategory === category.name
                          ? `${category.color} border-0`
                          : "border-2 border-soft-pink/30 hover:border-soft-purple"
                      } transition-all duration-200`}
                    >
                      <Icon name={category.icon} size={18} className="mr-2" />
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={generateHeadcanon}
                disabled={!character || !description || !selectedCategory}
                className="w-full h-12 bg-gradient-to-r from-soft-red to-soft-blue hover:from-soft-red/80 hover:to-soft-blue/80 text-white font-medium transition-all duration-200 disabled:opacity-50"
              >
                <Icon name="Sparkles" size={18} className="mr-2" />
                Создать хэдканон
              </Button>
            </CardContent>
          </Card>

          {/* Недавно созданные */}
          <Card
            className="animate-scale-in border-0 shadow-xl bg-white/80 backdrop-blur-sm"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icon name="Clock" size={24} className="text-soft-blue" />
                Недавно созданные
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {headcanons.map((headcanon, index) => (
                  <div
                    key={headcanon.id}
                    className="p-4 rounded-xl bg-gradient-to-r from-white to-soft-pink/5 border border-soft-pink/20 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">
                        {headcanon.character}
                      </h3>
                      <Badge
                        className={
                          categories.find((c) => c.name === headcanon.category)
                            ?.color
                        }
                      >
                        {headcanon.category}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      {headcanon.content}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Icon name="Clock" size={14} />
                      {headcanon.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
