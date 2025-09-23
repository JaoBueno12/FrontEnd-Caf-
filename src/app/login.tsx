// Importa componentes básicos do React Native
import { View, Text, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
// Importa componente para área segura
import { SafeAreaView } from "react-native-safe-area-context";
// Importa hook useState para gerenciar estado
import { useState } from "react";
// Importa componentes de navegação do Expo Router
import { Link, router } from "expo-router";

// Componente da tela de login
export default function Login() {
  // Estado para armazenar o nome de usuário digitado
  const [username, setUsername] = useState("");
  // Estado para armazenar a senha digitada
  const [password, setPassword] = useState("");

  // Função que é chamada quando o usuário clica no botão de login
  function handleLogin() {
    // Verifica se ambos os campos estão preenchidos (removendo espaços em branco)
    if (username.trim() && password.trim()) {
      // Redireciona para a tela do menu
      router.replace("/menu");
    }
  }

  return (
    // Container principal com área segura e fundo branco
    <SafeAreaView className="flex-1 bg-white">
      {/* Componente que ajusta a tela quando o teclado aparece */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Comportamento diferente para iOS e Android
        className="flex-1"
      >
        {/* Seção da imagem de fundo */}
        <View className="flex-1 bg-gray-100">
          {/* Imagem de fundo de café do Unsplash */}
          <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" }}
            className="flex-1"
            resizeMode="cover" // A imagem cobre toda a área disponível
          />
        </View>

        {/* Seção do formulário de login */}
        <View className="bg-white px-8 py-12 rounded-t-3xl -mt-8">
          {/* Título de boas-vindas */}
          <Text className="text-2xl font-bold text-gray-800 text-center mb-8">
            Bem vindo ao Café
          </Text>

          {/* Container dos campos de entrada */}
          <View className="space-y-4 mb-6">
            {/* Campo de usuário */}
            <View className="bg-gray-50 rounded-xl px-4 py-4">
              <TextInput
                placeholder="Usuário" // Texto de placeholder
                placeholderTextColor="#9CA3AF" // Cor do placeholder
                value={username} // Valor controlado pelo estado
                onChangeText={setUsername} // Atualiza o estado quando o texto muda
                className="text-gray-800 text-base"
                autoCapitalize="none" // Não capitaliza automaticamente
              />
            </View>

            {/* Campo de senha */}
            <View className="bg-gray-50 rounded-xl px-4 py-4">
              <TextInput
                placeholder="Senha" // Texto de placeholder
                placeholderTextColor="#9CA3AF" // Cor do placeholder
                value={password} // Valor controlado pelo estado
                onChangeText={setPassword} // Atualiza o estado quando o texto muda
                secureTextEntry // Esconde o texto digitado (senha)
                className="text-gray-800 text-base"
              />
            </View>
          </View>

          {/* Botão de login */}
          <TouchableOpacity
            onPress={handleLogin} // Chama a função de login quando pressionado
            className="bg-orange-500 rounded-xl py-4 mb-4"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Logar
            </Text>
          </TouchableOpacity>

          {/* Texto de link para registro */}
          <Text className="text-gray-600 text-center text-sm">
            Não tem conta?{" "}
            <Text className="text-orange-500 font-medium">
              Clique para registrar-se
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
