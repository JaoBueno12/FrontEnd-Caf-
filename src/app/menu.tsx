// Importa componentes básicos do React Native
import { View, Text, FlatList, SectionList, TouchableOpacity } from "react-native";
// Importa componente de cabeçalho personalizado
import { Header } from "@/components/header";
// Importa componente de botão de categoria
import { CategoryButton } from "@/components/category-button";

// Importa dados dos produtos (categorias, menu e tipos)
import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products";

// Importa componente de produto
import { Product } from "@/components/products";

// Importa hooks do React
import { useState, useRef } from "react";

// Importa componentes de navegação
import { Link } from "expo-router";
// Importa store do carrinho (Zustand)
import { useCartStore } from "@/stores/cart-store";
// Importa ícones do Expo
import { Feather } from "@expo/vector-icons";

// Componente da tela do menu/cardápio
export default function Menu() {
  // Hook para acessar o store do carrinho
  const cartStore = useCartStore();
  // Estado para controlar qual categoria está selecionada (inicia com a primeira)
  const [category, setCategory] = useState(CATEGORIES[0]);

  // Referência para a lista de seções (para controlar scroll programaticamente)
  const sectionListRef = useRef<SectionList<ProductProps>>(null);
  // Calcula o total de itens no carrinho somando as quantidades
  const cartQuantyItems = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  // Função chamada quando uma categoria é selecionada
  function handleCategorySelect(selectedCategory: string) {
    // Atualiza a categoria selecionada
    setCategory(selectedCategory);

    // Encontra o índice da categoria selecionada no array
    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    );

    // Se a referência da lista existe, faz scroll para a seção selecionada
    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true, // Animação suave
        sectionIndex, // Índice da seção
        itemIndex: 0, // Primeiro item da seção
      });
    }
  }

  return (
    // Container principal com fundo branco
    <View className="flex-1 bg-white">
      {/* Cabeçalho com título, botão de sair e ícone do carrinho */}
      <Header title="Cardápio" cartQuantityItem={cartQuantyItems} showLogout={true} />

      {/* Lista horizontal de categorias */}
      <FlatList
        data={CATEGORIES} // Dados das categorias
        keyExtractor={(item) => item} // Chave única para cada item
        renderItem={({ item }) => (
          // Renderiza botão de categoria para cada item
          <CategoryButton
            title={item} // Nome da categoria
            isSelected={item === category} // Se está selecionada
            onPress={() => handleCategorySelect(item)} // Função ao clicar
          />
        )}
        horizontal // Lista horizontal
        className="max-h-10 mt-5" // Altura máxima e margem superior
        showsHorizontalScrollIndicator={false} // Esconde barra de scroll horizontal
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }} // Espaçamento entre itens
      />

      {/* Lista de seções com os produtos */}
      <SectionList
        ref={sectionListRef} // Referência para controlar scroll
        sections={MENU} // Dados organizados em seções
        keyExtractor={(item) => item.id} // Chave única para cada produto
        stickySectionHeadersEnabled={false} // Cabeçalhos não ficam fixos
        renderItem={({ item }) => (
          // Link para a página do produto
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          // Cabeçalho de cada seção (categoria)
          <Text className="text-xl text-gray-800 font-heading mt-8 mb-3 px-5">
            {title}
          </Text>
        )}
        className="flex-1" // Ocupa o espaço restante
        showsVerticalScrollIndicator={false} // Esconde barra de scroll vertical
        contentContainerStyle={{ paddingBottom: 100 }} // Espaço no final para scroll
      />
    </View>
  );
}
