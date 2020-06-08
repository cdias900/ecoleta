import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import {
  View,
  ImageBackground,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

import styles from './styles';

interface IBGEUFResponse {
  sigla: string;
}

interface IGBECityResponse {
  nome: string;
}

const Home: React.FC = () => {
  const [uf, setUF] = useState('');
  const [city, setCity] = useState('');
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      )
      .then(res => {
        const ufInitials = res.data.map(u => u.sigla);
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (uf === '') return;
    axios
      .get<IGBECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      .then(res => {
        const cityNames = res.data.map(c => c.nome);
        setCity('');
        setCities(cityNames);
      });
  }, [uf]);

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf,
      city,
    });
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos
            </Text>
            <Text style={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            items={ufs.map(u => ({
              label: u,
              value: u,
              key: u,
            }))}
            onValueChange={value => setUF(value)}
            style={styles}
            value={uf}
            placeholder={{
              label: 'Selecione a UF',
              value: 'Selecione a UF',
            }}
          />
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            items={cities.map(c => ({
              label: c,
              value: c,
              key: c,
            }))}
            value={city}
            onValueChange={value => setCity(value)}
            style={styles}
            placeholder={{
              label: 'Selecione a cidade',
              value: 'Selecione a cidade',
            }}
          />
          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Home;
