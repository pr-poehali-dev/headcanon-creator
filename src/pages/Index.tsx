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
  const [isGenerating, setIsGenerating] = useState(false);
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

  const headcanonTemplates = {
    отношения: [
      "тайно хранит письма/подарки, связанные с {description}",
      "краснеет каждый раз, когда вспоминает о {description}",
      "записывает в дневник все мысли о {description}",
      "мечтает поделиться секретом о {description} с кем-то особенным",
      "всегда находит способ связать разговор с темой {description}",
    ],
    "история/прошлое": [
      "в детстве пережил важное событие, связанное с {description}, которое сформировало характер",
      "когда-то активно занимался {description}, но бросил из-за обстоятельств",
      "имеет тайное место, где думает о {description} в трудные моменты",
      "потерял что-то важное, связанное с {description}, что объясняет текущее поведение",
      "семейная история связана с {description}, о чем мало кто знает",
    ],
    привычки: [
      "всегда делает что-то особенное, связанное с {description}, когда нервничает",
      "коллекционирует предметы, напоминающие о {description}",
      "каждое утро начинает день с ритуала, связанного с {description}",
      "никогда не делает {description} - это принципиальная позиция",
      "имеет странную привычку, связанную с {description}, в стрессовых ситуациях",
    ],
    дружба: [
      "всегда рассказывает друзьям о {description} с особым энтузиазмом",
      "становится защитным, когда кто-то критикует {description}",
      "имеет традицию делиться {description} с лучшими друзьями",
      "готов пожертвовать многим ради друзей, даже {description}",
      "использует {description} как способ сблизиться с новыми людьми",
    ],
    "рандом/другое": [
      "боится того, что связано с {description}, но никому не признается",
      "умеет делать что-то неожиданное с {description}",
      "всегда носит с собой что-то, связанное с {description}, для удачи",
      "мечтает о {description}, но стесняется об этом говорить",
      "имеет необычное хобби, связанное с {description}",
    ],
  };

  const analyzePersonality = (personality: string) => {
    const traits = {
      интроверт: ["замкнутый", "тихий", "скрытный", "одиночка", "застенчивый"],
      экстраверт: [
        "общительный",
        "открытый",
        "энергичный",
        "социальный",
        "активный",
      ],
      добрый: [
        "милосердный",
        "отзывчивый",
        "заботливый",
        "мягкий",
        "понимающий",
      ],
      строгий: [
        "серьезный",
        "требовательный",
        "дисциплинированный",
        "принципиальный",
      ],
      творческий: [
        "креативный",
        "артистичный",
        "фантазер",
        "оригинальный",
        "вдохновенный",
      ],
      рациональный: ["логичный", "практичный", "расчетливый", "аналитический"],
    };

    const detected = [];
    const lowerPersonality = personality.toLowerCase();

    for (const [trait, keywords] of Object.entries(traits)) {
      if (keywords.some((keyword) => lowerPersonality.includes(keyword))) {
        detected.push(trait);
      }
    }

    return detected;
  };

  const generateContextualContent = (
    description: string,
    category: string,
    character: string,
  ) => {
    const personalityTraits = analyzePersonality(description);

    const templates =
      headcanonTemplates[category as keyof typeof headcanonTemplates];
    const randomTemplate =
      templates[Math.floor(Math.random() * templates.length)];

    // Создаем адаптированный контент на основе личности
    let adaptedDescription = description;
    if (personalityTraits.length > 0) {
      const trait = personalityTraits[0];
      adaptedDescription = `${description} (особенно проявляется его ${trait} натура)`;
    }

    let content = randomTemplate.replace(/{description}/g, adaptedDescription);

    // Добавляем детали с учетом личности персонажа
    const details = {
      отношения: [
        `Это началось незаметно, но теперь ${character} не может представить жизнь без этого чувства.`,
        `Друзья замечают, как меняется выражение лица ${character}, когда заходит разговор об этом.`,
        `${character} часто ловит себя на том, что улыбается, думая об этом.`,
      ],
      "история/прошлое": [
        `Это событие случилось много лет назад, но до сих пор влияет на решения ${character}.`,
        `Мало кто знает об этой части жизни ${character}, он редко делится такими воспоминаниями.`,
        `Иногда ${character} возвращается мыслями к тому времени и удивляется, как многое изменилось.`,
      ],
      привычки: [
        `Окружающие уже привыкли к этой особенности ${character} и даже находят её милой.`,
        `${character} сам не всегда замечает, как делает это - настолько это стало естественным.`,
        `Эта привычка помогает ${character} чувствовать себя увереннее в любых ситуациях.`,
      ],
      дружба: [
        `Настоящие друзья ${character} понимают и принимают эту особенность его характера.`,
        `Благодаря этому ${character} легко находит общий язык с людьми, разделяющими его интересы.`,
        `Друзья часто обращаются к ${character} за советом именно в этой области.`,
      ],
      "рандом/другое": [
        `Эта черта делает ${character} особенным и запоминающимся для окружающих.`,
        `Мало кто ожидает такого от ${character}, что часто приводит к приятным сюрпризам.`,
        `${character} долго скрывал эту сторону себя, но теперь гордится своей уникальностью.`,
      ],
    };

    // Адаптируем детали под личность
    let adaptedDetails = { ...details };

    if (personalityTraits.includes("интроверт")) {
      const categoryKey = category as keyof typeof adaptedDetails;
      adaptedDetails[categoryKey] = adaptedDetails[categoryKey].map((detail) =>
        detail
          .replace(/друзья замечают/g, "близкие люди иногда замечают")
          .replace(/рассказывает друзьям/g, "делится с немногими"),
      );
    }

    if (personalityTraits.includes("добрый")) {
      const categoryKey = category as keyof typeof adaptedDetails;
      adaptedDetails[categoryKey] = adaptedDetails[categoryKey].map((detail) =>
        detail.includes("помогает")
          ? detail + " Это проявление его доброй натуры."
          : detail,
      );
    }

    if (personalityTraits.includes("творческий")) {
      const categoryKey = category as keyof typeof adaptedDetails;
      adaptedDetails[categoryKey] = adaptedDetails[categoryKey].map((detail) =>
        detail.includes("особенный")
          ? detail + " Его творческая душа находит в этом вдохновение."
          : detail,
      );
    }

    const categoryDetails =
      adaptedDetails[category as keyof typeof adaptedDetails];
    const randomDetail =
      categoryDetails[Math.floor(Math.random() * categoryDetails.length)];

    // Добавляем финальное личностное примечание
    let personalityNote = "";
    if (personalityTraits.length > 0) {
      const personalityNotes = {
        интроверт: "Хотя он не любит об этом говорить открыто.",
        экстраверт: "И он с удовольствием этим делится.",
        добрый: "Это отражает его заботливую натуру.",
        строгий: "Даже в этом проявляется его принципиальность.",
        творческий: "В этом видна его артистичная душа.",
        рациональный: "Даже здесь он остается логичным.",
      };

      personalityNote =
        personalityNotes[
          personalityTraits[0] as keyof typeof personalityNotes
        ] || "";
    }

    return `${content} ${randomDetail} ${personalityNote}`.trim();
  };

  const generateHeadcanon = async () => {
    if (!character || !description || !selectedCategory) return;

    setIsGenerating(true);

    // Имитация работы ИИ-бота
    await new Promise((resolve) =>
      setTimeout(resolve, 1500 + Math.random() * 1000),
    );

    const generatedContent = generateContextualContent(
      description,
      selectedCategory,
      character,
    );

    const newHeadcanon = {
      id: Date.now(),
      character,
      category: selectedCategory,
      content: generatedContent,
      timestamp: "только что",
    };

    setHeadcanons([newHeadcanon, ...headcanons]);
    setCharacter("");
    setDescription("");
    setSelectedCategory("");
    setIsGenerating(false);
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
            ИИ-бот создаст уникальные хэдканоны для ваших любимых персонажей.
            Просто опишите персонажа, и бот придумает интересные идеи!
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
                  Описание личности
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Опишите характер, темперамент, особенности личности персонажа..."
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
                disabled={
                  !character ||
                  !description ||
                  !selectedCategory ||
                  isGenerating
                }
                className="w-full h-12 bg-gradient-to-r from-soft-red to-soft-blue hover:from-soft-red/80 hover:to-soft-blue/80 text-white font-medium transition-all duration-200 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Icon
                      name="Loader2"
                      size={18}
                      className="mr-2 animate-spin"
                    />
                    ИИ создаёт хэдканон...
                  </>
                ) : (
                  <>
                    <Icon name="Bot" size={18} className="mr-2" />
                    Создать хэдканон
                  </>
                )}
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
